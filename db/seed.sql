create table if not exists ppusers (
    user_id serial primary key,
    email varchar(150),
    password varchar(250),
    is_admin boolean
);

create table if not exists tasks (
    task_id serial primary key,
    user_id int references ppusers(user_id),
    task_content text
);