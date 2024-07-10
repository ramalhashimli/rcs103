const express = require("express");
const userController = require("./../controllers/userControllers");

const userRouter = express.Router();

userRouter.get("/", userController.getAllUser);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.deleteUserById);

module.exports = userRouter;
