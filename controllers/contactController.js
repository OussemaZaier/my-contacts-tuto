const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@desc GET all contact
//@path GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({
    status: "success",
    message: "Data retried successfuly",
    data: contacts,
  });
});

//@desc Create contact
//@path POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const contact = await Contact.Create({ name, email, phone });
  res.status(201).json({
    status: "success",
    message: "Data added successfuly",
    data: contact,
  });
});

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
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  await Contact.remove();
  res.status(200).json({
    status: "success",
    message: "Data deleted successfuly",
    data: null,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
