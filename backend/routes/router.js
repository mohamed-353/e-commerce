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
// product
const uploadProduct = require("../controllers/product/uploadProduct");
const allProducts = require("../controllers/product/allProducts");
const updateProduct = require("../controllers/product/updateProduct");
const productCategory = require("../controllers/product/productCategory");
const deleteProduct = require("../controllers/product/deleteProduct");

// auth
router.post("/signUp", userSignUp);
router.post("/signIn", userSignIn);
router.get("/userDetails", verifyToken, userDetails);
router.get("/userLogout", verifyToken, userLogout);

// admin panel
router.get("/allUsers", verifyToken, allowed, allUsers)
router.post("/updateUser", verifyToken, allowed, updateUser)

// product
router.post("/uploadProduct", verifyToken, allowed, uploadProduct)
router.get("/allProducts", verifyToken, allowed, allProducts)
router.post("/updateProduct", verifyToken, allowed, updateProduct)
router.post("/deleteProduct", verifyToken, allowed, deleteProduct)
router.get("/productCategory", verifyToken, allowed, productCategory)

module.exports = router;