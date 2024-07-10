const express = require("express");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qqaalliibb5653!',
    database: 'data'
});

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get("/", (req, res) => {
    res.render("home");
});

connection.connect(error => {
    if (error) {
        console.error('MySQL bağlantı hatası: ', error);
        return;
    }
    console.log('MySQL bağlantısı uğurla yaradıldı!');
});

// PRODUCTS ROUTES
app.get("/products", (req, res) => {
    const query = "SELECT * FROM Products";

    connection.query(query, (error, products) => {
        if (error) {
            console.error('Məhsulları gətirərkən xəta baş verdi: ', error);
            res.status(500).json({
                status: 500,
                error: "Databaza xətası!"
            });
            return;
        }

        const favoritesQuery = "SELECT * FROM Favorites";
        const basketQuery = "SELECT * FROM Basket";

        connection.query(favoritesQuery, (error, favorites) => {
            if (error) {
                console.error('Favoritləri gətirərkən xəta baş verdi: ', error);
                res.status(500).json({
                    status: 500,
                    error: "Databaza xətası!"
                });
                return;
            }

            connection.query(basketQuery, (error, basket) => {
                if (error) {
                    console.error('Səbəti gətirərkən xəta baş verdi: ', error);
                    res.status(500).json({
                        status: 500,
                        error: "Databaza xətası!"
                    });
                    return;
                }

                res.render("products", { products: products, favorites: favorites, basket: basket });
            });
        });
    });
});
app.get("/create", (req, res) => {
    res.render("create_product");
});
app.post("/product/new", (req, res) => {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();

    const query = `
        INSERT INTO Products (name, description, price, category, stock, imageUrl, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, description, price, category, stock, imageUrl, createdAt, updatedAt];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Məhsul yaradılarkən xəta baş verdi:', error);
            res.status(500).send('Məhsul yaradılarkən xəta baş verdi');
            return;
        }
        res.redirect('/products');
    });
});

app.get("/product/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM Products WHERE id = ?";

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Məhsul axtarılarkən xəta baş verdi:', error);
            res.status(500).send('Məhsul axtarılarkən xəta baş verdi');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Məhsul tapılmadı');
            return;
        }
        res.render("product", { product: results[0] });
    });
});

app.delete("/product/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM Products WHERE id = ?";

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Məhsul silinərkən xəta baş verdi:', error);
            res.status(500).send('Məhsul silinərkən xəta baş verdi');
            return;
        }
        res.send('Məhsul silindi');
    });
});

app.get("/product/edit/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM Products WHERE id = ?";

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Məhsul axtarılarkən xəta baş verdi:', error);
            res.status(500).send('Məhsul axtarılarkən xəta baş verdi');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Məhsul tapılmadı');
            return;
        }
        res.render('edit_product', { product: results[0] });
    });
});

app.post("/product/edit/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock, imageUrl } = req.body;
    const updatedAt = new Date();

    const query = `
        UPDATE Products SET name = ?, description = ?, price = ?, category = ?, stock = ?, imageUrl = ?, updatedAt = ?
        WHERE id = ?
    `;
    const values = [name, description, price, category, stock, imageUrl, updatedAt, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Məhsul yenilənərkən xəta baş verdi:', error);
            res.status(500).send('Məhsul yenilənərkən xəta baş verdi');
            return;
        }
        res.redirect('/products');
    });
});

// USERS ROUTES
app.get("/users", (req, res) => {
    const query = "SELECT * FROM Users";

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Userləri gətirərkən xəta baş verdi: ', error);
            res.status(500).json({
                status: 500,
                error: "Databaza xətası!"
            });
            return;
        }

        if (results.length > 0) {
            res.render("users", { users: results });
        } else {
            res.status(404).json({
                status: 404,
                error: "User tapılmadı!"
            });
        }
    });
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Users WHERE id = ${id}`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Userləri gətirərkən xəta baş verdi: ', error);
            res.status(500).json({
                status: 500,
                error: "Databaza xətası!"
            });
            return;
        }

        if (results.length > 0) {
            res.render("users", { users: results });
        } else {
            res.status(404).json({
                status: 404,
                error: "User tapılmadı!"
            });
        }
    });
});

