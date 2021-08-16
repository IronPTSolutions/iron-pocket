const express = require('express');
const router = express.Router();
const links = require('../controllers/links.controller')

/** TODO: Links CRUD routes */
router.get('/links', links.list)

module.exports = router;
