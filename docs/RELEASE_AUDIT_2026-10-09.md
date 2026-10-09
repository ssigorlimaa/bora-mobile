# BORA — auditoria técnica de release (2026-10-09)

## Escopo

Revisão do app Expo/React Native, rotas de autenticação e corridas, configuração EAS/Google Maps, políticas RLS, triggers, funções SQL, views de ranking e integridade do banco. Repositório: `ssigorlimaa/bora-mobile`. Backend: `vzrmqanstwzmtqwyfqmb`. O NossoFUTapp permanece completamente fora deste escopo.

## Validações executadas

- Expo Doctor: **18/18 checks passed**.
- TypeScript: `npx tsc --noEmit` passou.
- Bundle Web: `npx expo export --platform web` passou.
- Bundle Android: `npx expo export --platform android` passou.
- Configuração Expo: pacote Android `com.bora.mobile`, scheme `bora`, EAS project ID e mapeamento da chave Android foram verificados. A chave Android não é reutilizada como chave iOS.
- Varredura do código do app: nenhum `service_role`, segredo Supabase de servidor ou API Key Google real hardcoded nos arquivos de aplicação.
- Integridade no Supabase: 0 coordenadas inválidas, 0 faixas de pace inválidas, 0 participantes concluídos fora do ciclo permitido e 0 estatísticas negativas.
- Supabase Security Advisor: um alerta restante, `auth_leaked_password_protection`, recurso que o painel informa ser exclusivo do plano Pro.
- Supabase Performance Advisor: 14 índices não usados em nível INFO. Não foram removidos, pois o tráfego atual é insuficiente para concluir que sejam redundantes.

Os exports e verificações estáticas não substituem o teste ponta a ponta no dispositivo. Cadastro, confirmação de e-mail, recuperação de senha, permissões de localização, mapas, convites e gamificação ainda precisam ser exercitados em Android com desempenho aceitável ou em aparelho físico.

## Correções feitas

- RLS social: pedidos de amizade só podem nascer como `pending`; apenas o destinatário pode responder; membros não podem se atribuir papéis `owner`/ `admin`; convites exigem remetente autorizado, destinatário diferente do remetente e estado inicial `pending`; só o destinatário pode aceitar/recusar convites pendentes.
- Navegação inferior troca abas com `replace`, evitando acumular cópias das telas na pilha.
- Navegação inferior passou a ocupar sua própria faixa com safe area, em vez de sobrepor o conteúdo rolável; o padding inferior das telas foi reduzido.
- Cadastro e recuperação de senha agora validam o mínimo de 8 caracteres configurado no Auth; a tela de recuperação exige uma sessão válida.
- Criação de corrida impede taps concorrentes durante a obtenção da sessão; ações de ciclo de vida impedem chamadas repetidas e liberam o estado ocupado em falhas de rede.
- Explore conta apenas participantes `joined`/`completed`; imagens da Home usam payload menor para reduzir tráfego móvel.
- Trigger de participantes agora impede troca de `run_id`/`user_id` e impede desfazer um status `completed`, preservando histórico e estatísticas.
- RPC `start_run` e trigger `guard_run_mutation` agora só permitem iniciar uma corrida a partir do horário agendado, evitando contornar a validação via update direto e iniciar corridas futuras.
- Tokens de compartilhamento usam UUID criptograficamente seguro via `expo-crypto`.
- Horários de criação de corrida respeitam “Daqui a 1h”, “Hoje” e “Amanhã”; a opção “Hoje” avisa quando não há mais janela futura no mesmo dia.
- A criação de corrida sempre limpa o estado de carregamento, inclusive em falha de rede.
- Avatares sem foto real usam fallback local, eliminando downloads de fotos de terceiros como se fossem participantes reais.
- Pedidos repetidos de conexão ignoram duplicatas em vez de tentar atualizar uma amizade sob uma política de RLS de inserção.
- Chaves do Google Maps para Android e iOS são separadas. A chave Android deve continuar restrita ao pacote `com.bora.mobile`, ao SHA-1 da Keystore EAS e ao Maps SDK for Android.
- CI também exporta o bundle Android, além do bundle Web.

