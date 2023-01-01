const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config()

const Auth = require('./middlewares/authenticateToken');

const UsersController = require('./Controllers/UsersController');

const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const ProductsController = require("./Controllers/ProductsController");



app.use(express.json());
app.use( express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).json({ message: "Serveur ok" });
});

/**
 * Name: User Register
 * 
 * Description: Route called to create a new user in the database
 * 
 * Request.body: 
 *    username: string(255),
 *    password: string(255), 
 *    email: string(255), 
 *    address: string(255), 
 *    (role_id): int
 */
app.post('/register', async function(req, res, next) {
  try { await UsersController.register(req.body, res) } 
  catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

// /* POST user login */
app.post('/login', async function(req, res, next) {
  try { 
    let response = await UsersController.login(req.body); 
    res.status(response.status).json((response.status) === 200 ? response.accessToken : response); 
  } 
  catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

// /* GET user info */
app.get('/me', Auth.authenticateToken, async function(req, res, next) {
  try { await UsersController.me(req.user['email'], res) } 
  catch(err) {
    console.error(`Error while loging user`, err.message);
    next(err);
  }
})

/* GET All users */
app.get('/users' , Auth.rootAuthentificationToken, async function(req, res, next) {
  try { await UsersController.getUsers(req.query.page, res) } 
  catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
});

app.use("/user", userRouter);

/* POST Create New Product */
app.post('/product/create', Auth.authenticateToken, async function(req, res, next) {
  try { await ProductsController.create(req.body, res, req.user['email']) }
  catch(err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
})

/* GET product infos */
app.get('/product/:id', Auth.authenticateToken, async function(req, res, next) {
  try { await ProductsController.getProduct(req.params.id, res) }
  catch(err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
})

/* DELETE product */
app.delete('/product/:id', Auth.authenticateToken, async function(req, res, next) {
  try { await ProductsController.delete(req.params.id, res) }
  catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
})

/* PUT update user */
app.put('/product/:id', Auth.rootAuthentificationToken, async function(req, res, next) {
  try { await ProductsController.update(req.body, Number(req.params.id), res) }
  catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
})

app.use("/products", productRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});