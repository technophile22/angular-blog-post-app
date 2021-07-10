const express = require('express');
const Post = require('./../models/post');
const router = express.Router();

//get all blogs route
router.get('/getAllBlogs', async function (req, res) {
	const posts = await Post.find().sort({ createdAt: 'desc' });
	if (posts == null) {
		res.redirect('/');
	} else {
		res.json(posts);
	}
});

//post a new blog route
router.post('/new', (req, res) => {
	if (!req.body.title) {
		res.json({ success: false, message: 'Blog title is required.' }); // Return error message
	} else {
		if (!req.body.markdown) {
			res.json({ success: false, message: 'Blog content is required.' }); // Return error
		} else {
			const blog = new Post({
				title: req.body.title,
				description: req.body.description,
				markdown: req.body.markdown,
			});
			// Save blog into database
			blog.save((err) => {
				// Check if error
				if (err) {
					if (err.errors) {
						if (err.errors.title) {
							res.json({ success: false, message: err.errors.title.message });
						} else {
							if (err.errors.markdown) {
								res.json({
									success: false,
									message: err.errors.markdown.message,
								});
							} else {
								res.json({ success: false, message: err });
							}
						}
					} else {
						res.json({ success: false, message: err });
					}
				} else {
					res.json({ success: true, message: 'Blog saved!' });
				}
			});
		}
	}
});

//get a single blog route
router.get('/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post == null) {
		res.redirect('/');
	} else {
		res.json(post);
	}
});

module.exports = router;
