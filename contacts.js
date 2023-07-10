// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

const fs = require("fs/promises")
const path = require("path")
const {nanoid} = require("nanoid")
// console.log(__dirname)
const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// const contactsPath = path.resolve("contacts", "contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

// export const listContacts = async()=> {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
// }

const getContactById = async (id) => {
    const contacts = await listContacts()
    const result = contacts.find(contact => contact.id === id)
    return result || null
}

// export const getContactById = async(id) => {
//     const contacts = await listContacts();
//     const result = contacts.find(contact => contact.id === id);
//     return result || null;
// }

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
      const [result] = contacts.splice(index, 1);
      await updateContacts(contacts);
      return result;
    }
// export const removeContact = async (id) => {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(contact => contact.id === id);
//     if(index === -1){
//         return null;
//     }
//     // const result = movies.splice(index, 1)[0];
//     const [result] = contacts.splice(index, 1);
//     await updateConacts(contacts);
//     return result;
// }

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  }
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

// export const addContact = async ({id, name, email, phone})=> {
//     const contacts = await listContacts();
//     const newContact = {
//         id: nanoid(),
//         name,
//         email,
//         phone,
//     }
//     contacts.push(newContact);
//     await updateConacts(contacts);
//     return newContact;
// }

// export default {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
// }

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}