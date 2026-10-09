-- BORA: only allow a run's creator to start after its scheduled start time.
create or replace function public.start_run(p_run_id uuid)
returns public.runs
language plpgsql
set search_path = ''
as $function$
declare
  v_run public.runs;
begin
  update public.runs
  set status = 'started'
  where id = p_run_id
    and creator_id = (select auth.uid())
    and status = 'scheduled'
    and starts_at <= now()
  returning * into v_run;

  if v_run.id is null then
    raise exception 'START_NOT_ALLOWED_OR_NOT_DUE';
  end if;

  return v_run;
end;
$function$;
