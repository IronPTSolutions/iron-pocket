const express = require('express');
const router = express.Router();
const links = require('../controllers/links.controller')

router.get('/links', links.list)
router.post('/links', links.create)
router.get('/links/:id', links.detail)
router.delete('/links/:id', links.delete)

module.exports = router;
