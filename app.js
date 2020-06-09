
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const multerConfig = require('./util/multer')

const shopProductRoutes = require('./routes/shop/products');
const shopOrderRoutes = require('./routes/shop/orders');
const adminProductsRoutes = require('./routes/admin/products');
const adminUsersRoutes = require('./routes/admin/users');
const adminOrdersRoutes = require('./routes/admin/orders');
const authRoutes = require('./routes/auth');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());
app.use(multer({ storage: multerConfig.fileStorage, fileFilter: multerConfig.fileFilter }).single('image'));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/shop/products', shopProductRoutes);
app.use('/shop/orders', shopOrderRoutes);
app.use('/admin/products', isAuth, adminProductsRoutes);
app.use('/admin/users', isAuth, adminUsersRoutes);
app.use('/admin/orders', isAuth, adminOrdersRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
});

app.listen(process.env.PORT || 3000)

