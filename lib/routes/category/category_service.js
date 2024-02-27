const utils = require("../../generic/modules/utils");
const { categorySchemaValidation, createCategoryTable } = require("./category");

var category = utils.express.Router();

var categoryTableName = "Category";
const responseHandler = new utils.ResponseHandler();

category.use(utils.bodyParser.json());

// Create a MySQL pool
const pool = utils.mySqlPool;

//Add Category
category.post("/", async (req, res) => {
  try {
    // Validate request body
    const { error } = categorySchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    await createCategoryTable();

    //Handle Image
    const imagePath =
      await utils.ImageService.convertBase64ImageAndSaveToStorage(
        req.body.categoryImage
      );
    // Create new item
    const connection = await pool.getConnection();
    const [results] = await connection.query(
      "INSERT INTO " +
        categoryTableName +
        "(categoryName, categoryImage) VALUES (?, ?)",
      [req.body.categoryName, imagePath]
    );
    connection.release();

    const postData = {
      id: results.insertId,
      categoryName: req.body.categoryName,
      categoryImage: imagePath,
    };
    responseHandler
      .setSuccess(true)
      .setMessage("Category Added")
      .setData(postData);
  } catch (error) {
    console.error(error);
    responseHandler
      .setSuccess(false)
      .setMessage(responseHandler.genericErrorMessage);
  }

  responseHandler.getResponse(res);
});

//Get All Categories
category.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(
      "SELECT * FROM " + categoryTableName
    );
    connection.release();

    responseHandler
      .setSuccess(true)
      .setMessage("All Categories Retrieved")
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
category.put("/:id", async (req, res) => {
  try {
    // Validate request body
    const { error } = categorySchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const connection = await pool.getConnection();
    savedCategory = await utils.GetResourceService.getResourceById(
      categoryTableName,
      req.params.id,
      connection
    );
    if (savedCategory === null) {
      return res.status(404).json({ error: "Category not found" });
    } else {
      //Handle Image

      const imagePath =
        await utils.ImageService.convertBase64ImageAndSaveToStorage(
          req.body.categoryImage
        );

      if (imagePath != null) {
        //delete old image
        await utils.ImageService.deleteImage(savedCategory.categoryImage);
      }

      // Update item

      const [results] = await connection.query(
        "UPDATE " +
          categoryTableName +
          " SET categoryName = ?, categoryImage = ? WHERE id = ?",
        [
          req.body.categoryName,
          imagePath != null ? imagePath : savedCategory.categoryImage,
          req.params.id,
        ]
      );
      connection.release();

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Item not found" });
      }

      const postData = {
        id: parseInt(req.params.id),
        categoryName: req.body.categoryName,
        categoryImage: imagePath,
      };

      responseHandler
        .setSuccess(true)
        .setMessage("Category Updated")
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

module.exports.category = category;
