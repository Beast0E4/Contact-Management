const express = require('express');
const contactRouter = express.Router();

const contactController = require('../controllers/contact.controller');
const { isUserAuthenticated } = require('../validators/isUserAuthenticated');

contactRouter.get('/', isUserAuthenticated, contactController.getAllContacts);
contactRouter.post('/', isUserAuthenticated, contactController.createContact);
contactRouter.put('/:id', isUserAuthenticated, contactController.updateContact);
contactRouter.delete('/:id', isUserAuthenticated, contactController.deleteContact);

module.exports = contactRouter;