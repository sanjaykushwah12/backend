const ProductModel = require("../model/product")
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dhcoov5km', 
  api_key: '489687497922462', 
  api_secret: 'h1wxDJXjO9VhHI5jn_7Af1c7_Gc',
 
});




class ProductController{


 
 static productinsert = async(req,res)=>{

    
    const file = req.files.image

    // console.log(file)
     const prodimg= await cloudinary.uploader.upload(file.tempFilePath,{
       folder:'prod_img',
       width:400,
     })
   
    try {

        const {name,description, price, stock, rating, category,image  } = req.body
        const result = new ProductModel({
            name:name,
           description:description,
           price:price,
           stock:stock,
           rating:rating,
           category:category,
           image:{
         
            public_id: prodimg.public_id,
            url:prodimg.secure_url 
           }
    
        })
        await result.save();
        res.status(201).json({
            success:true,
            result
        })
        
    } catch (error) {
        console.log(error)
    }


  }
  

  static proddisplay = async(req,res)=>{

    try {
        const data = await ProductModel.find()
        res.status(200).json({
            success:true,
            data
        })
        
    } catch (error) {
        console.log(error)
    }
   
  }

  static proddelete = async(req,res)=>{
    const result = await ProductModel.findById(req.params.id)
   // console.log(result)
    const imgdata = result.image;
   // console.log(imgdata)
    await cloudinary.uploader.destroy(imgdata)

    try {
      const data = await ProductModel.findByIdAndDelete(req.params.id)
      res.status(200).json({
        success:true,
        message:'Delete Successfully'
      })
    } catch (error) {
      
    }

  }
}
module.exports = ProductController