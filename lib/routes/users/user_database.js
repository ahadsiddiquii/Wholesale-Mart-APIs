const utils = require("../../generic/modules/utils");
const { createUserTable } = require("./user");

var userTableName = "User";

// Create a MySQL pool
const pool = utils.mySqlPool;

async function getAllUsers() {
  const connection = await pool.getConnection();
  const [results] = await connection.query("SELECT * FROM " + userTableName);
  connection.release();
  return [results];
}

async function postUser(user) {
  await createUserTable();
  const hashedPassword = await utils.bcrypt.hash(user.password, 10);
  const connection = await pool.getConnection();

  const [results] = await connection.query(
    "INSERT INTO " +
      userTableName +
      "(userName, userEmailOrPhone, password, roles) VALUES (?, ?, ?, ?)",
    [
      user.userName,
      user.userEmailOrPhone,
      hashedPassword,
      JSON.stringify(user.roles),
    ]
  );
  connection.release();
  return results;
}

async function updateUser(savedRoles, userEmailOrPhone) {
  const connection = await pool.getConnection();

  const [results] = await connection.query(
    "UPDATE " + userTableName + " SET roles = ? WHERE userEmailOrPhone = ?",
    [JSON.stringify(savedRoles), userEmailOrPhone]
  );
  connection.release();
  return results;
}

async function updateUserAllData(id, user, savedUser) {
  const connection = await pool.getConnection();

  // Update item
  const [results] = await connection.query(
    "UPDATE " +
      userTableName +
      " SET userName = ?, userEmailOrPhone = ?, roles = ? WHERE id = ?",
    [
      user.userName ?? savedUser.userName,
      user.userEmailOrPhone ?? savedUser.userEmailOrPhone,
      JSON.stringify(user.roles) ?? savedUser.roles,
      id,
    ]
  );

  connection.release();
  return results;
}

async function getSavedUserByEmailOrPhone(userEmailOrPhone) {
  const connection = await pool.getConnection();
  savedUser = await utils.GetResourceService.getResourceByCustomKey(
    userTableName,
    "userEmailOrPhone",
    userEmailOrPhone,
    connection
  );

  connection.release();
  return savedUser;
}

async function getUserById(id) {
  const connection = await pool.getConnection();
  savedUser = await utils.GetResourceService.getResourceById(
    userTableName,
    id,
    connection
  );

  connection.release();
  return savedUser;
}

async function loginUser(user) {
  const connection = await pool.getConnection();

  savedUser = await utils.GetResourceService.getResourceByCustomKey(
    userTableName,
    "userEmailOrPhone",
    user.userEmailOrPhone,
    connection
  );
  match = false;
  roleExists = false;
  //Check if roles exists
  userRoles = JSON.parse(savedUser.roles);

  if (userRoles.includes(user.roles[0])) {
    roleExists = true;
  }
  if (savedUser != null && roleExists) {
    match = await utils.bcrypt.compare(user.password, savedUser.password);
  }

  connection.release();

  return { match, savedUser };
}

async function deleteUser(idToDelete) {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    "DELETE FROM " + userTableName + " WHERE id = ?",
    [idToDelete]
  );
  connection.release();
  return result;
}

module.exports = {
  userTableName,
  getAllUsers,
  postUser,
  updateUserAllData,
  getUserById,
  loginUser,
  getSavedUserByEmailOrPhone,
  updateUser,
  deleteUser,
};
