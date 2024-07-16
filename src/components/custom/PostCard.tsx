import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

const PostCard = ({ post}:any) => {
  return (
    <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md hover:scale-95 p-5">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
        {post.post_image_url && <Image src={post?.post_image_url} alt={post.post_title} className="w-full h-full object-cover" width={100} height={100}/>}
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {post.post_title}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {post.post_content}
        </p>
      </div>
      <div className="p-6 pt-0 flex items-center justify-between">
        <button 
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
        >
          <FaThumbsUp />
          <span>{!post?.likes?.length?"0":post?.likes?.length}</span>
        </button>
        <button 
          className="flex items-center space-x-2 text-red-500 hover:text-red-700"
        >
          <FaThumbsDown />
          <span>{!post?.dislikes?.length?"0":post?.dislikes?.length}</span>
        </button>
       <Link href={`post/detail/${post?._id}`}><Button>
          Read More
        </Button>
        </Link> 
      </div>
    </div>
   
  );
};

export default PostCard;
