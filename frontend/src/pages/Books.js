import React from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';

const Books = () => {
  return (
    <div>
      <h1>Books</h1>
      <BookForm />
      <BookList />
    </div>
  );
};

export default Books;
