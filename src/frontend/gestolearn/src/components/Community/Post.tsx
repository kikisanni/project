import React, { useState, useEffect } from 'react';
import defaultImage from "../../assets/default-image.webp";
import { Post } from './types';
import EditPostModal from "./EditPostForm";
import CommentsModal from './CommentForm';

const PostComponent: React.FC = () => 
{
  const [posts, setPosts] = useState<Post[]>([]);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [isPostCommentsModalOpen, setIsPostCommentsModalOpen] = useState<boolean>(false);

  function handleImageError(e: { currentTarget: { src: string; }; }) {
    if (defaultImage) {
      e.currentTarget.src = defaultImage;
    } else {
      console.error('Default image is not set or invalid');
    }
  }

  const openEditPostModal = (post: Post) => {
    setEditedPost(post); // Set the post to be edited
    setIsEditPostModalOpen(true);
  };

  const closeEditPostModal = () => setIsEditPostModalOpen(false);

  const openPostCommentsModal = (postId: string) => {
    setSelectedPost(postId);
    setIsPostCommentsModalOpen(true);
  };

  const closePostCommentsModal = () => {
    setIsPostCommentsModalOpen(false);
    setSelectedPost(null);
  };
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/post/get-all-posts', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data: Post[] = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/auth/current', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => setCurrentUser(data._id))
    .catch(error => console.error('Error fetching current user:', error));

    fetchPosts();
  }, []);

  const editSavePost = async (updatedPost: Post) => {
    try {
      const response = await fetch(`http://localhost:8000/post/edit-post/${updatedPost._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      
      if (response.ok) {
        // Refresh the posts
        fetchPosts();
      } else {
        console.error('Failed to update post:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deletePost = async (postId: string) => {
    if (!postId) {
      console.error("Post ID is undefined, can't delete post");
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/post/delete-post/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        console.error('Failed to delete post:', await response.text());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} className="bg-gray-100 p-6 rounded-xl mr-32 ml-32 shadow-lg  mb-12">
          <div className="flex justify-start items-center">
            <div className="flex items-center gap-x-2">
            <img
                src={post.creator.profilePicture || defaultImage }
                alt={`${post.creator.username}'s profile`}
                onError={handleImageError}
                className="rounded-full w-10 h-10"
              />
              <h6>{post.creator.username}</h6>
              <h6>|</h6>
              <h6>posted {new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}</h6>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-bold text-xl mt-6">{post.title}</h2>
            <p>{post.content}</p>
          </div>

          <menu className="flex gap-16 mt-4 justify-end">
            {post.creator._id === currentUser && (                        <><li>
                <button
                  onClick={() => deletePost(post._id)}
                  className="bg-purple-300 hover:bg-purple-400 rounded-lg px-6 py-2 text-sm font-semibold text-gray-900 shadow-2xl shadow-gray-400"
                >
                  Delete
                </button>
              </li><li>
                <button onClick={() => openEditPostModal(post)}
                  className="bg-purple-300 hover:bg-purple-400 rounded-lg px-6 py-2 text-sm font-semibold text-gray-900 shadow-2xl shadow-gray-400"
                >
                  Edit
                </button>
                
                <EditPostModal
                  isOpen={isEditPostModalOpen}
                  onClose={closeEditPostModal}
                  post={editedPost}
                  onSave={editSavePost} />
              </li></>
                
            )}
            <button
              onClick={() => openPostCommentsModal(post._id)}
              className="bg-purple-300 hover:bg-purple-400 rounded-lg px-6 py-2 text-sm font-semibold text-gray-900 shadow-2xl shadow-gray-400"
              >
              Comments
            </button>
          </menu>
        </div>
      ))}
        <CommentsModal
        postId={selectedPost}
        isOpen={isPostCommentsModalOpen}
        onClose={closePostCommentsModal}
      />
    </div>
  );
};

export default PostComponent;
