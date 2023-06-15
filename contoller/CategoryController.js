const CategoryModel = require("../model/category");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhcoov5km",
  api_key: "489687497922462",
  api_secret: "h1wxDJXjO9VhHI5jn_7Af1c7_Gc",
});

class CategoryController {
  static categoryinsert = async (req, res) => {
    const file = req.files.image;

    // console.log(file)
    const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "cate_img",
      width: 400,
    });

    try {
      const { name, image } = req.body;
      const data = new CategoryModel({
        name: name,
        image: {
          public_id: image_upload.public_id,
          url: image_upload.secure_url,
        },
      });
      await data.save();
      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static catedisplay = async (req, res) => {
    try {
      const result = await CategoryModel.find();
      res.status(200).json({
        success: true,
        result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static catupdate = async (req, res) => {
   
    //  try {
        // image id deletion
        const data = await CategoryModel.findById(req.params.id);
          console.log(data)
        const imageid = data.image.public_id;
          console.log(imageid)
       // await cloudinary.uploader.destroy(imageid);
  
        // image update
        // const file = req.files.image;
        // const imagefile = await cloudinary.uploader.upload(file.tempFilePath, {
        //   folder: "cate_img",
        //   width: 400,
        // });
       // const result = await CategoryModel.findByIdAndUpdate(req.params.id, {
         // name: req.body.name,
        //   image: {
        //     public_id: imagefile.public_id,
        //     url: imagefile.secure_url,
        //   },
        // });
      //   await result.save();
      //   res.status(201).json({
      //     success: true,
      //     result,
      //     message: "update successful",
      //   });
      // } catch (error) {
      //   console.log(error);
      // }



    };
  

















   //const catdata = await CategoryModel.findById(req.params.id);
    //  console.log(catdata)

  //  const imageinfo = catdata.image.public_id;
  //  console.log(imageinfo);

    //  await cloudinary.uploader.destroy(imageinfo)

    // image update code
    // const file = req.files.image;
    // const image_upload = await cloudinary.uploader.upload(file.tempFilePath, {
    //   folder: "cate_img",
    //   width: 400,
    // });

    // try {
    //   const data = await CategoryModel.findByIdAndUpdate(req.params.id,{
    //     name:req.body.name,
    //     image:
    //     {   public_id: image_upload.public_id,
    //         url:image_upload.secure_url

    //     }

    //   })
    //   await data.save()
    //   res.status(200).json({
    //     success:true,
    //     message:'Update successfully'
    //   })

    // } catch (error) {
    //   console.log(error)
    // }
  //};

  static catedelete = async (req, res) => {
    const result = await CategoryModel.findById(req.params.id);
    // console.log(result)
    const imgdata = result.image;
    // console.log(imgdata)
    await cloudinary.uploader.destroy(imgdata);

    try {
      const data = await CategoryModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Delete Successfully",
      });
    } catch (error) {}
  };
}
module.exports = CategoryController;
