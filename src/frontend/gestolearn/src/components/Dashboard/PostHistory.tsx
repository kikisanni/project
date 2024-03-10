import { Post } from './types';
import React, { useState, useEffect } from 'react';


function PostHistory() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(3);

  const showMoreThanThreePosts = () => {
    setVisiblePosts(posts.length);
  };
  const showLessThanThreePosts = () => {
    setVisiblePosts(3);
  };

  useEffect(() => {
    // Function to fetch and posts particulary for the logged in user
    const getAllPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/post/post-history", {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
        },});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getAllPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="shadow-lg bg-neutral-100 p-4 rounded-lg shadow col-span-1 md:col-span-2" style={{ minHeight: '340px' }}> {/* Adjust minHeight as needed */}
      <h2 className="font-bold text-lg mb-4 text-center">Post History</h2>
      {posts.length === 0 ? (
        <div className="flex justify-center items-center h-full" style={{ paddingTop: '10%' }}>
          <p>You haven't posted anything yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
          {posts.slice(0, visiblePosts).map((post) => (
            <div key={post._id} className="h-64 p-4 rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center space-x-4 mb-4">
                <img src={post.creator.profilePicture} alt={post.creator.username} className="w-10 h-10 rounded-full" />
                <h3 className="font-bold truncate">{post.creator.username}</h3>
              </div>
              <h4 className="font-bold mb-2 truncate">{post.title}</h4>
              <p className="text-gray-700 text-sm truncate overflow-hidden">{post.content}</p>
              <p className="text-gray-400 text-sm mt-4">{new Date(post.createdAt).toLocaleDateString()} {new Date(post.createdAt).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        {posts.length > 3 && visiblePosts < posts.length && (
          <button
            className="bg-purple-300 hover:bg-purple-400 text-black font-bold py-2 px-4 rounded-lg transition-colors mr-2"
            onClick={showMoreThanThreePosts}
          >
            View More
          </button>
        )}
        {visiblePosts > 3 && (
          <button
            className="bg-purple-300 hover:bg-purple-400 text-black font-bold py-2 px-4 rounded-lg transition-colors"
            onClick={showLessThanThreePosts}
          >
            View Less
          </button>
        )}
      </div>
    </div>
  );
}

export default PostHistory;