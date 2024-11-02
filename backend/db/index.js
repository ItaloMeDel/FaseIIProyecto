const { Pool } = require('pg');

const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'librohub',
    password: 'root', 
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
