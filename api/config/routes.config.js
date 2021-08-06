const express = require('express');
const router = express.Router();

const link = require('../middlewared/link.mid');
const links = require('../controllers/links.controller');

router.get('/links', links.list);
router.post('/links', links.create);
router.get('/links/:id', link.exists, links.detail);
router.delete('/links/:id', link.exists, links.delete);
router.put('/links/:id', link.exists, links.edit);

module.exports = router;