app.get("/user/new", (req, res) => {
    res.render("create_user");
});

app.post("/user/new", (req, res) => {
    const { name, surname, email, password, imageUrl } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const role = "client"; 
    const client = true; 

    const query = `
        INSERT INTO Users (name, surname, email, password, role, createdAt, updatedAt, imageUrl, client)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, surname, email, password, role, createdAt, updatedAt, imageUrl, client]; 

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('User yaradılarkən xəta baş verdi:', error);
            res.status(500).send('User yaradılarkən xəta baş verdi');
            return;
        }
        res.redirect('/users');
    });
});
app.get("/user/edit/:id", (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM Users WHERE id = ?";

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Useri axtarılarkən xəta baş verdi:', error);
            res.status(500).send('Useri axtarılarkən xəta baş verdi');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('User tapılmadı');
            return;
        }
        res.render('edit_user', { user: results[0] });
    });
});

app.post("/user/edit/:id", (req, res) => {
    const { id } = req.params;
    const { name, surname, email, password, imageUrl } = req.body;
    const updatedAt = new Date();

    const query = `
        UPDATE Users SET name = ?, surname = ?, email = ?, password = ?, updatedAt = ?, imageUrl = ?
        WHERE id = ?
    `;
    const values = [name, surname, email, password, updatedAt, imageUrl, id];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Useri düzəliş edərkən xəta yarandı:', error);
            res.status(500).send('Useri düzəliş edərkən xəta yarandı');
            return;
        }
        res.redirect('/users');
    });
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Users WHERE id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            console.error('Useri silərkən xəta yarandı:', error);
            res.status(500).send('Useri silərkən xəta yarandı');
            return;
        }
        res.send('User silindi');
    });
});

// FAVORITES ROUTES
app.post("/favorites/add/:id", (req, res) => {
    const productId = req.params.id;
    const productQuery = "SELECT * FROM Products WHERE id = ?";

    connection.query(productQuery, [productId], (error, results) => {
        if (error) {
            console.error('Məhsul axtarılarkən xəta baş verdi:', error);
            res.status(500).send('Məhsul axtarılarkən xəta baş verdi');
            return;
        }

        if (results.length === 0) {
            res.status(404).send('Məhsul tapılmadı');
            return;
        }

        const product = results[0];
        const favoriteQuery = "INSERT INTO Favorites (productId, name, description, price, category, stock, imageUrl, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const favoriteValues = [product.id, product.name, product.description, product.price, product.category, product.stock, product.imageUrl, product.createdAt, product.updatedAt];

        connection.query(favoriteQuery, favoriteValues, (error, results) => {
            if (error) {
                console.error('Favoritə əlavə edilərkən xəta baş verdi:', error);
                res.status(500).send('Favoritə əlavə edilərkən xəta baş verdi');
                return;
            }
            res.sendStatus(200);
        });
    });
});

app.delete("/favorites/remove/:id", (req, res) => {
    const productId = req.params.id;
    const query = "DELETE FROM Favorites WHERE productId = ?";

    connection.query(query, [productId], (error, results) => {
        if (error) {
            console.error('Favoritdən çıxarılarkən xəta baş verdi:', error);
            res.status(500).send('Favoritdən çıxarılarkən xəta baş verdi');
            return;
        }
        res.sendStatus(200);
    });
});

app.get("/favorites", (req, res) => {
    const query = "SELECT * FROM Favorites";

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Favoritləri gətirərkən xəta baş verdi: ', error);
            res.status(500).json({
                status: 500,
                error: "Databaza xətası!"
            });
            return;
        }

        res.render("favorites", { products: results });
    });
});

// BASKET ROUTES
app.post('/basket/add/:id', (req, res) => {
    const productId = req.params.id;

    const queryCheck = 'SELECT * FROM Basket WHERE productId = ?';
    connection.query(queryCheck, [productId], (error, results) => {
        if (error) {
            console.error('Basket yoxlanış edildikdə xəta yarandı:', error);
            res.status(500).send('Basket yoxlanış edildikdə xəta yarandı');
            return;
        }

        if (results.length > 0) {
            const queryUpdate = 'UPDATE Basket SET quantity = quantity + 1 WHERE productId = ?';
            connection.query(queryUpdate, [productId], (error, results) => {
                if (error) {
                    console.error('Məhsul miqdarı artırıldıqda xəta yarandı:', error);
                    res.status(500).send('Məhsul miqdarı artırıldıqda xəta yarandı');
                    return;
                }
                res.status(200).json({ message: "Məhsul miqdarı artırıldı" });
            });
        } else {
            const queryInsert = 'INSERT INTO Basket (productId, quantity) VALUES (?, 1)';
            connection.query(queryInsert, [productId], (error, results) => {
                if (error) {
                    console.error('Basketə məhsulu əlavə edən zaman xəta yarandı:', error);
                    res.status(500).send('Basketə məhsulu əlavə edən zaman xəta yarandı');
                    return;
                }
                res.status(200).json({ message: "Basketə məhsul əlavə edildi" });
            });
        }
    });
});

app.delete('/basket/remove/:id', (req, res) => {
    const productId = req.params.id;
    const queryCheck = 'SELECT * FROM Basket WHERE productId = ?';
    connection.query(queryCheck, [productId], (error, results) => {
        if (error) {
            console.error('Basket yoxlanış edildikdə xəta yarandı:', error);
            res.status(500).send('Basket yoxlanış edildikdə xəta yarandı');
            return;
        }

        if (results.length > 0 && results[0].quantity > 1) {
            const queryUpdate = 'UPDATE Basket SET quantity = quantity - 1 WHERE productId = ?';
            connection.query(queryUpdate, [productId], (error, results) => {
                if (error) {
                    console.error('Məhsul miqdarı azalıqda xəta yarandı:', error);
                    res.status(500).send('Məhsul miqdarı azaldıqda xəta yarandı');
                    return;
                }
                res.status(200).json({ message: "Məhsul miqdarı azaldı" });
            });
        } else {
            const queryDelete = 'DELETE FROM Basket WHERE productId = ?';
            connection.query(queryDelete, [productId], (error, results) => {
                if (error) {
                    console.error('Basketə məhsulu azaldan zaman xəta yarandı:', error);
                    res.status(500).send('Basketə məhsulu azaldan zaman xəta yarand');
                    return;
                }
                res.status(200).json({ message: "Basketdən məhsul çıxarıldı" });
            });
        }
    });
});

app.delete('/basket/remove-item/:id', (req, res) => {
    const productId = req.params.id;

    const queryDelete = 'DELETE FROM Basket WHERE productId = ?';
    connection.query(queryDelete, [productId], (error, results) => {
        if (error) {
            console.error('Basketdən məhsul silinərkən xəta yarandı:', error);
            res.status(500).send('Basketdən məhsul silinərkən xəta yarandı');
            return;
        }
        res.status(200).json({ message: "Məhsul basketdən silindi" });
    });
});
app.get("/baskets", (req, res) => {
    const query = "SELECT * FROM Basket";
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Səbət məlumatlarını gətirərkən xəta baş verdi:', error);
            res.status(500).send('Səbət məlumatlarını gətirərkən xəta baş verdi');
            return;
        }
        const total = results.reduce((sum, item) => sum + item.price * item.quantity, 0);
        res.render("baskets", { basket: results, total: total.toFixed(2) });
    });
});

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});
