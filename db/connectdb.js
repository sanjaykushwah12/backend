const mongoose = require('mongoose')
const live_url = "mongodb+srv://sanjaykushwah2020:sanjay123@apieco.gabm26e.mongodb.net/apieco?retryWrites=true&w=majority"
const connectdb =()=>{
    return mongoose.connect(live_url)
    .then(()=>{
        console.log('connection successfully')
    }).catch((err)=>{
        console.log(err)
    })   

}
module.exports =connectdb