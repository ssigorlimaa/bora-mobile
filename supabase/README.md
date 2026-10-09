# Supabase — BORA

Projeto de produção: `vzrmqanstwzmtqwyfqmb` (região `sa-east-1`).

## Atenção: histórico incompleto

Em 2026-10-09, o projeto remoto lista 24 migrations aplicadas. O repositório versiona cinco migrations recentes: `20261008194103_bora_integrity_guards_and_private_coordinates.sql`, `20261009004522_harden_social_write_policies.sql`, `20261009101829_guard_run_participant_identity.sql`, `20261009102102_start_runs_only_when_due.sql` e `20261009102156_enforce_scheduled_run_start_guard.sql`. Os SQLs das 19 migrations históricas anteriores ainda precisam ser recuperados ou substituídos por um baseline completo e validado.

Por isso, a pasta `migrations` **ainda não recria um banco vazio de forma confiável**. Não execute `supabase db reset` na produção. Antes de provisionar outro ambiente, recupere os SQLs originais ou gere um baseline, teste-o em um projeto Supabase descartável e documente como adotá-lo sem reaplicar DDL na produção.

## Regras operacionais

- Versione migrations DDL no Git e aplique-as de forma coordenada com a aplicação remota.
- Não remova índices apenas porque o advisor os classifica como não usados em uma base com pouco tráfego.
- As coordenadas exatas em `runner_locations` são privadas; corridas usam coordenadas arredondadas para o ponto de encontro.
- Nunca coloque credenciais administrativas Supabase em app mobile ou variável `EXPO_PUBLIC_*`.
