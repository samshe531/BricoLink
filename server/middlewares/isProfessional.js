const jwt = require("jsonwebtoken");
const Professional = require("../models/Professional");

const isProfessional = async (req, res, next) => {
  try {
    // vérifier si le token existe
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({ errors: [{ msg: "Pas de token" }] });
    }

    // Professional correspond au token
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const foundProfessional = await Professional.findOne({ _id: decode.id });
    if (!foundProfessional) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Utilisateur non trouvé" }] });
    }
    req.Professional = foundProfessional;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ errors: [{ msg: "Impossible de vérifier" }, error] });
  }
};

module.exports = isProfessional;
