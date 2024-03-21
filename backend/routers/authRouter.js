const router=require("express").Router();
const authController=require("../controllers/authController");

router.post("/signup",authController.signupController);
router.post("/login",authController.loginController);
router.get("/refresh",authController.refreshTokenController);
router.post("/logedout",authController.logedout);

module.exports=router;