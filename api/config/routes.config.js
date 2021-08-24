const express = require('express');
const links = require('../controllers/links.controller')
const router = express.Router();

router.get('/links', links.list)
router.post('/links', links.create)
router.get('/links/:id', links.detail)
router.delete('/links/:id', links.delete)

module.exports = router;
