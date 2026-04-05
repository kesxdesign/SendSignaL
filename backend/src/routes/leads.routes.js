const express = require('express');
const { getLeads, createLead } = require('../controllers/leads.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authenticate); // Require auth for all lead routes

router.get('/', getLeads);
router.post('/', createLead);

module.exports = router;
