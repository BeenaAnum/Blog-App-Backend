// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   content: {
//     type: String,
//     required: true
//   },
//   featuredImage: {
//     type: String,
//     required: true
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   authorName: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model('Post', postSchema);
// import mongoose from 'mongoose';

// const postSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   featuredImage: {
//     type: String,
//     required: true,
//   },
//   author: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   authorName: {
//     type: String,
//     required: true,
//   },
//   likes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   }], // ✅ Array of user IDs who liked the post
//   likesCount: {
//     type: Number,
//     default: 0
//   }, // ✅ Cache for like count (for performance)
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // ✅ Update likesCount whenever likes array changes
// postSchema.pre('save', function(next) {
//   this.likesCount = this.likes.length;
//   next();
// });

// export default mongoose.model('Post', postSchema);

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  featuredImage: {
    type: String,
    required: [true, 'Please add a featured image'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for better query performance
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

export default mongoose.model('Post', postSchema);