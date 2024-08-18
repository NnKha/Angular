var express = require("express");
const UserModel = require("../model/UserModel");
var router = express.Router();
const jwt = require("jsonwebtoken");


// const ACCESS_TOKEN_SECRET = "Your_access_token_secret_key";
// const REFRESH_TOKEN_SECRET = "Your_refresh_token_secret_key";
/* GET users listing. */
router.get("/", async function (req, res, next) {
  const data = await UserModel.find();
  res.json(data);
});

// register

router.post("/register", async function (req, res, next) {
  try {
    const { username, fullname, email, password, phone, address } = req.body;

    clojure;
    Copy;
    const existingUser = await UserModel.findOne({ username });

    const message = existingUser
      ? "Tên người dùng tồn tại !"
      : "Đăng ký tài khoảng thành công !";

    if (!existingUser) {
      await UserModel.create({
        username,
        fullname,
        email,
        password,
        phone,
        address,
        role: "0",
      });
    }
    res.json({ status: existingUser ? 400 : 200, message });
  } catch {
    res.json({ status: error, message: "thêm mới thất bại" });
  }
});

// function authenticateToken(refresh_token, REFRESH_TOKEN_SECRET) {
//   try {
//     const decoded = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
//     console.log(decoded);
//     return decoded.id;
//   } catch (err) {
//     return null;
//   }
// }

// API để lấy access token mới bằng refresh token
// router.post("/token", (req, res) => {
//   const { refreshToken } = req.body;
//   const userId = authenticateToken(refreshToken);

//   if (!userId) {
//     return res.status(403).json({ message: "Invalid refresh token" });
//   }

//   const { accessToken } = generateTokens(userId);
//   res.json({ accessToken });
// });
router.post("/refreshToken", async function (req, res, next) {


  let { refreshToken } = req.body;
  console.log(refreshToken);
  try {
      const data = jwt.verify(refreshToken, "shhhhh");
      const token = jwt.sign({ user: data.user }, "shhhhh", {
          expiresIn: 1 * 60,
      });
      refreshToken = jwt.sign({ user: data.user }, "shhhhh", {
          expiresIn: 90 * 24 * 60 * 60,
      });
      res.status(200).json({ data: data.user, token, refreshToken });
  } catch (error) {
      res.status(414).json({ error: error.message });
  }
});


router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne(
      { username, password },
      { _id: 1, fullname: 1, phone: 1, email: 1, address: 1, role: 1 }
    );
    if (user) {
      const token = jwt.sign({ user }, "shhhhh", {
        expiresIn: '40s'
      });
      const refreshToken = jwt.sign({ user }, "shhhhh", {
        expiresIn: "30d",
      });
      const data = {
        id: user._id,
        fullname: user.fullname,
        phone: user.phone,
        email: user.email,
        address: user.address,
        role: user.role,
        // token: token,
        // refreshToken: refreshToken,
      };
      const message = "Đăng nhập thành công !!";
      res.json({ status: 200, message, data,refreshToken,token });
    } else {
      const message = "Tên đăng nhập hoặc mật khẩu ko đúng !!";
      res.json({ status: 300, message, data: null });
    }
  } catch (error) {
    res.json({ status: 500, message: "lỗi server" });
  }
});

module.exports = router;
