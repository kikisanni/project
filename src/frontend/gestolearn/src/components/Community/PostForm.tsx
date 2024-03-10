import defaultImage from "../../assets/default-image.webp";

interface PostFormProps {
  user: {
    profilePicture: string;
  };
}

const PostForm: React.FC<PostFormProps> = ({ user }) => {

  function handleImageError(e: { currentTarget: { src: string; }; }) {
    if (defaultImage) {
      e.currentTarget.src = defaultImage;
    } else {
      console.error('Default image is not set or invalid');
    }
  }

  async function createNewPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Form submitted!");
    const form = event.currentTarget as HTMLFormElement;
    
    // Getting the form data
    const formData = new FormData(form);
    const title = formData.get('title');
    const content = formData.get('description');

    const body = JSON.stringify({ title, body: content });
  
    // Sending the POST request to the backend
    try {
      const response = await fetch('http://localhost:8000/post/add-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, content }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Post creation successful', data);
      } else {
        const errorData = await response.json();
        console.error('Post creation failed', errorData)
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    window.location.reload();
  }

  return (
    <div className="container mx-auto w-4/5 bg-blue-200 rounded-2xl p-8 shadow-lg flex gap-x-8 mt-16">
    <img
      src={user.profilePicture || defaultImage}
      alt="login-image"
      onError={handleImageError}
      className="size-14 rounded-full"
    />

      <form className=" w-full mx-auto flex gap-x-8" onSubmit={createNewPost}>
        <div className="w-full mx-auto grid -mt-4 space-y-6 gap-x-8">
          <div className="rounded-lg grid space-y-1 gap-x-8">
            <label
              htmlFor="title"
              className="block text-sm font-bold leading-6 text-gray-700"
            >
              Title
            </label>

            <input
              name="title"
              type="title"
              className="block flex-1 border-0 bg-purple-50 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 rounded-lg"
              placeholder="Enter the title of your post"
            />
          </div>

          <div className="rounded-lg grid space-y-1 gap-x-8">
            <label
              htmlFor="title"
              className="block text-sm font-bold leading-6 text-gray-700"
            >
              Content
            </label>

            <textarea
              name="description"
              autoComplete="description"
              className="block flex-1 border-0 bg-purple-50 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 rounded-lg"
              placeholder="What would you like to post?"
            />
          </div>
          <div className="ml-auto">
            <button type="submit" className="mt-6 bg-purple-300 hover:bg-purple-400 rounded-lg px-6 py-2 text-sm font-semibold text-gray-900 shadow-2xl shadow-gray-600 ring-1 ring-inset ring-gray-300">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
