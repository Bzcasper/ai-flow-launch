-- Atomic increment function for tools.downloads
create or replace function public.increment_tool_downloads(tool_id uuid)
returns void
language sql
security definer
as $$
  update public.tools
  set downloads = coalesce(downloads, 0) + 1
  where id = tool_id;
$$;

-- Grant execute to anon if desired, but safer to use service role
-- grant execute on function public.increment_tool_downloads(uuid) to anon;
