const express=require("express");
const{handleGenerateNewShortURL}=require("../controlleres/url");
const router=express.Router();


router.post("/",handleGenerateNewShortURL);
module.exports=router;