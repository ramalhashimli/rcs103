const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qqaalliibb5653!',
    database: 'data'
});

fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
        console.error('JSON fayl; oxunduğu zaman xəta yarandı:', err);
        return;
    }

    const products = JSON.parse(data).products;

    products.forEach(product => {
        const { name, description, price, category, stock, imageUrl, createdAt, updatedAt } = product;

        const query = `
            INSERT INTO Products (name, description, price, category, stock, imageUrl, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [name, description, price, category, stock, imageUrl, new Date(createdAt), new Date(updatedAt)];

        connection.query(query, values, (error, results) => {
            if (error) {
                console.error('Məhsul əlavə edildiyi vaxt xəta yarandı:', error);
                return;
            }
            console.log('Məhsullar köçürüldü:', results);
        });
    });

    connection.end();
});
