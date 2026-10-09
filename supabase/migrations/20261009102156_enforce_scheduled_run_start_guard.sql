-- BORA: enforce scheduled start time even when clients update runs directly.
create or replace function public.guard_run_mutation()
returns trigger
language plpgsql
set search_path = ''
as $function$
declare
  active_count integer;
begin
  if tg_op = 'UPDATE' and new.creator_id is distinct from old.creator_id then
    raise exception 'CREATOR_IMMUTABLE';
  end if;

  if tg_op = 'UPDATE'
     and old.status = 'scheduled'
     and new.status = 'started'
     and (old.starts_at > now() or new.starts_at > now()) then
    raise exception 'RUN_NOT_DUE';
  end if;

  if new.meeting_lat is null or new.meeting_lng is null then
    new.meeting_lat := null;
    new.meeting_lng := null;
  else
    new.meeting_lat := round(new.meeting_lat::numeric, 3)::double precision;
    new.meeting_lng := round(new.meeting_lng::numeric, 3)::double precision;
  end if;

  if new.status = 'scheduled' and new.starts_at <= now() then
    raise exception 'START_TIME_MUST_BE_FUTURE';
  end if;

  if new.max_participants is not null then
    select count(*)::integer into active_count
    from public.run_participants rp
    where rp.run_id = new.id
      and rp.status in ('joined','completed');
    if active_count > new.max_participants then
      raise exception 'CAPACITY_BELOW_CURRENT_PARTICIPANTS';
    end if;
  end if;

  if tg_op = 'INSERT' then
    if new.status <> 'scheduled' then
      raise exception 'NEW_RUN_MUST_BE_SCHEDULED';
    end if;
  elsif tg_op = 'UPDATE' then
    if old.status = 'scheduled' and new.status not in ('scheduled','started','cancelled') then
      raise exception 'INVALID_RUN_STATUS_TRANSITION';
    end if;
    if old.status = 'started' and new.status not in ('started','completed','cancelled') then
      raise exception 'INVALID_RUN_STATUS_TRANSITION';
    end if;
    if old.status in ('completed','cancelled') and new.status <> old.status then
      raise exception 'RUN_ALREADY_CLOSED';
    end if;
  end if;

  return new;
end;
$function$;

revoke execute on function public.guard_run_mutation() from public, anon, authenticated;
