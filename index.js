const express=require("express");
const app=express();
const port=8080;
const path=require("path");
app.set("view enginde","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
//Information Start
let posts=[
{
id:uuidv4(),
name:"Shanto",
about:"I am a student"
},
{
id:uuidv4(),
name:"Shadat",
about:"I am a Developer"
}
]
//Information End

//Rest Api Start
//Get
app.get("/home",(req,res)=>{
res.render("home.ejs",{posts});
})
//Form
app.get("/home/form",(req,res)=>{
res.render("form.ejs");
})
app.post("/home",(req,res)=>{
let id=uuidv4();
let {name,about}=req.body;
posts.push({id,name,about});
res.redirect("/home")
})
//View
app.get("/home/:id",(req,res)=>{
let {id}=req.params;
let post=posts.find((p)=>id===p.id);
res.render("show.ejs",{post});
})
//edit
app.patch("/home/:id",(req,res)=>{
let {id}=req.params;
let newAbout=req.body.about;
let post=posts.find((p)=>id===p.id);
post.about=newAbout;
res.redirect("/home")
})
app.get("/home/:id/edit",(req,res)=>{
let {id}=req.params;
let post=posts.find((p)=>id===p.id);
res.render("edit.ejs",{post})
})
//Delet
app.delete("/home/:id",(req,res)=>{
let {id}=req.params;
posts=posts.filter((p)=>id!==p.id);
res.redirect("/home")
})

//Rest Api End
app.listen(port,()=>{
console.log("App is hereing")
})