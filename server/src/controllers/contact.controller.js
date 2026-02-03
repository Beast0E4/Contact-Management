const contactService = require('../services/contact.service');

const getAllContacts = async (req, res) => {
  try {
    const userId = req.user.id; 
    const contacts = await contactService.findAllContacts(userId);
    
    res.status(200).json({ 
      success: true, 
      contacts 
    });
  } catch (error) {
    res.status(500).json({ 
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
    
    res.status(201).json({ 
      success: true, 
      contact: newContact 
    });
  } catch (error) {
    res.status(400).json({ 
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
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ 
      success: true, 
      contact: updatedContact 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;

    console.log (req.params.id);

    const result = await contactService.deleteContactById(userId, contactId);

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Contact deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
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