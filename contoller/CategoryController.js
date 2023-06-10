const CategoryModel = require("../modal/category")
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dhcoov5km', 
  api_key: '489687497922462', 
  api_secret: 'h1wxDJXjO9VhHI5jn_7Af1c7_Gc',
 
});

class CategoryController {
       
      static categoryinsert = async(req,res)=>{

        const file = req.files.image

         // console.log(file)
          const image_upload= await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'cate_img',
            width:400,
          })
         
          try {
            const {name ,image}=req.body
            const data = new CategoryModel({
                name:name,
                image:
                {   public_id: image_upload.public_id,
                    url:image_upload.secure_url 
    
                }
            })
            await data.save();
            res.status(201).json({
              success:true,
              data
            })
          } catch (error) {
            console.log(error)
          }
    
      }

      static catedisplay = async(req,res)=>{
        try {
          const result = await CategoryModel.find()
          res.status(200).json({
            success:true,
            result
          })
          
        } catch (error) {
          console.log(error)
        }
     
      }  
}
module.exports = CategoryController