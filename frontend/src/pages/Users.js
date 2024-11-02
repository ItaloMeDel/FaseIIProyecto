import React from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <UserForm />
      <UserList />
    </div>
  );
};

export default Users;
