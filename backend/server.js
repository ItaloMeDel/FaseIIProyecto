const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; 

const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');

app.use(cors());
app.use(express.json()); 

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
