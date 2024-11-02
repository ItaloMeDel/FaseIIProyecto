import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBook = { title, isbn, price, stock, publisher, publicationDate };
    await axios.post('/api/books', newBook); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
      <input type="text" placeholder="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
