-- Create a table for tools
create table tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles not null,
  title text not null,
  description text not null,
  thumbnail text,
  category text,
  downloads integer default 0,
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table tools
  enable row level security;

create policy "Tools are viewable by everyone." on tools
  for select using (true);

create policy "Users can insert their own tools." on tools
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own tools." on tools
  for update using (auth.uid() = user_id);

create policy "Users can delete their own tools." on tools
  for delete using (auth.uid() = user_id);
