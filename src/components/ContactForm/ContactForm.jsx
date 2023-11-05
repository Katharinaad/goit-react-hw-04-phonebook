import { useState } from 'react';
import css from './ContactForm.module.css';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleInputNameChange(event) {
    setName(event.target.value);
    console.log(name);
  }

  function handleInputNumberChange(event) {
    setNumber(event.target.value);
    console.log(number);
  }

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   this.props.onSubmit({ ...this.state });
  //   this.setState({ name: '', number: '' });
  // };

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ name: name, number: number });
    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={name}
          onChange={event => handleInputNameChange(event)}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          placeholder="Enter a name"
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={event => handleInputNumberChange(event)}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Enter a number"
          required
        />
      </label>
      <button className={css.buttonAdd} type="submit">
        Add contact
      </button>
    </form>
  );
}
