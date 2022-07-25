const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/api/v1/auth/userController");
const userMiddleware = require("../middlewares/userMiddleware");
const memory = require("../config/memory");

router.post("/login", userController.login);
router.post("/register", userMiddleware.validateEmailRegister, userController.register);
router.get("/profile", userMiddleware.authorize, userController.profile);
router.put( "/profile/:id",userMiddleware.authorize,userMiddleware.validateUpdate, memory.single("image"), userController.updateProfile);
router.put("/change-password",userMiddleware.authorize,userController.changePassword
);

module.exports = router;
