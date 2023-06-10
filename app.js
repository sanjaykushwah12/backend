const express = require('express')
const app = express()
const connectdb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const cors = require('cors');

const CategoryController = require('./contoller/CategoryController');
const ProductController = require('./contoller/ProductController');
const port = 5000


app.use(fileUpload({useTempFiles: true}));

app.use(express.json())
connectdb()
 app.use(cors())

// category
app.post('/category',CategoryController.categoryinsert)
app.get('/categorydisplay', CategoryController.catedisplay)
  


// product
app.post('/product', ProductController.productinsert)
app.get('/productdisplay', ProductController.proddisplay)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})