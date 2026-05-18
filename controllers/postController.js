// import Post from '../models/Post.js';

// // ✅ Get all posts
// export const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .populate('author', 'name profilePicture');
    
//     res.json(posts);
//   } catch (error) {
//     console.error('Get posts error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Get single post by ID
// export const getPostById = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id)
//       .populate('author', 'name profilePicture');
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
    
//     res.json(post);
//   } catch (error) {
//     console.error('Get post by id error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Create new post
// export const createPost = async (req, res) => {
//   try {
//     const { title, content, featuredImage } = req.body;
    
//     // Validation
//     if (!title || !content || !featuredImage) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     const post = await Post.create({
//       title,
//       content,
//       featuredImage,
//       author: req.user._id,
//       authorName: req.user.name
//     });
    
//     res.status(201).json({
//       success: true,
//       post
//     });
//   } catch (error) {
//     console.error('Create post error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Delete post
// export const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
    
//     // Check if user is the author
//     if (post.author.toString() !== req.user._id.toString()) {
//       return res.status(401).json({ message: 'Not authorized to delete this post' });
//     }
    
//     await post.deleteOne();
    
//     res.json({
//       success: true,
//       message: 'Post deleted successfully'
//     });
//   } catch (error) {
//     console.error('Delete post error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
// // ✅ Like a post
// export const likePost = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
    
//     const userId = req.user._id;
//     const hasLiked = post.likes.includes(userId);
    
//     if (hasLiked) {
//       // Unlike: Remove user ID from likes array
//       post.likes = post.likes.filter(id => id.toString() !== userId.toString());
//     } else {
//       // Like: Add user ID to likes array
//       post.likes.push(userId);
//     }
    
//     await post.save();
    
//     res.json({
//       success: true,
//       likesCount: post.likes.length,
//       hasLiked: !hasLiked
//     });
//   } catch (error) {
//     console.error('Like post error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Check if user has liked a post
// export const checkLikeStatus = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
    
//     const hasLiked = post.likes.includes(req.user._id);
    
//     res.json({
//       hasLiked,
//       likesCount: post.likes.length
//     });
//   } catch (error) {
//     console.error('Check like error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
// backend/controllers/postController.js

// export const likePost = async (req, res) => {
//   try {
//     console.log('Like post called for ID:', req.params.id);
    
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
    
//     const userId = req.user._id;
//     const hasLiked = post.likes.includes(userId);
    
//     if (hasLiked) {
//       // Unlike: Remove user ID
//       post.likes = post.likes.filter(id => id.toString() !== userId.toString());
//     } else {
//       // Like: Add user ID
//       post.likes.push(userId);
//     }
    
//     await post.save();
    
//     // Use likes.length instead of likesCount
//     res.json({
//       success: true,
//       likesCount: post.likes.length,  // ✅ Use .length
//       hasLiked: !hasLiked
//     });
//   } catch (error) {
//     console.error('Like post error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const checkLikeStatus = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
    
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' });
//     }
    
//     const hasLiked = post.likes.includes(req.user._id);
    
//     res.json({
//       hasLiked,
//       likesCount: post.likes.length  // ✅ Use .length
//     });
//   } catch (error) {
//     console.error('Check like error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };
import Post from '../models/Post.js';

// ✅ Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, featuredImage } = req.body;
    
    // Validation
    if (!title || !content || !featuredImage) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: title, content, and featuredImage' 
      });
    }
    
    const post = await Post.create({
      title,
      content,
      featuredImage,
      author: req.user._id,
      authorName: req.user.name
    });
    
    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name profilePicture');
    
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name profilePicture');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Get post by id error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await post.deleteOne();
    
    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Like/Unlike a post
export const likePost = async (req, res) => {
  try {
    console.log('Like post called for ID:', req.params.id);
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const userId = req.user._id;
    const hasLiked = post.likes.includes(userId);
    
    if (hasLiked) {
      // Unlike: Remove user ID from likes array
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
      console.log('User unliked the post');
    } else {
      // Like: Add user ID to likes array
      post.likes.push(userId);
      console.log('User liked the post');
    }
    
    await post.save();
    
    res.json({
      success: true,
      likesCount: post.likes.length,
      hasLiked: !hasLiked
    });
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Check if user has liked a post
export const checkLikeStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const hasLiked = post.likes.includes(req.user._id);
    
    res.json({
      hasLiked,
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error('Check like error:', error);
    res.status(500).json({ message: error.message });
  }
};