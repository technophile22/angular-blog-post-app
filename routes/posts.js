const express = require('express');
const Post = require('./../models/post');
const router = express.Router();

//get all blogs route
router.get('/getAllBlogs', async function (req, res) {
	const posts = await Post.find().sort({ createdAt: 'desc' });
	if (posts == null) {
		res.json({ status: 404, message: 'Not Found', isSuccess: false });
	} else {
		res.json({ status: 200, message: 'Found', isSuccess: true, data: posts });
	}
});

//post a new blog route
router.post('/new', (req, res) => {
	if (!req.body.title) {
		res.json({
			status: 400,
			message: 'Blog Title is required!',
			isSuccess: false,
		});
	} else {
		if (!req.body.markdown) {
			res.json({
				status: 400,
				message: 'Blog Content is required!',
				isSuccess: false,
			});
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
							res.json({
								status: 400,
								message: err.errors.title.message,
								isSuccess: false,
							});
						} else {
							if (err.errors.markdown) {
								res.json({
									status: 400,
									message: err.errors.markdown.message,
									isSuccess: false,
								});
							} else {
								res.json({ status: 400, message: err, isSuccess: false });
							}
						}
					} else {
						res.json({ status: 400, message: err, isSuccess: false });
					}
				} else {
					res.json({
						status: 200,
						message: 'Blog saved successfully!',
						isSuccess: true,
					});
				}
			});
		}
	}
});

//get a single blog route
router.get('/getOneBlog/:id', async (req, res) => {
	if (!req.params.id) {
		res.json({
			status: 400,
			message: 'Blog ID is required!',
			isSuccess: false,
		});
	} else {
		if (req.params.id.length != 24) {
			res.json({ status: 400, message: 'Invalid Blog ID', isSuccess: false });
		} else {
			const post = await Post.findById(req.params.id);
			if (post == null) {
				res.json({ status: 404, message: 'Not Found!', isSuccess: false });
			} else {
				res.json({
					status: 200,
					message: 'success',
					isSuccess: true,
					data: post,
				});
			}
		}
	}
});

//edit blog route
router.put('/editBlog', async (req, res) => {
	if (!req.body._id) {
		res.json({
			status: 400,
			message: 'Blog ID is required!',
			isSuccess: false,
		});
	} else {
		if (!req.body.title) {
			res.json({
				status: 400,
				message: 'Blog Title is required!',
				isSuccess: false,
			});
		} else {
			if (!req.body.markdown) {
				res.json({
					status: 400,
					message: 'Blog Content is required!',
					isSuccess: false,
				});
			} else {
				const post = await Post.findById(req.body._id);
				console.log(post);
				post.title = req.body.title;
				post.description = req.body.description;
				post.markdown = req.body.markdown;

				// Save blog into database
				post.save((err) => {
					// Check if error
					if (err) {
						if (err.errors) {
							if (err.errors.title) {
								res.json({
									status: 400,
									message: err.errors.title.message,
									isSuccess: false,
								});
							} else {
								if (err.errors.markdown) {
									res.json({
										status: 400,
										message: err.errors.markdown.message,
										isSuccess: false,
									});
								} else {
									res.json({ status: 400, message: err, isSuccess: false });
								}
							}
						} else {
							res.json({ status: 400, message: err, isSuccess: false });
						}
					} else {
						res.json({
							status: 200,
							message: 'Blog edited successfully!',
							isSuccess: true,
						});
					}
				});
			}
		}
	}
});

//delete blog route
router.delete('/deleteBlog/:id', async (req, res) => {
	if (!req.body._id) {
		res.json({
			status: 400,
			message: 'Blog ID is required!',
			isSuccess: false,
		});
	} else {
		const post = await Post.findById(req.params.id);

		post.delete((err) => {
			// Check if error
			if (err) {
				res.json({ status: 400, message: err, isSuccess: false });
			} else {
				res.json({
					status: 200,
					message: 'Blog deleted successfully!',
					isSuccess: true,
				});
			}
		});
	}
});

module.exports = router;
