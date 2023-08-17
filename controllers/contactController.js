//@desc GET all contact
//@path GET /api/contacts
//@access Private
const getContacts = (req, res) => {
  res.send("GET all contacts");
};

//@desc Create contact
//@path POST /api/contacts
//@access Private
const createContact = (req, res) => {
  res.send("GET all contacts");
};

//@desc get contact by id
//@path GET /api/contacts/:id
//@access Private
const getContact = (req, res) => {
  res.send("GET all contacts");
};

//@desc Update contact
//@path PUT /api/contacts/:id
//@access Private
const updateContact = (req, res) => {
  res.send("GET all contacts");
};

//@desc DELETE contact
//@path DELETE /api/contacts/:id
//@access Private
const deleteContact = (req, res) => {
  res.send("GET all contacts");
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
