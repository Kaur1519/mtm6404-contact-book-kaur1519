const KEY = 'contactbook.contacts.v1';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function write(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

function uid() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function sanitize(data) {
  return {
    firstName: (data.firstName || '').trim(),
    lastName: (data.lastName || '').trim(),
    email: (data.email || '').trim(),
    phone: (data.phone || '').trim(),
    company: (data.company || '').trim(),
    address: (data.address || '').trim(),
    notes: (data.notes || '').trim(),
  };
}

function sortByLastThenFirst(a, b) {
  const la = (a.lastName || '').toLowerCase();
  const lb = (b.lastName || '').toLowerCase();
  if (la !== lb) return la.localeCompare(lb);
  const fa = (a.firstName || '').toLowerCase();
  const fb = (b.firstName || '').toLowerCase();
  return fa.localeCompare(fb);
}

export function getAllContacts() {
  return read().slice().sort(sortByLastThenFirst);
}

export function getContactById(id) {
  return read().find(c => c.id === id) || null;
}

export function addContact(data) {
  const contacts = read();
  const id = uid();
  const cleaned = sanitize(data);
  const contact = { id, createdAt: Date.now(), ...cleaned };
  contacts.push(contact);
  write(contacts);
  return id;
}

export function updateContact(id, data) {
  const contacts = read();
  const i = contacts.findIndex(c => c.id === id);
  if (i === -1) return false;
  contacts[i] = { ...contacts[i], ...sanitize(data) };
  write(contacts);
  return true;
}

export function deleteContact(id) {
  const contacts = read();
  const next = contacts.filter(c => c.id !== id);
  write(next);
  return true;
}
