import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const result = await Contact.paginate({}, options);

    // Try to render EJS template
    res.render("home", {
      totalDocs: result.totalDocs,
      limit: result.limit,
      totalPages: result.totalPages,
      currentPage: result.page,
      counter: result.pagingCounter,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      contacts: result.docs,
    });
  } catch (error) {
    console.error("Error in getContacts:", error);

    // Fallback JSON response if EJS fails
    if (req.accepts("json")) {
      res.status(500).json({
        success: false,
        message: "Error loading contacts",
        error: error.message,
      });
    } else {
      res.status(500).send(`
        <h1>Server Error</h1>
        <p>${error.message}</p>
        <a href="/">Go Home</a>
      `);
    }
  }
};

export const getContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.render("show-contact", { contact });
  } catch (error) {
    console.error("Error in getContact:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addContactPage = (req, res) => {
  try {
    res.render("add-contact");
  } catch (error) {
    console.error("Error in addContactPage:", error);
    res.status(500).json({ error: "Error loading add contact page" });
  }
};

export const addContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error in addContact:", error);

    // Fallback if redirect fails
    if (req.accepts("json")) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).send(`
        <h1>Error creating contact</h1>
        <p>${error.message}</p>
        <a href="/add-contact">Try Again</a>
      `);
    }
  }
};

export const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.render("update-contact", { contact });
  } catch (error) {
    console.error("Error in updateContactPage:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error in updateContact:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error in deleteContact:", error);
    res.status(500).json({ error: error.message });
  }
};
