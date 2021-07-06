const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/posts');
const Post = require('./models/post');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb://localhost:27017/blog-post-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

//Home route (posts/index)
app.get('/', async function (req, res) {
	const posts = await Post.find().sort({ createdAt: 'desc' });
	res.render('posts/index', { posts: posts });
});

//Posts route (routes/posts.js)
app.use('/posts', postRouter);

app.listen(5000);
