//require express
const express = require("express");

const User = require("../models/User");
const {
  getAllUsers,
  deleteUser,
  getOne,
  updateStatutValidation,
} = require("../controllers/users.controller");
// const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const isAdmin = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const { becomeProfessional } = require("../controllers/pro.controller");
const router = express.Router();

// test route pour l'admin
// router.get("/testAdmin", (req, res) => {
//     res.status(200).json({msg: "Hello Admin!!"});
// })

// route pour faire une demande de dvenir professionnel
router.post("/professional", isAuth, upload.single("photo"), becomeProfessional);


//route pour visualiser touts les utilisateurs
router.get("/all", isAdmin, getAllUsers);

// route pour supprimer un utilisateur
router.delete("/:id", isAdmin, deleteUser);

//route pour que l'admin get un utilisateur
router.get("/:id", isAdmin, getOne);

//  route pour gérer les demandes d'avoir un statut professionnel
router.put("/:id", isAdmin, updateStatutValidation);

module.exports = router;
