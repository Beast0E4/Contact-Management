const Contact = require('../models/contact.model');

const findAllContacts = async (userId) => {
  const response = {};

  try {
    const contacts = await Contact.find({ user: userId }).sort({ createdAt: -1 });
    response.contacts = contacts;
    return response;
  } catch (error) {
    response.error = error.message;
    return response;
  }
};

const createNewContact = async (userId, data) => {
  const response = {};

  try {
    if (!userId) {
      response.error = 'Invalid user';
      return response;
    }

    const contact = await Contact.create({
      ...data,
      user: userId
    });

    response.contact = contact;
    return response;
  } catch (error) {
    response.error = error.message;
    return response;
  }
};

const updateContactById = async (userId, contactId, data) => {
  const response = {};

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, user: userId },
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      response.error = 'Contact not found';
      return response;
    }

    response.contact = updatedContact;
    return response;
  } catch (error) {
    response.error = error.message;
    return response;
  }
};

const deleteContactById = async (userId, contactId) => {
  const response = {};

  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      user: userId
    });

    if (!deletedContact) {
      response.error = 'Contact not found';
      return response;
    }

    response.contact = deletedContact;
    return response;
  } catch (error) {
    response.error = error.message;
    return response;
  }
};

module.exports = {
  findAllContacts,
  createNewContact,
  updateContactById,
  deleteContactById
};
