const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@desc GET all contact
//@path GET /api/contacts
//@access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user._id });
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
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user._id,
  });
  res.status(201).json({
    status: "success",
    message: "Data added successfuly",
    data: contact,
  });
});

//@desc get contact by id
//@path GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user._id) {
    res.status(403);
    throw new Error("User don't have permission to read other user contacts");
  }
  res.status(200).json({
    status: "success",
    message: "Data deleted successfuly",
    data: contact,
  });
});

//@desc Update contact
//@path PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user._id) {
    res.status(403);
    throw new Error("User don't have permission to read other user contacts");
  }
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const newContact = await Contact.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      phone,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    message: "Data deleted successfuly",
    data: newContact,
  });
});

//@desc DELETE contact
//@path DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user._id) {
    res.status(403);
    throw new Error("User don't have permission to read other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
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
