const {check, validationResult} = require("express-validator")

exports.registerValidation = () => [
    check("name", "Prénom est obligatoire").not().isEmpty(),
    check("lastName", "Nom est obligatoire").not().isEmpty(),
    check("email", "Entrer un email valide").isEmail(),
    check("password", "Entrer un password avec 6 caractères min et 15 max").isLength({min:5, max:15})
];
exports.loginValidation = () => [
    check("email", "Entrer un email valide").isEmail(),
    check("password", "Entrer un password avec 6 caractères min et 15 max").isLength({min:5, max:15}),
];

exports.ProfessionalValidation = () => [
    check("governorat", "Sélectionnez un gouvernorat pour continuer.").not().isEmpty(),
    check("spécialité", "sélectionnez une spécialité est obligatoire.").not().isEmpty(),
    check("zoneDeplacement", "Ce champ est obligatoire.").not().isEmpty(),
];

exports.validation = (req, res, next) => {
    const errors = validationResult(req)
    errors.isEmpty()? next() : res.status(400).json({errors: errors.array()});
}