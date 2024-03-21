const router=require("express").Router();
const postController=require("../controllers/postController");
const requireuser=require("../middleware/requireuser");

router.post("/all",requireuser,postController.post);
router.post('/',requireuser,postController.createPostController);
router.post('/likes',requireuser,postController.likeandunlike);
router.put("/",requireuser,postController.updatepostcontroller);
router.post("/delete",requireuser,postController.deletepost);


module.exports=router;