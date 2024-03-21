const router=require("express").Router();
const userController=require("../controllers/userController")
const requireuser=require("../middleware/requireuser")

router.post("/follow",requireuser,userController.followandunfollow);
router.post("/getmypost",requireuser,userController.getmypost);
router.post("/getuserpost",requireuser,userController.getuserpost);
router.get("/getmyinfo",requireuser,userController.getmyinfo);
router.put("/",requireuser,userController.updateprofile);
router.post("/getuserprofile",requireuser,userController.getuserprofile);
router.post("/getpostoffollowings",requireuser,userController.getpostoffollowings);

module.exports=router;
