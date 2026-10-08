-- BORA: integrity guards + privacy-preserving run coordinates
create or replace function public.guard_run_mutation()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  active_count integer;
begin
  if tg_op = 'UPDATE' and new.creator_id is distinct from old.creator_id then
    raise exception 'CREATOR_IMMUTABLE';
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
$$;

drop trigger if exists trg_guard_run_mutation on public.runs;
create trigger trg_guard_run_mutation
before insert or update on public.runs
for each row execute function public.guard_run_mutation();

create or replace function public.guard_friendship_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.requester_id is distinct from old.requester_id
     or new.addressee_id is distinct from old.addressee_id then
    raise exception 'FRIENDSHIP_PARTIES_IMMUTABLE';
  end if;
  if old.status = 'pending' and new.status not in ('pending','accepted','declined','blocked') then
    raise exception 'INVALID_FRIENDSHIP_STATUS';
  end if;
  if old.status in ('accepted','declined','blocked') and new.status <> old.status then
    raise exception 'FRIENDSHIP_ALREADY_CLOSED';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_friendship_update on public.friendships;
create trigger trg_guard_friendship_update
before update on public.friendships
for each row execute function public.guard_friendship_update();

create or replace function public.guard_run_invite_update()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.sender_id is distinct from old.sender_id
     or new.recipient_id is distinct from old.recipient_id
     or new.run_id is distinct from old.run_id then
    raise exception 'INVITE_PARTIES_IMMUTABLE';
  end if;
  if old.status = 'pending' and new.status not in ('pending','accepted','declined') then
    raise exception 'INVALID_INVITE_STATUS';
  end if;
  if old.status in ('accepted','declined') and new.status <> old.status then
    raise exception 'INVITE_ALREADY_CLOSED';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_guard_run_invite_update on public.run_invites;
create trigger trg_guard_run_invite_update
before update on public.run_invites
for each row execute function public.guard_run_invite_update();

revoke execute on function public.guard_run_mutation() from public, anon, authenticated;
revoke execute on function public.guard_friendship_update() from public, anon, authenticated;
revoke execute on function public.guard_run_invite_update() from public, anon, authenticated;
