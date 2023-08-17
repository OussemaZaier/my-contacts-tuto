//@desc GET all user
//@path GET /api/users
//@access Private
const getUsers = (req, res) => {
  res.send("GET all users");
};

//@desc Create user
//@path POST /api/users
//@access Private
const createUser = (req, res) => {
  res.send("GET all users");
};

//@desc get user by id
//@path GET /api/users/:id
//@access Private
const getUser = (req, res) => {
  res.send("GET all users");
};

//@desc Update user
//@path PUT /api/users/:id
//@access Private
const updateUser = (req, res) => {
  res.send("GET all users");
};

//@desc DELETE user
//@path DELETE /api/users/:id
//@access Private
const deleteUser = (req, res) => {
  res.send("GET all users");
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
