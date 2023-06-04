import { IContact } from "./interfaces";
const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactPath);
  console.log(data.toString() || null);
  return data.toString() || null;
}

async function getContactById(contactId: string) {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());
  console.log(contacts.find((item: IContact) => item.id === contactId) || null);
  return contacts.find((item: IContact) => item.id === contactId) || null;
}

async function removeContact(contactId: string) {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());

  const contactIndex = contacts.findIndex(
    (item: IContact) => item.id === contactId
  );

  if (!~contactIndex) {
    console.log("NO SUCH CONTACT");
    return null;
  }

  const removedItem = contacts.splice(contactIndex, 1)[0];
  console.log("ITEM REMOVED");
  console.log(removedItem);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  console.log("NEW CONTACTS");
  console.log(contacts);
  return removedItem || null;
}

async function addContact(name: string, email: string, phone: string) {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());
  if (!validateContact(name, email, phone)) {
    return;
  }
  if (!isContactUnique(contacts, name, email, phone)) {
    console.log("This contact is not unique");
    return;
  }

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const updatedContacts = [...contacts, newContact];

  await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));
  console.log("Contact successfuly added!");
  console.log(updatedContacts);
}

function isContactUnique(
  data: IContact[],
  name: string,
  email: string,
  phone: string
) {
  const result = data.some((item: IContact) => {
    return item.name === name || item.email === email || item.phone === phone;
  });

  return !result;
}

function validateContact(name: string, email: string, phone: string) {
  if (!name || typeof name !== "string" || !name.match(/^[a-zA-Z]{3,}$/)) {
    console.log("Invalid name");
    return false;
  }

  if (
    !email ||
    typeof email !== "string" ||
    !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  ) {
    console.log("Invalid email");
    return false;
  }

  if (
    !phone ||
    typeof phone !== "string" ||
    !phone.match(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/
    )
  ) {
    console.log("Invalid phone");
    return false;
  }
  return true;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
