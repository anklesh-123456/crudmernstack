const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://ankleshdoras513:Ad1997@cluster0.q7pzyxc.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connection succesfully")
}).catch((e)=>{
    console.log(e)
})

const Schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    }

})
const User = mongoose.model("User", Schema);

module.exports = User