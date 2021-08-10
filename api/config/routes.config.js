const express = require('express');
const router = express.Router();
const links = require('../controllers/links.controller')
const link = require('../middlewares/link-mid')

/** TODO: Links CRUD routes */

router.get('/links', links.list)
router.post('/links', links.create)
router.delete('/links/:id', link.findLink, links.delete)
router.get('/links/:id', link.findLink, links.detail)
//router.put('/links/:id', link.findLink, links.edit)

module.exports = router;
