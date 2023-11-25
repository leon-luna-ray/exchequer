import express from 'express';
import Expense from '../models/Expense.mjs';
import { getUserFromAuth } from '../utils/user.mjs';

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  try {
    const { userId } = getUserFromAuth(req.headers.authorization);
    const posts = await Expense.find({ userId });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch posts' });
  }
});

// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not fetch the post' });
//   }
// });

// POST
router.post('/', async (req, res) => {
  console.log('POST ROUTE');
  try {
    const newPost = new Expense(req.body);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Could not create the post' });
  }
});

// PATCH
// router.patch('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: 'Could not update the post' });
//   }
// });

// DELETE
// router.delete('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json({ message: 'Post deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Could not delete the post' });
//   }
// });

export default router;
