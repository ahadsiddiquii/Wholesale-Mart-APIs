const utils = require("../../generic/modules/utils");
const { createCategoryTable } = require("./category");

var categoryTableName = "Category";

// Create a MySQL pool
const pool = utils.mySqlPool;

//Get Category By Category Id
async function getCategoryById(id) {
  const connection = await pool.getConnection();
  savedUser = await utils.GetResourceService.getResourceById(
    categoryTableName,
    id,
    connection
  );

  connection.release();
  return savedUser;
}

// Delete category by id
async function deleteCategory(idToDelete) {
  const connection = await pool.getConnection();
  const [result] = await connection.query(
    "DELETE FROM " + categoryTableName + " WHERE id = ?",
    [idToDelete]
  );
  connection.release();
  return result;
}

module.exports = {
  getCategoryById,
  deleteCategory,
};
