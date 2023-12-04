var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
})

var height = window.innerHeight;
var width = window.innerWidth;
var size = editor.setSize(0.7 * width, 700);
var input = document.getElementById("input");
var output = document.getElementById("output");
var run = document.getElementById("run");

var option = document.getElementById("inlineFormSelectPref");
option.addEventListener("change",function(){
    if(option.value == "C++"){
        editor.setOption("mode","text/x-c++src");
    }
    else if(option.value == "Java"){
        editor.setOption("mode","text/x-java");
    }
    else if(option.value == "Python"){
        editor.setOption("mode","text/x-python");
    }
    else{
        editor.setOption("mode","");
    }
});

var code;
run.addEventListener("click",async function(){
    code = {
        code : editor.getValue(),
        input : input.value(),
        lang : option.value()
    }
    var oData = await fetch("http://localhost/compile",{
    method : "POST",
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify(code)
})

var d = await oData.json();
output.value = d.output;
})