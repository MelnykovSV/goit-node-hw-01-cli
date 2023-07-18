import { IContact } from "./interfaces";
const { validateContact, isContactUnique } = require("./helpers");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactPath);
  return data.toString() || null;
}

async function getContactById(contactId: string) {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());
  return contacts.find((item: IContact) => item.id === contactId) || null;
}

async function removeContact(contactId: string) {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());
  const contactIndex = contacts.findIndex(
    (item: IContact) => item.id === contactId
  );
  if (!~contactIndex) {
    return null;
  }
  const removedItem = contacts.splice(contactIndex, 1)[0];
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return removedItem;
}

async function addContact(name: string, email: string, phone: string) {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());

  if (
    !validateContact(name, email, phone) ||
    !isContactUnique(contacts, name, email, phone)
  ) {
    return null;
  }

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
