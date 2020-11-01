INSERT INTO ppusers (email, password)
VALUES (
    ${email},
    ${hash}
)
RETURNING user_id, email;