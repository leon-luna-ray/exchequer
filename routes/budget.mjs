import express from 'express';
import Budget from '../models/Budget.mjs';

const router = express.Router();

// GET
router.get('/', async (req, res) => {
  try {
    const { userId } = req.decodedToken;

    const items = await Budget.find({ userId }).select('-transactions -userId');
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch user budgets' });
  }
});

router.get('/:budgetId', async (req, res) => {
  try {
    const { userId } = req.decodedToken;
    const { budgetId } = req.params;

    const budget = await Budget.findOne({ _id: budgetId, userId });
    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch budget details' });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const { userId } = req.decodedToken;
    const newPost = new Budget({
      ...req.body,
      userId: userId,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
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
router.delete('/:id', async (req, res) => {
  try {
    const post = await Budget.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the post' });
  }
});

export default router;