## Pendências antes de lançamento público

1. **Histórico de migrations incompleto.** O banco remoto lista 24 migrations aplicadas; o repositório versiona cinco migrations recentes, mas ainda não contém os 19 SQLs históricos anteriores. O banco não é reproduzível do zero a partir do Git. Recuperar os SQLs históricos ou produzir um baseline completo, validá-lo em um projeto descartável e documentar como adotá-lo. Não executar `db reset` na produção.
2. **Dependências:** `npm audit` reportou 39 achados transitivos (23 high, 16 moderate, 0 critical). As sugestões automáticas incluem saltos major na stack Expo/React Native. Não executar `npm audit fix --force`; planejar uma atualização dedicada com testes de regressão.
3. **Senha comprometida:** proteção permanece desativada porque o painel informa que exige plano Pro. Manter comprimento mínimo de 8 caracteres e os requisitos de senha configurados no Auth.
4. **Lockfile:** o repositório ainda não versiona `package-lock.json`; a instalação do CI não é totalmente determinística. Adicionar o lockfile gerado e mudar o CI para `npm ci` em uma atualização controlada.
5. **UI:** a captura do emulador mostra a navegação inferior sobrepondo parte do conteúdo da Home. Revisar rolagem, safe area e layout em dispositivo responsivo antes de declarar a interface aprovada.
6. **Cobertura automatizada:** ainda não existe suíte de testes unitários/de integração. O CI verifica tipos e empacotamento, mas não simula auth nem transições de corrida.
7. **Teste de runtime:** o emulador Windows está muito lento. A instalação abriu a Home, mas os fluxos completos ainda não foram aprovados; continuar os testes em aparelho físico ou após corrigir a aceleração do emulador.

## Funcionalidades que ainda não estão completas (não tratar como bugs resolvidos)

- **Notificações:** a tela atual é apenas um estado vazio; não há pipeline de notificações push/in-app implementado.
- **Conexões sociais:** é possível enviar pedido de conexão, mas falta uma tela para listar e aceitar/recusar pedidos recebidos e visualizar o estado da conexão.
- **Perfil:** leitura do perfil e estatísticas estão implementadas; edição de dados do perfil ainda não está disponível na interface.
- **Desafios:** inscrição e datas de início/fim estão implementadas; progresso individual por desafio e atualização automática da distância ainda precisam ser definidos/implementados.
- **Convites:** o compartilhamento usa deep link `bora://invite/<token>`; validar em dispositivos reais o comportamento entre WhatsApp, navegador e app instalado e planejar um link HTTPS universal para melhor compatibilidade.
- **Mapas:** configuração Android foi validada no Google Cloud, mas ainda falta teste de runtime com o APK no emulador rápido ou aparelho físico. iOS precisa de uma chave própria caso seja alvo do lançamento.
- **Gamificação:** conclusão ainda é autodeclarada; não há GPS/cronômetro de corrida validado no servidor, então o app não deve apresentar XP como prova de atividade verificada.
- **Testes de fluxo:** não há suíte automatizada de integração para auth, criação/entrada/saída de corridas, capacidade concorrente, XP/medalhas ou RLS. A CI cobre tipos e exports, não substitui esses testes.

## Regras de segurança

- A publishable key do Supabase é pública para o cliente; RLS é a barreira real do banco.
- Nunca colocar `service_role`, senha, keystore ou chave privada no app mobile.
- `GOOGLE_MAPS_API_KEY` é para Android; `GOOGLE_MAPS_IOS_API_KEY` só deve ser preenchida com chave própria restrita para iOS caso o app use Google Maps nesse sistema.
- Não apagar índices apenas por aparecerem como não usados em uma base de baixo tráfego.
