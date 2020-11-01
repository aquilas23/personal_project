INSERT INTO tasks(user_id,task_content)
    VALUES ($1, $2)
    RETURNING *;