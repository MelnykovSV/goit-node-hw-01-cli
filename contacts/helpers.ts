import { IContact } from "./interfaces";

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
  isContactUnique,
  validateContact,
};
