const express = require('express');
//  Test
//  DUMMY BUG FIX

const connectDB = require('./utils/mongoClient');
const shorten = require('./routes/shorten');
const index = require('./routes/index');

const config = require('./config.json');

const app = express();
app.use(express.json({}));

connectDB();

app.use('/',index);
app.use('/api/shorten',shorten);

const PORT = config.APP.PORT || 8989;

app.listen(PORT,()=> console.log(`Server started in Port ${PORT}`))