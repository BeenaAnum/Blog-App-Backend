// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
    
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
    
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
    
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePicture: user.profilePicture,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const logout = async (req, res) => {
//   res.json({ message: 'Logged out successfully' });
// };

// export const updateProfile = async (req, res) => {
//   try {
//     const { profilePicture } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { profilePicture },
//       { new: true }
//     ).select('-password');
    
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       profilePicture: user.profilePicture
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });
// };

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
    
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
    
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });
    
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id)
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePicture: user.profilePicture,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const logout = async (req, res) => {
//   res.json({ message: 'Logged out successfully' });
// };

// // ✅ Make sure this function exists
// export const updateProfile = async (req, res) => {
//   try {
//     const { profilePicture } = req.body;
    
//     const user = await User.findByIdAndUpdate(
//       req.user._id,
//       { profilePicture },
//       { new: true }
//     ).select('-password');
    
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       profilePicture: user.profilePicture
//     });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// ✅ Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { profilePicture, name } = req.body;
    const updateData = {};
    
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;
    if (name !== undefined) updateData.name = name;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('Updated user:', user);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
};