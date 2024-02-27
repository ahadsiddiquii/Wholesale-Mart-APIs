const utils = require("../../generic/modules/utils");
const pool = utils.mySqlPool;
const joi = utils.joi;

const productSchemaValidation = joi.object({
  productName: joi.string().required(),
  productImage: joi.string().required(),
  productDescription: joi.string().required(),
  categoryId: joi.number().integer().required(),
  categoryName: joi.string().required(),
  productQuantityInStock: joi.number().integer().required(),
  productPrice: joi.number().required(),
  itemTax: joi.number().required(),
});

async function createProductTable() {
  const connection = await pool.getConnection();

  try {
    const [rows, fields] = await connection.execute(`
        CREATE TABLE IF NOT EXISTS product (
          id INT AUTO_INCREMENT PRIMARY KEY,
          productName VARCHAR(255) NOT NULL,
          productImage VARCHAR(255) NOT NULL,
          productDescription VARCHAR(255) NOT NULL,
          categoryId INT NOT NULL,
          categoryName VARCHAR(255) NOT NULL,
          productQuantityInStock INT NOT NULL,
          productPrice FLOAT NOT NULL,
          itemTax FLOAT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
  } catch (error) {
    console.error("Error in managing product table:", error);
  } finally {
    connection.release();
  }
}

module.exports = {
  productSchemaValidation,
  createProductTable,
};
