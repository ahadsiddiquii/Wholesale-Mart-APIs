const utils = require("../../generic/modules/utils");

const UserDatabase = require("../users/user_database");

var dashboard = utils.express.Router();

const responseHandler = new utils.ResponseHandler();

dashboard.use(utils.bodyParser.json());

//Get Dashboard Data
dashboard.get("/", async (req, res) => {
  try {
    totalSales = 0;
    registeredUsers = 0;
    totalOrders = 0;
    activeOrders = 0;

    savedUsers = await UserDatabase.getAllUsers();
    savedUsers = savedUsers[0];
    if (savedUsers != null && savedUsers.length > 0) {
      for (let i = 0; i < savedUsers.length; i++) {
        currentUser = savedUsers[i];
        savedRoles = JSON.parse(currentUser.roles);
        if (savedRoles.includes("user")) {
          registeredUsers++;
        }
      }
    }

    const postData = {
      totalSales: totalSales,
      registeredUsers: registeredUsers,
      totalOrders: totalOrders,
      activeOrders: activeOrders,
    };

    responseHandler
      .setSuccess(true)
      .setMessage("Dashboard data retrieved")
      .setData(postData);
  } catch (error) {
    console.error(error);
    responseHandler
      .setSuccess(false)
      .setMessage(responseHandler.genericErrorMessage)
      .setData(null);
  }
  responseHandler.getResponse(res);
});

module.exports.dashboard = dashboard;
