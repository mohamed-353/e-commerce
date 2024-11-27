const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");
const allowed = allowedTo(userRoles.MANAGER, userRoles.ADMIN)

// user
const userSignUp = require("../controllers/user/userSignUp");
const userSignIn = require("../controllers/user/userSignIn");
const userDetails = require("../controllers/user/userDetails");
const userLogout = require("../controllers/user/userLogout");
const allUsers = require("../controllers/user/allUsers");
const updateUser = require("../controllers/user/updateUser");
const addToCart = require("../controllers/user/addToCart");
const addToCartCount = require("../controllers/user/addToCartCount");

// product
const uploadProduct = require("../controllers/product/uploadProduct");
const allProducts = require("../controllers/product/allProducts");
const updateProduct = require("../controllers/product/updateProduct");
const productCategory = require("../controllers/product/productCategory");
const deleteProduct = require("../controllers/product/deleteProduct");
const deleteUser = require("../controllers/user/deleteUser");
const allProductsCategory = require("../controllers/product/allProductsCategory");
const ProductDetails = require("../controllers/product/productDetails");
const cartProducts = require("../controllers/product/cartProducts");
const getQuantity = require("../controllers/product/getQuantity");
const changeQuantity = require("../controllers/product/changeQuantity");
const deleteCartProduct = require("../controllers/product/deleteCartProduct");
const searchProduct = require("../controllers/product/searchProduct");
const filterProduct = require("../controllers/product/filterProduct");

// auth
router.post("/signUp", userSignUp);
router.post("/signIn", userSignIn);
router.get("/userDetails", verifyToken, userDetails);
router.get("/userLogout", verifyToken, userLogout);

// admin panel
router.get("/allUsers", verifyToken, allowed, allUsers)
router.post("/updateUser", verifyToken, allowed, updateUser)
router.post("/deleteUser", verifyToken, allowed, deleteUser)

// product
router.post("/uploadProduct", verifyToken, allowed, uploadProduct)
router.get("/allProducts", verifyToken, allProducts)
router.post("/updateProduct", verifyToken, allowed, updateProduct)
router.post("/deleteProduct", verifyToken, allowed, deleteProduct)
router.get("/productCategory", productCategory)
router.post("/allProductsCategory", allProductsCategory)
router.post("/productDetails", ProductDetails)
router.get("/search", searchProduct)
router.post("/filterProduct", filterProduct)

// addToCart
router.post("/addToCart", verifyToken, addToCart)
router.get("/addToCartCount", verifyToken, addToCartCount)
router.get("/cartProducts", verifyToken, cartProducts)
router.get("/getQuantity", verifyToken, getQuantity)
router.post("/changeQuantity", verifyToken, changeQuantity)
router.delete("/deleteCartProduct", verifyToken, deleteCartProduct)

module.exports = router;