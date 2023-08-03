const express=require("express")
const app=express();
const path=require('path')
const  urlRoute=require("./routes/url");
const URL=require('./models/url');

const { connectToMongoDB} =require("./connect");
const port=8001;


connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log('mongodb connected'))

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());

app.get("test",async(req,res)=>
{
    const allUrls=await URL.find({});
    return res.render("home");
})
app.use("/url",urlRoute);

app.get('/:shortId',async(req,res)=>
{
    const shortId=req.params.shortId;
    const entry=await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp:Date.now()
        },
    }
});
res.redirect(entry.redirectURL)
})

app.listen(port,()=> 
{
    console.log("server is running")
})