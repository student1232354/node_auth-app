'use strict';

const express = require('express');

const authController = require('../service/auth.controller');
const { guestOnly, requireAuth } = require('../middleware/guestOnly');

const router = express.Router();

router.get('/password-rules', authController.getPasswordRules);
router.post('/registration', guestOnly, authController.register);
router.get('/activation/:activationToken', authController.activate);
router.post('/login', authController.login);
router.get('/profile', requireAuth, authController.getProfile);
router.get('/users', requireAuth, authController.getUsers);
router.patch('/patching', requireAuth, authController.patching);
router.patch('/patching/parol', requireAuth, authController.parol);

module.exports = router;
