const express = require('express')
const app = express()
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const cors = require('cors');

const CategoryController = require('./contoller/CategoryController');
const ProductController = require('./contoller/ProductController');
const UserController = require('./contoller/UserController');
const port = 5000


app.use(fileUpload({useTempFiles: true}));

app.use(express.json())

connectdb()

app.use(cors())
//app.use(express.urlencoded({ extended: false }));



app.get('/', (req, res) => {
  res.send('live API of E-Commerce ')
})

// user 
app.post('/usersregister',UserController.userreg)
app.get('/userdetails',UserController.userinfo)
app.get('/userlogin',UserController.user_verify)
app.post('/passwordupdate', UserController.pwd_update)
app.post('/forgetpassword', UserController.forget_password)

// category
app.post('/category',CategoryController.categoryinsert)
app.get('/categorydisplay', CategoryController.catedisplay)
app.post('/categoryupdate/:id',CategoryController.catupdate)  
app.get('/categorydelete/:id', CategoryController.catedelete)

// product
app.post('/product', ProductController.productinsert)
app.get('/productdisplay', ProductController.proddisplay)
app.get('/productdelete/:id', ProductController.proddelete)






app.listen(port, () => {
  console.log(`Server is running on localhost  ${port}`)
})