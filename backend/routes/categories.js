const express = require('express');
const router  = express.Router();
const { getAll, getById } = require('../controllers/categoryController');

router.get('/',    getAll);
router.get('/:id', getById);

module.exports = router;
