const express = require('express')
const mongoose = require('mongoose')
const app = express();
const port = 4000;
const User = require('./User.Modal')
const cors = require('cors')


mongoose.connect('mongodb://localhost:27017/samipractice',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('database connected !')
}).catch((err)=>{
    console.log(err)
})



app.use(express.json())
app.use(cors())



app.post('/signup',(req,res)=>{

    const {name,email,password} = req.body;
    const newUser = new User({
        name,
        email,
        password

    })
    newUser.save()
    .then((data)=>{
        res.status(201).json({user:data})
    }).catch((err)=>{
        res.status(400).json({error:'Something Wrong !'})
    })


})



app.get('/getAllUser',(req,res)=>{
    User.find().
    then((user)=>{
        res.status(201).json({user})
    }).then((err)=>{
        res.json({error:err})
    })
})


app.listen(port,()=>{
    console.log(`server is runnnig ${port}`)
})