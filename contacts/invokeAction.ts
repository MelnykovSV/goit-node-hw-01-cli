import { IInvokeActionsArgs } from "./interfaces";

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({
  action,
  id,
  name,
  email,
  phone,
}: IInvokeActionsArgs) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);

    case "get":
      const singleContact = await getContactById(id);
      return console.log(singleContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    case "add":
      const addedContact = await addContact(name, email, phone);
      return console.log(
        addedContact ||
          "Your data is invalid or contact with such data is already exists"
      );

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

module.exports = {
  invokeAction,
};
