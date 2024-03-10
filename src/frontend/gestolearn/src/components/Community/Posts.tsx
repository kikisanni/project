import PostComponent from "./Post";

function Posts() {
  return (
    <div className=" container mx-auto mt-36 font-serif mb-24">
      <div className="border-b border-black text-center">
        <h2 className="text-3xl mb-4">
          Latest Community Activities
        </h2>
      </div>

      <div className="mt-10 w-full">
        <PostComponent/> 
      </div>
    </div>
  );
}

export default Posts;
