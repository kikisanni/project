import React from "react";
import { Post } from "../types";
import heart from "../../assets/like.png";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  // Define functions for like, edit, delete, reply

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl shadow-gray-400 mb-4">
      <div className="flex items-center justify-between">
        {/* User info and post timestamp */}
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full mr-4"
            src={post.profilePicture}
            alt={`${post.username}'s profile`}
          />
          <div>
            <h5 className="font-bold">{`By ${post.username}`}</h5>
            <p className="text-gray-600 text-sm">{post.createdAt}</p>
          </div>
        </div>
        {/* Post content */}
        <p className="mt-2">{post.content}</p>
        {/* Action buttons */}
        <div className="mt-4 flex items-center">
          <button
            className="text-gray-500 hover:text-gray-700 mr-2"
            onClick={() => {
              /* Like function */
            }}
          >
            {heart} {post.likes}
          </button>
          <button className="text-blue-500 hover:text-blue-700 mr-2">
            Edit
          </button>
          <button className="text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
      {/* Reply functionality */}
      {/* TODO: Implement reply field and button */}
    </div>
  );
};

export default PostItem;
