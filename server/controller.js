const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");

    const foundUser = await db.users.check_user({ email });
    if (foundUser[0]) {
      return res.status(400).send("Email already in use");
    }
    let salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);

    const newUser = await db.users.register_user({ email, hash });
    req.session.user = newUser[0];
    res.status(201).send(req.session.user);
  },

  login: async (req, res) => {
    const { email, password } = req.body,
      db = req.app.get("db");
    const foundUser = await db.users.check_user({ email });
    console.log(email, password, foundUser.length);
    if (!foundUser[0]) {
      return res.status(400).send("Email not in use");
    }
    const authenticated = bcrypt.compareSync(password, foundUser[0].password);
    if (!authenticated) {
      return res.status(401).send("Password is incorrect");
    }
    delete foundUser[0].password;
    req.session.user = foundUser[0];
    return res.status(202).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },

  createtask: (req, res) => {
    const { id, content } = req.body,
      db = req.app.get("db");

    db.task
      .new_task(id, content)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },
  getUsertasks: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");
    if (!req.session) return;
    console.log(req.session.user.is_admin);
    if (req.session.user.is_admin) {
      db.task
        .list()
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(500).send(err));
    } else {
      db.task
        .get_user_tasks([req.session.user.user_id])
        .then((tasks) => res.status(200).send(tasks))
        .catch((err) => res.status(500).send(err));
    }
  },

  deletetask: (req, res) => {
    const { id } = req.params,
      db = req.app.get("db");

    db.task
      .delete_task([id])
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).send(err));
  },

  updatetask: (req, res) => {
    const { id } = req.params,
      { content } = req.body;
    db = req.app.get("db");
    console.log(id, content);
    db.task
      .update_task([id, content])
      .then((response) => {
        console.log(response);
        return res.status(200).send(response);
      })
      .catch((err) => console.log(err));
  },
};
