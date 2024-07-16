import PostCard from "./PostCard";

const Posts = async () => {
  const res = await fetch(
    "https://socialmedia-production-4469.up.railway.app/api/posts",
    {
      cache: "no-store", 
    }
  );
  const postData = await res.json();

  return (
    <div className="flex flex-wrap justify-center items-center gap-5 mt-10">
      {postData?.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
