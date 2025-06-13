// const Profesional = require("../models/Professional");
const User = require("../models/User");
const Professional = require("../models/Professional");

exports.getAllUsers = async (req, res) => {
  try {
    const listUsers = await User.find();
    res
      .status(200)
      .json({ success: { msg: "la liste des utilisateurs" }, listUsers });
  } catch (error) {
    res
      .status(400)
      .json({ errors: { msg: "Impossible de trouver les utilisateurs" } });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToDel = await User.findByIdAndDelete(id);
    if (!userToDel) {
      return res
        .status(400)
        .json({ errors: { msg: " Cet utilisateur n'existe pas!!" } });
    }
    res.status(200).json({
      success: { msg: "Suppression réussite!" },
      userToDel,
    });
  } catch (error) {
    res.status(400).json({ errors: { msg: "Impossible de supprimer...!" } });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const userToGet = await User.findById(id);
    if (!userToGet) {
      return res
        .status(400)
        .json({errors: { msg: " Cet utilisateur n'existe pas!!" } });
    }
    // await Profesional.deleteOne({user:id});
    res.status(200).json({
      success: { msg: "L'utilisateur est: " },
      userToGet,
    });
  } catch (error) {
    res
      .status(400)
      .json({ errors: [{ msg: "Impossible de trouver l'tilisateur !" }],error });
  }
};

// gérer e statut de validation par l'admin

exports.updateStatutValidation = async (req, res) => {
  try {
    const { id } = req.params;
    const { statutValidation } = req.body;

    // Option "new: true" pour retourner le document mis à jour
    const statusToEdit = await Professional.findByIdAndUpdate(
      id,
      { statutValidation },
      { new: true } 
    );

    if (!statusToEdit) {
      return res.status(400).json({ msg: "Ouvrier introuvable" });
    }

    res.status(200).json({
      msg: "Statut mis à jour",
     });
  } catch (error) {
    res.status(400).json({
      msg: "Erreur lors de la mise à jour du statut de validation",
      error: error.message,
    });
  }
};


