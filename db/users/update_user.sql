update ppusers
set email = $1
where user_id = $2;
set password=$3
where password= $4;

select user_id, email, password from ppusers
where user_id = $2;