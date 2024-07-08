const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");

let productsData = fs.readFileSync("products.json");
let products = JSON.parse(productsData);

let usersData = fs.readFileSync("users.json");
let users = JSON.parse(usersData);

let favoritesData = fs.readFileSync("favorites.json");
let favorites = JSON.parse(favoritesData);

let basketData = fs.readFileSync("basket.json");
let basket = JSON.parse(basketData);

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get("/", (req, res) => {
    res.render("home");
});

// PRODUCTS ROUTES
app.get("/products", (req, res) => {
    const data = products.products;
    if (data) {
        res.render("products", { products, favorites: favorites.favorites, basket: basket.basket });
    } else {
        res.status(404).json({
            "status": 404,
            "error": "Products not found!"
        });
    }
});

app.post("/product/new", (req, res) => {
    const data = req.body;
    const id = new Date();
    const new_product = {
        id: id.getTime(),
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        stock: data.stock,
        imageUrl: data.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    products.products.push(new_product);

    let updatedData = JSON.stringify(products, null, 2);
    fs.writeFileSync("products.json", updatedData);
    res.render("products", { products, favorites: favorites.favorites, basket: basket.basket });
});

app.get("/create", (req, res) => {
    res.render("index");
});

app.get("/product/:id", (req, res) => {
    res.send("specific product");
});

app.delete("/product/:id", (req, res) => {
    const id = req.params.id;
    let productIndex = products.products.findIndex(product => product.id == id);
    if (productIndex != -1) {
        products.products.splice(productIndex, 1);
        let updatedData = JSON.stringify(products, null, 2);
        fs.writeFileSync("products.json", updatedData);
        res.render("products", { products, favorites: favorites.favorites, basket: basket.basket });
    } else {
        res.status(404).json({
            "status": 404,
            "error": "Product not found!"
        });
    }
});

app.get("/product/edit/:id", (req, res) => {
    const product = products.products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.render("edit_product", { product });
});

app.post("/product/edit/:id", (req, res) => {
    const product = products.products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).send("Product not found");
    }
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.category = req.body.category;
    product.stock = req.body.stock;
    product.imageUrl = req.body.imageUrl;
    product.updatedAt = new Date();

    let updatedData = JSON.stringify(products, null, 2);
    fs.writeFileSync("products.json", updatedData);
    res.redirect("/products");
});

// USERS ROUTES
app.get("/users", (req, res) => {
    const data = users.users;
    if (data) {
        res.render("users", { users: data });
    } else {
        res.status(404).json({
            "status": 404,
            "error": "Users not found!"
        });
    }
});

app.get("/user/new", (req, res) => {
    res.render("create_user");
});

app.post("/user/new", (req, res) => {
    const new_user = {
        id: Date.now(),
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        role: "client",
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: req.body.imageUrl
    };

    users.users.push(new_user);
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    res.redirect("/users");
});

app.get("/user/edit/:id", (req, res) => {
    const user = users.users.find(u => u.id == req.params.id);
    if (user) {
        res.render("edit_user", { user });
    } else {
        res.status(404).send("User not found");
    }
});

app.post("/user/edit/:id", (req, res) => {
    const user = users.users.find(u => u.id == req.params.id);
    if (user) {
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.updatedAt = new Date();
        user.imageUrl = req.body.imageUrl;
        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        res.redirect("/users");
    } else {
        res.status(404).send("User not found");
    }
});

app.delete("/user/:id", (req, res) => {
    const index = users.users.findIndex(u => u.id == req.params.id);
    if (index != -1) {
        users.users.splice(index, 1);
        fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
        res.send("User deleted");
    } else {
        res.status(404).send("User not found");
    }
});

// FAVORITES ROUTES
app.post("/favorites/add/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.products.find(p => p.id == productId);
    if (product && !favorites.favorites.find(fav => fav.id == productId)) {
        favorites.favorites.push(product);
        fs.writeFileSync("favorites.json", JSON.stringify(favorites, null, 2));
    }
    res.sendStatus(200);
});

app.delete("/favorites/remove/:id", (req, res) => {
    const productId = req.params.id;
    favorites.favorites = favorites.favorites.filter(fav => fav.id != productId);
    fs.writeFileSync("favorites.json", JSON.stringify(favorites, null, 2));
    res.sendStatus(200);
});

app.get("/favorites", (req, res) => {
    res.render("favorites", { products: favorites.favorites });
});

// BASKET ROUTES
app.post('/basket/add/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Adding product with ID: ${id} to basket`);
    if (!basket.basket.find(item => item.id == id)) {
        const product = products.products.find(p => p.id == id);
        if (product) {
            basket.basket.push(product);
            let updatedData = JSON.stringify(basket, null, 2);
            fs.writeFileSync('basket.json', updatedData);
            console.log(`Product with ID: ${id} added to basket`);
            res.status(200).json({ message: "Added to basket" });
        } else {
            console.log(`Product with ID: ${id} not found`);
            res.status(404).json({ message: "Product not found" });
        }
    } else {
        console.log(`Product with ID: ${id} is already in the basket`);
        res.status(400).json({ message: "Already in basket" });
    }
});

app.delete('/basket/remove/:id', (req, res) => {
    const id = req.params.id;
    console.log(`Removing product with ID: ${id} from basket`);
    const index = basket.basket.findIndex(item => item.id == id);
    if (index > -1) {
        basket.basket.splice(index, 1);
        let updatedData = JSON.stringify(basket, null, 2);
        fs.writeFileSync('basket.json', updatedData);
        console.log(`Product with ID: ${id} removed from basket`);
        res.status(200).json({ message: "Removed from basket" });
    } else {
        console.log(`Product with ID: ${id} not found in basket`);
        res.status(404).json({ message: "Product not found in basket" });
    }
});


app.get("/baskets", (req, res) => {
    const total = basket.basket.reduce((sum, item) => sum + parseFloat(item.price), 0);
    res.render("baskets", { basket: basket.basket, total: total.toFixed(2) });
});


// PORT
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
});
