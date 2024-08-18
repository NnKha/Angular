var express = require('express');
const ProductModel = require('../model/ProductModel');
var router = express.Router();
const multer = require("multer");
const authen = require('./auth');


/* GET users listing. */
//[GET] /products/
router.get('/',async function(req, res, next) {
  // res.send('Nguyễn Nhật Kha');
  // res.render("products",{"id":1,"name":'sữa vinamiu'})
  // res.json({id:1,name:'sữa vinamiu'})\
  const data = await ProductModel.find();
  res.json(data)
  // console.log(data);
});

// get product by category
//locolhosst:3000/product/cate/...
// lấy sản phẩm theo cate, lọc
//  /products/cate/
router.get('/cate/:id',async function (req,res,next){
  try{
    const {id}=req.params;
    const data = await ProductModel.find({'id_cate':id});
    res.json(data);
    console.log(data);
  }
  catch(console){
    res.json({status:false});
  }
} );
// search sản phẩm
router.get("/search", async function (req, res, next) {
  const { name } = req.query;
  const data = await ProductModel.find({
      name_product: { $regex: name, $options: "i" },
  });
  res.json(data);
});




// thêm sp
router.post('/',async function (req,res,next){
  try{
    const {name_product,price_new,price_old,image,desc,quantity,id_cate}=req.body;
    const data = await ProductModel.create({name_product,price_new,price_old,image,desc,quantity,id_cate});
    res.json({status:200, masega: "thêm thành công"});
    console.log(data);
  }
  catch(console){
    res.json({status:false});
  }
} );

// edit sp

router.put("/edit/:id", async function (req, res, next) {
  try {
    const{id}=req.params
    const { _id, name_product, price_new, price_old, quantity, image,desc, id_cate } = req.body;

    var item = await ProductModel.findById(id);
    if (item) {
      item.name_product = name_product ? name_product : item.name_product;
      item.price_new = price_new ? price_new : item.price_new;
      item.price_old = price_old ? price_old : item.price_old;
      item.quantity = quantity ? quantity : item.quantity;
      item.desc = desc ? desc : item.desc;
      item.image = image ? image : item.image;
      item.id_cate = id_cate ? id_cate : item.id_cate;
      await item.save();
      res.json({ status: 1, message: "Sửa sản phẩm thành công" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Sửa sản phẩm thất bại" });
  }
});

//delete
router.delete("/delete/:id", async function (req, res, next) {
  try {
    var id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa sản phẩm thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// const upload = multer({ dest: "./public/images" });
const upload = multer({ storage: storage });

router.post(
  "/upload",
  [upload.single("hinh")],
  async (req, res, next) => {
      // Xử lý yêu cầu upload file
      try {
          const { file } = req;
          // Kiểm tra xem có file được gửi lên hay không
          if (!file) {
              return res.json({ status: 0, link: "" });
          } else {
              // Tạo URL để truy cập vào file đã upload
              const url = `http://localhost:3000/public/images/${file.filename}`;
              return res.json({ status: 1, url: url });
          }
      } catch (error) {
          console.log("Upload image error: ", error);
          return res.json({ status: 0, link: "" });
      }
  }
);

//UPLOADS nhiều file hình
router.post(
  "/uploadAll",
  [upload.array("hinhm", 9)],
  async (req, res, next) => {
      try {
          const files = req.files;
          if (!files) {
              return res.json({ status: 0, link: [] });
          } else {
              const url = [];
              for (const singleFile of files) {
                  url.push(
                      `http://localhost:3000/public/images/${singleFile.filename}`
                  );
              }
              return res.json({ status: 1, urls: url });
          }
      } catch (error) {
          console.log("Upload image error: ", error);
          return res.json({ status: 0, link: [] });
      }
  }
);

// hiện chi tiết sản phẩm
router.get('/:id',async function (req,res,next){
  try{
    const {id}=req.params;
    const data = await ProductModel.findById({'_id':id});
    res.json(data);
    console.log(data);
  }
  catch(console){
    res.json({status:false});
  }
} );


module.exports = router;
