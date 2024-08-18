
var express = require('express');
var router = express.Router();
var cateModel = require("../model/CategoryModel");
const CategoryModel = require('../model/CategoryModel');
const authen = require('./auth');
/* GET users listing. */
router.get('/',authen, async function(req, res, next) {
    const data =  await cateModel.find();
    res.json(data);
});


// thêm cate
router.post('/',async function (req,res,next){
    try{
      const {name_cate,image}=req.body;
      console.log(req.body);
      const data = await CategoryModel.create({name_cate,image});
  res.json({status:200, masega: "thêm thành công"});
      console.log(data);
    }
    catch(console){
      res.json({status:false});
    }
  } );
  
  // edit cate
  
  router.put("/edit/:id", async function (req, res, next) {
    try {
      const{id}=req.params
      const {name_cate,image} = req.body;
  
      var item = await CategoryModel.findById(id);
      if (item) {
        item.name_cate = name_cate ? name_cate : item.name_cate;
        item.image = image ? image : item.image;
        await item.save();
        res.json({ status: 1, message: "Sửa cate thành công" });
      }
    } catch (err) {
      res.json({ status: 0, message: "Sửa cate thất bại" });
    }
  });
  
  //delete
  router.delete("/delete/:id", async function (req, res, next) {
    try {
      var id = req.params.id;
      await CategoryModel.findByIdAndDelete(id);
      res.json({ status: 1, message: "Xóa sản phẩm thành công" });
    } catch (err) {
      res.json({ status: 0, message: "Xóa sản phẩm thất bại", err: err });
    }
  });
  

  // hien thong tin theo id
  
  router.get('/:id',async function (req,res,next){
    try{
      const {id}=req.params;
      const data = await CategoryModel.findById({_id:id});
      res.json(data);
      console.log(data);
    }
    catch(console){
      res.json({status:false});
    }
  } );






module.exports = router;


// tạo kết nối mongoo
// tạo model ==> mẫu của dữ liệu
// route nối model
// view => chuyện của FE
// use route
