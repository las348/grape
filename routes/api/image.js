const router = require("express").Router();
const s3Controller = require("../../controllers/s3Controller");

// Matches with "/api/image"
router.route("/")
  .post(s3Controller.sign_s3) // Save a new image to the database

module.exports = router;

