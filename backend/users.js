const express = require("express");
const UserRouter = express.Router();

UserRouter.get("/", (req,res) => {});
UserRouter.post("/", (req,res) => {});
UserRouter.patch("/:id", (req,res) => {});

module.exports =  UserRouter;