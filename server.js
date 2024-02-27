const express = require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();
const PORT= process.env.PORT || 5000;

// midleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

//mongoDB conection
mongoose.connect("mongodb+srv://user5:welcome1@cluster0.uf5cox9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {useNewUrlParser:true, useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console, "Error de Conexion con MongoDB"));
db.once("open",function(){
    console.log("Estas conectado a MongoDB");
});


//schema 
const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String

});

const User = mongoose.model("User",userSchema);


// Routing

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
});


// haciendo post a la DB por medio de los inputs del usuario usand el metodo post
app.post('/signup',(req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email: req.body.email,
        password:req.body.password
    });

    // db guarda el usuario 
     newUser.save()
     // entonces si fue guardado envia la respuesta...
        .then(()=>{
            res.send("Usuario Registrado con exito!!");
        })
     // entonces si no fue guardado envia la respuesta...
   
        .catch(err =>{
            res.status(400).send("Imposible guardar el dato en la DB");
        })
});


// inicializar el servidor
app.listen(PORT,()=>{
    console.log("Servidor escuchando en el puerto"+PORT);
});