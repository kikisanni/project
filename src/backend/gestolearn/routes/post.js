import { Router } from "express";
import Post from "../models/PostModel.js";
import Comment from "../models/CommentModel.js";
import { isAuthenticated } from "../helpers/auth.helpers.js";

const router = Router();

router.post("/add-post", isAuthenticated, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      creator: req.user.id,
    });
    await newPost.save();
    res.json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/get-all-posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "creator",
        select: "username profilePicture",
      })
      .sort({ createdAt: -1 }); // Sort by most recent first
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.put("/edit-post/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "The post is not found!!" });
    }

    if (post.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "User not authorized to edit this specific post !!!",
      });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    await post.save();
    res.json({ message: "Post updated successfully!!", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.delete("/delete-post/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "The post is not found!!" });
    }

    if (post.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "User not authorized to delete this specific post!!",
      });
    }

    await Post.deleteOne({ _id: post._id });
    res.json({ message: "Post removed successfully!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post("/add-comment", isAuthenticated, async (req, res) => {
  try {
    const comment = new Comment({
      postId: req.body.postId,
      creator: req.user.id,
      content: req.body.content,
    });
    await comment.save();
    res.json({
      message: "Comment added successfully !",
      savedComment: comment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/comments/:postId", isAuthenticated, async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate({
        path: "creator",
        select: "username profilePicture",
      })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/post-history", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;

    const posts = await Post.find({ creator: userId }) // Filter posts by user
      .populate({
        path: "creator",
        select: "username profilePicture",
      })
      .sort({ createdAt: -1 }); // Sort by most recent first

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
});

export default router;
