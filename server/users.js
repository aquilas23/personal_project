const users = [];

const addUser = ({ id, name, group }) => {
  const existingUser = users.find(
    (user) => user.group === group && user.name === name
  );
  if (!name || !group) return { error: "Username and group are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name, group };
  users.push(user);
  return { user };
};
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);
const getUsersIngroup = (group) => users.filter((user) => user.group === group);

module.exports = { addUser, removeUser, getUser, getUsersIngroup };
