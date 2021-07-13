const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts');
const app = express();
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/blog-post-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/posts', postRouter);

app.listen(5000);
