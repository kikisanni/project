import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import { Post } from "../types";
import SortingDropdown from "./SortingDropdown";
import Pagination from "./Pagination";

interface PostsProps {
  user: any;
}

interface DataType {
  // Define the structure of your data here
}

const Posts: React.FC<PostsProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<DataType[]>([]); // Replace DataType[] with your data type
  const postsPerPage = 5;

  useEffect(() => {
    // TODO: Fetch posts from the backend and setPosts
  }, []);

  useEffect(() => {
    // Fetch your data and set it in the state
    const fetchData = async () => {
      // Replace this with your data fetching logic
      const response = await fetch("your-api-endpoint");
      const result = await response.json();
      setData(result.items);
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / postsPerPage);
  // Calculate the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    //Fetch new data for the page or adjust your displayed data accordingly
  };

  // Change page (Pagination logic)
  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className=" container mx-auto mt-36">
      <div className="border-b border-black flex justify-between">
        <h2 className="text-3xl justify-start mb-4">
          Latest Community Activities
        </h2>
        <SortingDropdown />
      </div>

      {currentPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Posts;
