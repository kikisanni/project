import React, { useState, useEffect } from "react";
import { Comment, CommentModalProps } from "./types";

const CommentsModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  postId,
}) => {
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  //Show all comments in the modal
  useEffect(() => {
    if (isOpen) {
      fetch(`http://localhost:8000/post/comments/${postId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => setAllComments(data))
        .catch((error) => console.error("Error getting the comments!!", error));
    }
  }, [isOpen, postId, newComment]);

  //post and add comments in a specific post
  const postComments = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/post/add-comment", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          content: newComment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAllComments([...allComments, data.savedComment]);
        setNewComment("");
      } else {
        console.error(
          "Failed to add comment the comment:",
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
        !isOpen && "hidden"
      }`}
    >
      <div className="relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-white w-3/4">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Comments
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              Close
            </button>
          </div>

          <div className="mt-2">
            {allComments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 p-3 my-2 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-2 mb-4">
                    <img
                      src={comment.creator.profilePicture}
                      alt={`${comment.creator.username}'s profile`}
                      className="rounded-full w-10 h-10"
                    />
                    <h6>{comment.creator.username}</h6>
                    <h6>|</h6>
                    <h6>
                      {new Date(comment.createdAt).toLocaleDateString()}{" "}
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </h6>
                  </div>
                </div>
                <div>
                  <p className="text-left">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-x-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-l-md"
              placeholder="Write a comment to this post..."
            ></textarea>
            <button onClick={postComments}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 fill-purple-300 hover:fill-purple-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsModal;
