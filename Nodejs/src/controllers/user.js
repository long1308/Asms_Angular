import User from "../models/user";
import { signinSchema, signupSchema } from "../Schema/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const { SECRET_CODE } = process.env;

export const signup = async (req, res) => {
  try {
    // validate đầu vào
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }
    // Kiểm tra trong db có tk không?
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        messages: "Email đã tồn tại",
      });
    }
    // Mã hóa mật khẩu

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    user.password = undefined;
    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      accessToken: token,
      user,
    });
  } catch (error) {}
};
export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(400).json({
        messages: errors,
      });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        messages: "Email không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        messages: "Sai mật khẩu",
      });
    }
    const token = jwt.sign({ id: user._id }, SECRET_CODE, { expiresIn: "1d" });
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Loi server!",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const user = await User.find();
    if (user.length === 0) {
      return res.json({
        message: "Không có user nào !",
      });
    }
    return res.json({
      message: "Lấy danh sách user thành công !",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.json({
        message: "Xóa sản phẩm không thành công",
      });
    }
    return res.json({
      message: "Xóa user thành công",
      user,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};


export const update = async (req, res) => {
  try {
    // validate
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((error) => error.message),
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.json({
        message: "Cập nhật sản phẩm không thành công !",
      });
    }
    return res.json({
      message: "Cập nhật sản phẩm thành công !",
      user,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};

export const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({
        message: "Lấy user không thành công !",
      });
    }
    return res.json({
      message: "Lấy 1 user thành công !",
      user,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Id không hợp lệ" });
    }
  }
};