// import express from 'express';
// import { createPost, getPosts, getPostById, deletePost, likePost,     
//   checkLikeStatus  } from '../controllers/postController.js';
// import protect from '../middleware/protect.js';

// const router = express.Router();

// router.post('/', protect, createPost);
// router.get('/', getPosts);
// router.get('/:id', getPostById);
// router.delete('/:id', protect, deletePost);
// router.put('/:id/like', protect, likePost);
// router.get('/:id/like/status', protect, checkLikeStatus);

// export default router;
import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  checkLikeStatus
} from '../controllers/postController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes (require authentication)
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, likePost);
router.get('/:id/like/status', protect, checkLikeStatus);

export default router;