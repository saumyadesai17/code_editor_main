const express = require('express');
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = {stats : true};

compiler.init(options);

app.use(bodyP.json());
app.use("/style.css",express.static("C:/Users/vanda/Desktop/SAUMYA/PROJECT/style.css"));
// app.use("/script.js",express.static("C:/Users/vanda/Desktop/SAUMYA/PROJECT/script.js"));
app.use("/codemirror-5.65.16",express.static("C:/Users/vanda/Desktop/SAUMYA/PROJECT/codemirror-5.65.16"));

const port = 80;

app.post("/compile",function (req, res){
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try{
        if(lang === "C++"){
            if(!input){
                var envData = { OS : "windows" , cmd : "g++" , options : {timeout : 10000}}; // (uses g++ command to compile )
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"ERROR"});
                    }
                });
            }
            else{
                var envData = { OS : "windows" , cmd : "g++" , options : {timeout : 10000}}; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"ERROR"});
                    }
                });
            }
        }
        else if(lang === "Java"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compileJava( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"ERROR"});
                    }
                }); 
            }
            else{
                var envData = { OS : "windows"}; 
                compiler.compileJavaWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"ERROR"});
                    }
                });
            }
        }
        else if(lang === "Python"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"ERROR"});
                    }
                });  
            }
            else{
                var envData = { OS : "windows"}; 
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"ERROR"});
                    }        
                });
            }
        }
    }
    catch(e){
        console.log("ERROR", e);
    }   
})

app.use("/",(req, res)=>{
    res.sendFile("C:/Users/vanda/Desktop/SAUMYA/PROJECT/index.html");
})

app.listen(port,()=>{
    console.log(`THE SERVER IS RUNNING ON PORT ${port}`);
});