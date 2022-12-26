module.exports = app => {
  const authentication = require("../controllers/authentication.controller.js");
  const user = require('../controllers/users.controller.js');
  const tokenomics = require("../controllers/tokenomics.controller.js");
  const project = require("../controllers/project.controller.js");
  const listing = require("../controllers/listing.controller.js");
  var router = require("express").Router();

  router.post("/signin", authentication.signin);

  router.get("/recentuser", user.getRecentUsers);

  router.post("/createuser", user.createUser);

  //Tokenomics API
  router.post("/addtokenomics", tokenomics.addTokenomics);

  router.post("/gettokenomics", tokenomics.getTokenomics);

  router.post("/updatetokenomics", tokenomics.updateTokenomics);

  router.delete("/deletetokenomics", tokenomics.delete);

  //Project API
  router.post("/getproject", project.getCategory);

  router.post("/createprojectcategory", project.createCategory);

  router.post("/updateprojectcategory", project.updateCategory);

  router.delete("/deleteproject", project.delete);

  //Listing Info
  router.post("/getlisting", listing.getListing);

  router.post("/createlisting", listing.createListing);

  router.post("/updatelisting", listing.updateListing);

  router.delete("/deletelisting", listing.delete);

  app.use('/api/', router);
};
