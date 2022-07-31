const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect("mongodb+srv://TeamNewshell:eovXKgDbc4ZEtNzs@cluster0.wf0qiyf.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
        useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log(e);
})