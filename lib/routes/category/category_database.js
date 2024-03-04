const utils = require("../../generic/modules/utils");
const { createCategoryTable } = require("./category");

var categoryTableName = "Category";

// Create a MySQL pool
const pool = utils.mySqlPool;


async function deleteCategory(idToDelete) {
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM ' + categoryTableName + ' WHERE id = ?', [idToDelete]);
    connection.release();
    return result;
}
  
module.exports = {
    deleteCategory,
};
  