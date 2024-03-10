import React, { useState, useEffect } from 'react';
import { EditPostModalProps} from './types';

const EditPostModal: React.FC<EditPostModalProps> = ({ isOpen, onClose, post, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setContent(post.content);
        }
    }, [post]);

    const handleSave = async () => {
        if (post) { // Check if post is not null
          if (typeof post._id === 'string') {
            onSave({ ...post, title, content });
          } else {
            console.error('Cannot save post without _id!!');
          }
        } else {
          console.error('Cannot save null post!!');
        }
    
        onClose();
      };
  
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-blue-200 p-6 rounded-2xl shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
    
            <label htmlFor="postTitle" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              id="postTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mb-4 w-full px-3 py-2 border rounded shadow"
              placeholder="Enter your title here"
            />
    
            <label htmlFor="postContent" className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              id="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mb-4 w-full px-3 py-2 border rounded shadow"
              placeholder="Enter your content here"
              rows={6}
            />
    
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={onClose} className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-purple-300 hover:bg-purple-500 py-1 px-2 pl-4 pr-4 font-semibold rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      );
    };
    
export default EditPostModal;
