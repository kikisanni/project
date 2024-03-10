import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function UsernameForm() {

  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = userRef.current?.value;

    // Send the username to the server
    try {
    const response = await fetch("http://localhost:8000/auth/updateUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
      credentials: "include",
    });

    console.log("test", response);
    
    if (response.ok) {
      navigate('/registered')
    } else {
      const errorData = await response.json(); // Parse the JSON error data
      alert(`Failed to update username: ${errorData.message}`);
    }
  } catch(error) {
    console.error(error);
  }

  window.location.reload();


  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-100 sm:max-w-md bg-purple-100">
                <input
                ref={userRef}
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter your username"
                />
              </div>
            </div>
          </div>
        </div>

        <menu className="flex gap-16 mt-4">
          <li>
            <button className="hover:text-purple-500 bg-blue-100 rounded-md py-1 px-2 hover:duration-75">
              <a  href="http://localhost:8000/auth/google/">
                Cancel
              </a>
            </button>
          </li>
          <li>
            <button className="hover:text-purple-500 bg-blue-100 rounded-md py-1 px-2 hover:duration-75">
              Confirm
            </button>
          </li>
        </menu>
      </div>
    </form>
  );
}

export default UsernameForm;
