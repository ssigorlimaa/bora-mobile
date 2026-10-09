# Supabase — BORA

Projeto de produção: `vzrmqanstwzmtqwyfqmb` (região `sa-east-1`).

## Atenção: histórico incompleto

Em 2026-10-09, o projeto remoto lista 22 migrations aplicadas, mas o repositório contém somente a migration `20261008194103_bora_integrity_guards_and_private_coordinates.sql` e a migration `20261009002000_harden_social_write_policies.sql`. Os SQLs das 20 migrations históricas anteriores ainda precisam ser recuperados ou substituídos por um baseline completo e validado.

Por isso, a pasta `migrations` **ainda não recria um banco vazio de forma confiável**. Não execute `supabase db reset` na produção. Antes de provisionar outro ambiente, recupere os SQLs originais ou gere um baseline, teste-o em um projeto Supabase descartável e documente como adotá-lo sem reaplicar DDL na produção.

## Regras operacionais

- Versione migrations DDL no Git e aplique-as de forma coordenada com a aplicação remota.
- Não remova índices apenas porque o advisor os classifica como não usados em uma base com pouco tráfego.
- As coordenadas exatas em `runner_locations` são privadas; corridas usam coordenadas arredondadas para o ponto de encontro.
- Nunca coloque credenciais administrativas Supabase em app mobile ou variável `EXPO_PUBLIC_*`.
