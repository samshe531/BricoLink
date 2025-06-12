
const Professional = require("../models/Professional");
const User = require("../models/User");
const cloudinary = require('../utils/cloudinary');
const upload = require("../utils/multer");

exports.becomeProfessional = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const {
      governorat,
      delegation,
      cite,
      photo,
      speciality,
      description,
      zoneDeplacement,
      statutValidation
    } = req.body;

// console.log(req.body)

    // Vérifie si le profil existe déjà
    // console.log(req.user._id)
    // console.log("body:", req.body);
// console.log("file:", req.file);
    const existing = await Professional.findOne({ user: req.user._id });
// console.log(existing)
    if (existing) {
      return res
        .status(400)
        .json({errors: [{ msg: "Vous avez déjà soumis une demande." }]});
    }
    // const result = await cloudinary.uploader.upload(req.file.path);
    const profile = new Professional({
      user: req.user._id,
      governorat,
      delegation,
      cite,
      photo:result.secure_url,
      cloudinary_id:result.public_id,
      speciality,
      description,
      zoneDeplacement,
      statutValidation

    });
    await profile.save();

    res.status(200).json({success: [{ msg: "Demande soumise avec succès.", profile }]});
  } catch (error) {
    
    // res.status(400).json( { msg: "Erreur serveur lors de la soumission.", error });
    console.error("Erreur complète :", error);
  res.status(400).json({
    errors: [
      {
        msg: "Erreur serveur lors de la soumission.",
        error: error.message || error,
      },
    ],
  });
  }
};


// filter by speciality

exports.filterProfessionals = async (req, res) => {
  try {
    const { speciality } = req.query;

    const query = {
    };

    if (speciality) {
      query.speciality = speciality;
    }

    const filteredList = await Professional.find(query).populate("user");
    const listeFiltre=filteredList.filter((elmt) => (elmt.statutValidation !== "refusé"))
    // console.log("filteredList:", listeFiltre)

    res.status(200).json(listeFiltre);
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Erreur serveur lors du filtrage",error }] });
  }
};

// voir tout les professionnels

exports.getAllPro = async (req, res)  => {
  try {
    const listPro = await Professional.find().populate('user');
    res.status(200).json({msg:"la liste des professionnels.", listPro})
  } catch (error) {
    res.status(400)
    .json({msg:"erreur serveur lors du chargement des professionnels", error})
  }
}


// GET /api/professionals/validé et en attente
exports.getProValideOuEnAttente = async (req, res) => {
  try {
    const validList = await Professional.find({
      statutValidation: { $in: ["validé", "en attente"] }
    }).populate("user");

    res.status(200).json({ validList });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// GET /api/professionals/en attente
exports.getProEnAttente = async (req, res) => {
  try {
    const listeEnAttente = await Professional.find({
      statutValidation: 'en attente',
    }).populate('user');

    res.status(200).json({listeEnAttente});
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
}

// voir un seul pro

exports.getOnePro = async (req, res) => {
  try {
    const {id} = req.params;
    const proToGet = await Professional.findById(id).populate('user')
    if(!proToGet) {
      return res.status(400).json({msg:"professionnel non trouvé"})
    }
    res.status(200).json({success:[{msg:"Le professionnel recherché est: "}], proToGet})
  } catch (error) {
    res.status(400)
    .json({ errors: [{ msg: "erreur serveur lors du chargement des professionnels" }], error })
  }
}



// mise à jour de mon profile Pro
exports.updateProfilePro = async (req, res) => {
  try {
    const { id } = req.params;
    const profileToChange = req.body;

    const profileToEdit = await Professional.findByIdAndUpdate(
      id,
      profileToChange,        
      { new: true }          
    );
    if (!profileToEdit) {
      return res.status(404).json({ msg: "Profil non trouvé" });
    }
const userToEdit = await User.findByIdAndUpdate(profileToEdit.user, profileToChange, {new: true})
// console.log(profileToEdit.user)  
 

    res.status(200).json({ msg: "Profil mis à jour avec succès", profileToEdit, userToEdit });
  } catch (error) {
    res.status(400).json({
      msg: "Impossible d'éditer ce profil",
      error: error.message
    });
  }
};




