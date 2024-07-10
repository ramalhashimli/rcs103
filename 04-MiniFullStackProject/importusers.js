const mysql = require('mysql2');
const fs = require('fs'); 

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Qqaalliibb5653!', 
    database: 'data'
});

fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('JSON fayl; oxunduğu zaman xəta yarandı:', err);
        return;
    }

    const users = JSON.parse(data).users;

    const addUser = (user, callback) => {
        const { name, surname, email, password, role, createdAt, updatedAt, imageUrl } = user;
        const checkEmailQuery = 'SELECT * FROM Users WHERE email = ?';
        connection.query(checkEmailQuery, [email], (error, results) => {
            if (error) {
                console.error('Email yoxlanışında xəta yarandı', error);
                callback(error);
                return;
            }

            if (results.length > 0) {
                console.log(`Email var: ${email}. User pas keçildi.`);
                callback(null, null);
            } else {
                const insertQuery = `
                    INSERT INTO Users (name, surname, email, password, client, createdAt, updatedAt, imageUrl)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;

                const values = [name, surname, email, password, role === 'client', new Date(createdAt), new Date(updatedAt), imageUrl];

                connection.query(insertQuery, values, (error, results) => {
                    if (error) {
                        console.error('User əlavə edildiyi zaman xəta yarandı:', error);
                        callback(error);
                        return;
                    }
                    console.log('User köçürüldü:', results);
                    callback(null, results);
                });
            }
        });
    };

    let userIndex = 0;

    const addNextUser = () => {
        if (userIndex < users.length) {
            addUser(users[userIndex], (error) => {
                if (!error) {
                    userIndex++;
                    addNextUser();
                } else {
                    console.error('Xəta yarandı, user köçürülməsi dayandırıldı:', error);
                    connection.end();
                }
            });
        } else {
            console.log('Bütün Userlər köçürüldü!');
            connection.end();
        }
    };

    addNextUser();
});
