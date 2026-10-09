-- BORA: protect participant identity and completed-run history from direct client updates.
create or replace function public.guard_run_participant()
returns trigger
language plpgsql
set search_path = ''
as $function$
declare
  run_row public.runs%rowtype;
  current_count integer;
begin
  if tg_op = 'UPDATE' then
    if new.run_id is distinct from old.run_id
       or new.user_id is distinct from old.user_id then
      raise exception 'PARTICIPANT_IDENTITY_IMMUTABLE';
    end if;

    if old.status = 'completed' and new.status <> 'completed' then
      raise exception 'PARTICIPANT_ALREADY_COMPLETED';
    end if;
  end if;

  select * into run_row
  from public.runs
  where id = new.run_id
  for update;

  if run_row.id is null then
    raise exception 'RUN_NOT_FOUND';
  end if;

  if new.status = 'joined' and run_row.status <> 'scheduled' then
    raise exception 'RUN_NOT_OPEN';
  end if;

  if new.status = 'completed' and run_row.status not in ('started','completed') then
    raise exception 'RUN_NOT_STARTED';
  end if;

  if new.status = 'joined' then
    select count(*) into current_count
    from public.run_participants
    where run_id = new.run_id
      and status in ('joined','completed')
      and user_id <> new.user_id;

    if run_row.max_participants is not null and current_count >= run_row.max_participants then
      raise exception 'RUN_FULL';
    end if;
  end if;

  return new;
end;
$function$;

revoke execute on function public.guard_run_participant() from public, anon, authenticated;
