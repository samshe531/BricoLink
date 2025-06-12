const express = require ('express');
// const User = require('../models/User');

const { getAllPro, getOnePro, updateProfilePro, getProEnAttente, filterProfessionals, getProValideOuEnAttente } = require('../controllers/pro.controller');
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router();


// router.get('/testP', (req, res) => {
//   res.status(200).json("Route /api/pro/test fonctionne !");
// });

// route pour filtrer les pros selon spécialités
router.get("/filterPro", filterProfessionals);

// route pour voir les professionnels validés
router.get('/listePro', getProValideOuEnAttente);

// route pour voir tout les professionels (visiteurs)
router.get('/allProfessionals', getAllPro) ;

//route pour filtrer les demandes de devenir Pro("en attente")
router.get('/toBePro', isAdmin, getProEnAttente );



//route pour afficher un seul professionnel (visiteurs)
router.get('/:id', getOnePro);



//route pour mettre à jour un profile
router.put('/:id',isAuth , updateProfilePro );



module.exports = router;