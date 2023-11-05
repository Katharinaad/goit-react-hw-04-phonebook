import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { LS_CONTACTS_KEY } from './constants/localStorageKey';

export function App() {
  const [contacts, seContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Load contacts from localStorage when the component mounts
    const stringifiedContacts = localStorage.getItem(LS_CONTACTS_KEY);
    const parsedContacts = JSON.parse(stringifiedContacts);

    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    }
  });

  useEffect(() => {
    // Save contacts to localStorage when the state changes
    const stringifiedContacts = JSON.stringify(this.state.contacts);
    localStorage.setItem(LS_CONTACTS_KEY, stringifiedContacts);
  }, [contacts]);

  const handleInputChange = event => {
    setFilter(event.target.value);
  };

  const handleDelete = userId => {
    seContacts(prevContacts => prevContacts.filter(user => user.id !== userId));
  };

  // adding data to the state and getting data from the ContactForm component
  const handleSubmit = data => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    seContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name: data.name, number: data.number },
    ]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleSubmit} />

      <h2>Contacts</h2>
      <Filter onChange={handleInputChange} />
      <ContactList
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      />
    </div>
  );
}
