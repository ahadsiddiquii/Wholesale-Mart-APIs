const utils = require("../../generic/modules/utils");
const { createProductTable } = require("./product");

var productTableName = "Product";

// Create a MySQL pool
const pool = utils.mySqlPool;

async function postProduct(product) {
  await createProductTable();
  //Handle Image
  const imagePath = await utils.ImageService.convertBase64ImageAndSaveToStorage(
    product.productImage
  );
  const connection = await pool.getConnection();
  const [results] = await connection.query(
    "INSERT INTO " +
      productTableName +
      "(productName, productImage, productDescription, categoryId, categoryName, productQuantityInStock, productPrice, itemTax) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      product.productName,
      imagePath,
      product.productDescription,
      product.categoryId,
      product.categoryName,
      product.productQuantityInStock,
      product.productPrice,
      product.itemTax,
    ]
  );
  connection.release();
  return results;
}

async function getAllProducts() {
  const connection = await pool.getConnection();
  const [results] = await connection.query("SELECT * FROM " + productTableName);
  connection.release();
  return [results];
}

async function getProductById(id) {
  const connection = await pool.getConnection();
  savedProduct = await utils.GetResourceService.getResourceById(
    productTableName,
    id,
    connection
  );
  connection.release();
  return savedProduct;
}

async function updateProduct(id, product, savedProduct) {
  const connection = await pool.getConnection();
  //Handle Image
  const imagePath = await utils.ImageService.convertBase64ImageAndSaveToStorage(
    product.productImage
  );

  if (imagePath != null) {
    //delete old image
    await utils.ImageService.deleteImage(savedProduct.productImage);
  }
  imageUpdated = imagePath != null ? imagePath : savedProduct.productImage;
  // Update item

  const [results] = await connection.query(
    "UPDATE " +
      productTableName +
      " SET productName = ?, productImage = ? , productDescription = ? , categoryId = ?,categoryName = ? ,productQuantityInStock = ? ,productPrice = ? ,itemTax = ?   WHERE id = ?",
    [
      product.productName,
      imageUpdated,
      product.productDescription,
      product.categoryId,
      product.categoryName,
      product.productQuantityInStock,
      product.productPrice,
      product.itemTax,
      id,
    ]
  );
  connection.release();
  return {
    results,
    imageUpdated,
  };
}

async function updateProductQuantityInStock(
  id,
  quantityToRemove,
  savedProduct
) {
  const connection = await pool.getConnection();

  newQuantity = savedProduct.productQuantityInStock - quantityToRemove;

  const [results] = await connection.query(
    "UPDATE " +
      productTableName +
      " SET productQuantityInStock = ?  WHERE id = ?",
    [newQuantity, id]
  );
  connection.release();
  return results;
}

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  updateProductQuantityInStock,
};
