var express = require("express");
var router = express.Router();
var multer = require("multer");
const path = require("path");
var userController = require("../controllers/userController");

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, res, cb) {
            console.log("__dirname =========== ", __dirname + "/public/uploads");
            cb(null, __dirname + "/../public/uploads");
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname).toLowerCase());
        },
    }),
}).single("file");
/* GET users listing. */
router.post("/addUser", upload, userController.addUser);
router.get("/getUser", userController.getUser);
router.get("/getUserById/:id", userController.getUserById);
router.put("/updateUser/:id", upload, userController.updateUser);
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
