const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, lastName, email, password, phone } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "cet email existe déjà!" }] });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, lastName, email, password: hashPassword, phone });
    await newUser.save();
    //token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: [{ msg: "L'enregistrement a été effectué avec succès !!" }],
      user:newUser,
      token,
    });
  } catch (error) {
    res
      .status(400)
      .json({ errors: [{ msg: "L'enregistrement a échoué!!!" }], error });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email ou mot de passe incorrect 1" }] });
    }
    const checkPassword = await bcrypt.compare(password, foundUser.password);
    if (!checkPassword) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email ou mot de passe incorrect 2" }] });
    }
    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const { _id, name,lastName, email: userEmail, phone } = foundUser;

    res.status(200).json({
      success: [{ msg: "Connexion réussie." }],  
      user: { _id, name,lastName, email: userEmail, phone },
      token,
    });
  } catch (error) {
     res
      .status(400)
      .json({ errors: [{ msg: "Une erreur est survenue lors de la connexion!" }], error });
  }
};
