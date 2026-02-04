const { StatusCodes } = require('http-status-codes');
const contactService = require('../services/contact.service');

const getAllContacts = async (req, res) => {
  try {
    const userId = req.user.id; 
    const contacts = await contactService.findAllContacts(userId);
    
    res.status(StatusCodes.OK).json({ 
      success: true, 
      contacts 
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const createContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const contactData = req.body;
    
    const newContact = await contactService.createNewContact(userId, contactData);
    
    res.status(StatusCodes.OK).json({ 
      success: true, 
      contact: newContact 
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;
    const updateData = req.body;

    const updatedContact = await contactService.updateContactById(userId, contactId, updateData);

    if (!updatedContact) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Contact not found" });
    }

    res.status(StatusCodes.OK).json({ 
      success: true, 
      contact: updatedContact 
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;

    const result = await contactService.deleteContactById(userId, contactId);

    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Contact not found" });
    }

    res.status(StatusCodes.OK).json({ 
      success: true, 
      message: "Contact deleted successfully" 
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
};