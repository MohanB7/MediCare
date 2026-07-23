const express = require('express');
const router=express.Router();
const {CreateUser, LoginUser, GetUsers, DeleteUser} = require("../Controllers/usercontroller");

router.post("/", CreateUser);
router.post("/login", LoginUser);
router.get("/", GetUsers);
router.delete("/:id", DeleteUser);

module.exports=router;