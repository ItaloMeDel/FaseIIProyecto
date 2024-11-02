import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('/api/books'); 
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  return (
    <ul>
      {books.map(book => (
        <li key={book.book_id}>{book.title} - {book.price}</li>
      ))}
    </ul>
  );
};

export default BookList;
