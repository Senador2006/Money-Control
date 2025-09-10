const express = require('express');
const router = express.Router();
const {
  getUserProfileData,
  updateUserProfile
} = require('../controllers/profileController');

// Rotas de perfil
router.get('/', getUserProfileData);
router.put('/', updateUserProfile);

module.exports = router;
