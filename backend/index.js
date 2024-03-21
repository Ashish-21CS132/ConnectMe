const express=require('express');
const dotenv=require("dotenv");
const dbconnect=require("./dbConnect");
const authRouter=require("./routers/authRouter");
const postRouter=require("./routers/postRouter");
const userRouter=require("./routers/userRouter");
const morgan=require('morgan');
const cookieParser=require("cookie-parser");
const cors=require('cors');
const cloudinary=require("cloudinary").v2;


dotenv.config("./.env");

cloudinary.config({ 
    cloud_name: 'dpfrxd2i8', 
    api_key: '425171819548536', 
    api_secret: 'KUwE_Ty-iVIB57ov92dfGitMTsA' 
  });

const app=express();



app.use(express.json({limit:"20mb"}));
app.use(morgan("common"));
app.use(cookieParser());

app.use(cors({
    credentials:true,
    origin:"https://connect-meee.netlify.app",
}));

app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/post",postRouter)


app.get("/",(req,res)=>{
    res.status(200).send("Ok from server");
})



dbconnect();
const PORT=process.env.PORT || 4001;
app.listen(PORT,()=>{
    console.log(`Port is started ${PORT}`);
})