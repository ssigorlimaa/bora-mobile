-- Tighten social write policies found during the BORA release audit.
-- Prevent users from self-assigning elevated group roles or forging accepted
-- friendships/invites through direct PostgREST writes.

begin;

drop policy if exists friendships_insert_requester on public.friendships;
create policy friendships_insert_requester
on public.friendships
for insert
to authenticated
with check (
  requester_id = (select auth.uid())
  and addressee_id <> (select auth.uid())
  and status = 'pending'
);

drop policy if exists friendships_update_addressee on public.friendships;
create policy friendships_update_addressee
on public.friendships
for update
to authenticated
using (
  addressee_id = (select auth.uid())
  and status = 'pending'
)
with check (
  addressee_id = (select auth.uid())
  and status in ('accepted', 'declined', 'blocked')
);

drop policy if exists group_members_insert_self on public.group_members;
create policy group_members_insert_self
on public.group_members
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and role = 'member'
);

drop policy if exists invites_insert_sender on public.run_invites;
create policy invites_insert_sender
on public.run_invites
for insert
to authenticated
with check (
  sender_id = (select auth.uid())
  and recipient_id <> (select auth.uid())
  and status = 'pending'
  and exists (
    select 1
    from public.runs r
    where r.id = run_id
      and (
        r.creator_id = (select auth.uid())
        or (
          r.visibility = 'public'
          and exists (
            select 1
            from public.run_participants rp
            where rp.run_id = r.id
              and rp.user_id = (select auth.uid())
              and rp.status in ('joined', 'completed')
          )
        )
      )
  )
);

drop policy if exists invites_update_recipient on public.run_invites;
create policy invites_update_recipient
on public.run_invites
for update
to authenticated
using (
  recipient_id = (select auth.uid())
  and status = 'pending'
)
with check (
  recipient_id = (select auth.uid())
  and status in ('accepted', 'declined')
);

commit;
