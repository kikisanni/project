import React, { useState } from "react";
import defaultPfp from "../../assets/Default_pfp.png";
import pencilIcon from "../../assets/pencil_icon.png";
import { PencilIcon } from "@heroicons/react/24/outline";

interface UserProfileProps {
  user: {
    profilePicture: string;
    _id: string;
    fullname: string;
    username: string;
  };
}

function UserProfile({ user }: UserProfileProps) {
  const [editMode, setEditMode] = useState(false);
  const [fullname, setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(user.profilePicture);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfilePicture(file);

      // Create a URL for the selected file for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleImageError(e: { currentTarget: { src: string } }) {
    if (defaultPfp) {
      e.currentTarget.src = defaultPfp;
    } else {
      console.error("Default image is not set or invalid");
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    formData.append("fullname", fullname);
    formData.append("username", username);

    try {
      const response = await fetch(`http://localhost:8000/dashboard/edit/${user._id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });
      
      const result = await response.json();
      // Handle the response
      console.log(result);
  
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className="shadow-lg bg-neutral-100 p-4 rounded-lg flex flex-col h-80 items-center justify-center space-y-4">
      {editMode ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-2"
        >
          <div className="relative">
          <img
              src={previewImage || defaultPfp}
              alt="Profile"
              className="rounded-full h-24 w-24 object-cover"
              onError={handleImageError}
            />
            <label
              htmlFor="imageUpload"
              className="absolute top-0 right-0 cursor-pointer"
            >
              <img src={pencilIcon} alt="Edit" className="h-6 w-6" />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-300 hover:bg-purple-400 font-bold py-2 px-4 rounded-lg text-sm"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <>
          <h2 className="font-bold text-lg mb-4">Profile Details</h2>
          <img
            src={user.profilePicture || defaultPfp}
            alt="Profile"
            className="rounded-full h-24 w-24 object-cover"
            onError={handleImageError}
          />
          <div className="mt-4 text-center">
            <h2 className="text-lg font-bold">{user.fullname}</h2>
            <p className="text-sm text-gray-600">{user.username}</p>
          </div>
          <button
            onClick={() => setEditMode(true)}
            className="bg-purple-300 hover:bg-purple-400 text-black font-bold py-2 px-4 rounded-lg text-sm"
          >
            Edit Profile
          </button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
