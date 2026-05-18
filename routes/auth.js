// import express from 'express';
// import { register, login, logout, updateProfile } from '../controllers/authController.js';
// import protect from '../middleware/protect.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/logout', logout);
// router.put('/update-profile', protect, updateProfile);
// // Add this route to get user profile
// router.get('/profile', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
import express from 'express';
import { register, login, logout, updateProfile, getProfile } from '../controllers/authController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update-profile', protect, updateProfile);
router.get('/profile', protect, getProfile); // ✅ Add this route

export default router;