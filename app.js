
const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const sequelize = require('./util/database');
const multerConfig = require('./util/multer')

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

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
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message });
});

sequelize
    .sync()
    .then(() => {
        app.listen(process.env.PORT || 3000)
    })
    .catch(err => {
        console.log(err);
    });
