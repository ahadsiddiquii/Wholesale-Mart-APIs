const utils = require("../../generic/modules/utils");
const { createCartTable } = require("./cart");

var cartTableName = "Cart";

// Create a MySQL pool
const pool = utils.mySqlPool;

//Create cart
async function createUserCart(userId) {
  await createCartTable();
  const connection = await pool.getConnection();

  const [results] = await connection.query(
    "INSERT INTO " +
      cartTableName +
      "(userId, itemInCartCount, cartItems) VALUES (?, ?, ?)",
    [userId, 0, JSON.stringify([])]
  );
  connection.release();
  return results;
}

async function getUserCart(userId) {
  const connection = await pool.getConnection();

  savedCart = await utils.GetResourceService.getResourceByCustomKey(
    cartTableName,
    "userId",
    userId,
    connection
  );
  connection.release();
  return savedCart;
}

module.exports = {
  cartTableName,
  createUserCart,
  getUserCart,
};
