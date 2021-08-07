require('dotenv').config();
const express = require('express');
const mongoDB = require('./db.js');
const bodyParser = require('body-parser');

const app = express();

mongoDB();
const PORT = process.env.PORT || 6000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./model/UserModel.js')
require('./model/PostModel.js')

app.use(express.json())
app.use(require('./routers/LoginSignup.js'))
app.use(require('./routers/Posts.js'))
app.use(require('./routers/UserProfile.js'))

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})