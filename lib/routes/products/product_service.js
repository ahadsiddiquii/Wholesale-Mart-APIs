const utils = require("../../generic/modules/utils");
const { productSchemaValidation } = require("./product");
const ProductDatabase = require("./product_database");

var product = utils.express.Router();

const responseHandler = new utils.ResponseHandler();

product.use(utils.bodyParser.json());

//Add Product
product.post("/", async (req, res) => {
  try {
    // Validate request body
    const { error } = productSchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create new item
    await ProductDatabase.postProduct(req.body);

    responseHandler.setSuccess(true).setMessage("Product Added").setData(true);
  } catch (error) {
    console.error(error);
    responseHandler
      .setSuccess(false)
      .setMessage(responseHandler.genericErrorMessage);
  }

  responseHandler.getResponse(res);
});

//Get All Products
product.get("/", async (req, res) => {
  try {
    const [results] = await ProductDatabase.getAllProducts();

    responseHandler
      .setSuccess(true)
      .setMessage("All Products Retrieved")
      .setData(results);
  } catch (error) {
    console.error(error);
    responseHandler
      .setSuccess(false)
      .setMessage(responseHandler.genericErrorMessage);
  }
  responseHandler.getResponse(res);
});

// Update Category
product.put("/:id", async (req, res) => {
  try {
    productId = parseInt(req.params.id);
    // Validate request body
    const { error } = productSchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    savedProduct = await ProductDatabase.getProductById(productId);
    if (savedProduct === null) {
      return res.status(404).json({ error: "Product not found" });
    } else {
      updatedResult = await ProductDatabase.updateProduct(
        productId,
        req.body,
        savedProduct
      );

      if (updatedResult.results.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      const postData = {
        id: productId,
        productName: req.body.productName,
        productImage: updatedResult.imageUpdated,
        productDescription: req.body.productDescription,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        productQuantityInStock: req.body.productQuantityInStock,
        productPrice: req.body.productPrice,
        itemTax: req.body.itemTax,
      };

      responseHandler
        .setSuccess(true)
        .setMessage("Product Updated")
        .setData(postData);
    }
  } catch (error) {
    console.error(error);
    responseHandler
      .setSuccess(false)
      .setMessage(responseHandler.genericErrorMessage);
  }
  responseHandler.getResponse(res);
});

module.exports.product = product;
