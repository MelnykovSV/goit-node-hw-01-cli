import { IInvokeActionsArgs } from "./interfaces";
console.log("STARTING SCRIPT");

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
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "remove":
      removeContact(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
