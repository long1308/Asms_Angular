import Joi from "joi";
import Product from "../models/index";

const productSchema = Joi.object({
   name : Joi.string().required().min(3),
   price : Joi.number().required(),
   description : Joi.string(),

});

export const getAll = async (req, res) => {
    try {
      const product = await Product.find();
      if (product.length === 0) {
        return res.json({
          message: "không có sản phẩm nào",
        });
      }
      return res.json(product);
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  };
  
export const get = async function(req,res) {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.json({
                message : "không có sản phẩm nào",

            });
        }
        return res.json(product);
    } catch(error){
        return res.status(400).json({
            message : error,
        });
    }
};
export const create = async function(req,res) {
    try{
        const {error} = productSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(req.body);
        if(!product) {
            return res.json({
                message : "thêm sản phẩm thành công !   ",
            });
        }
        return res.json({
            message : "thêm sản phẩm thành công ",
            data : product,
        });
    } catch (error) {
        return res.status(400).json({
            message : error,
        });
    }
};

export const update = async function (req, res) {
    try{
        const {error} = productSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message : error.details[0].message,
            });
        }
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if(!product){
            return res.json ({
                message : "cập nhật sản phẩm không thành công ",
            });
        }
        return res.json ({
            message: "cập nhật sản phẩm thành công ",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async function(req, res){
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message : "xóa thành công",
            product,
        });
    } catch (error){
        return res.status(400).json({
            message: error,
        });
    }
};