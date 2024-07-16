"use client";

// Import necessary modules
"use client";

// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Changed from next/navigation to next/router
import Loader from "@/components/custom/Loader";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const PostEditPage = ({ params }: any) => {
  interface Comment {
    user_id: string;
    comment_content: string;
  }

  interface PostDetail {
    _id: string;
    id?: string;
    post_title: string;
    post_content: string;
    post_image_url: string;
    likes: string[] | null;
    dislikes: string[] | null;
    comments: Comment[];
  }

  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [updatedPost, setUpdatedPost] = useState<PostDetail | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get<PostDetail>(
          `https://socialmedia-production-4469.up.railway.app/api/posts/${params.id}`
        );
        setPostDetail(response.data);
      } catch (error) {
        if (!showSuccess) {
          setError("Error fetching post detail");
        }
      }
    };

    if (!showSuccess) {
      fetchPostDetail();
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedPost({
      _id: postDetail?._id || "",
      id: postDetail?.id || "",
      post_title: postDetail?.post_title || "",
      post_content: postDetail?.post_content || "",
      post_image_url: postDetail?.post_image_url || "",
      likes: postDetail?.likes || [],
      dislikes: postDetail?.dislikes || [],
      comments: postDetail?.comments || [],
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedPost(null);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `https://socialmedia-production-4469.up.railway.app/api/posts/${params.id}`
      );
      setShowSuccess(true);
      router.refresh();
      setTimeout(() => {
        router.replace("/");
      }, 500);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      setError("Failed to delete post.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put<PostDetail>(
        `https://socialmedia-production-4469.up.railway.app/api/posts/${params.id}`,
        updatedPost
      );
      setPostDetail(response.data);
      setShowSuccess(true);
      setIsEditing(false);
      router.refresh();
      setTimeout(() => {
        router.replace("/");
      }, 900);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      setError("Failed to update post.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedPost({
      ...updatedPost!,
      [e.target.name]: e.target.value,
    });
  };

  if (error) {
    return <div className="flex justify-center mt-32">{error}</div>;
  }

  if (!postDetail) {
    return (
      <div className="flex justify-center mt-32">
        <Loader />
      </div>
    );
  }

  const {
    post_title,
    post_content,
    post_image_url,
    likes,
    dislikes,
    comments,
  } = isEditing ? updatedPost! : postDetail;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 ">
      <div className="bg-white rounded-lg shadow-md p-6">
        {showSuccess && (
          <Alert variant="default" className="text-green-500">
            Post updated successfully!
          </Alert>
        )}
        {!showSuccess && (
          <h2 className="text-2xl font-bold mb-4">{post_title}</h2>
        )}
        {!showSuccess && (
          <div className="flex  justify-center">
            <Image
              src={post_image_url ? post_image_url : ""}
              alt={post_title}
              className=" mb-4 rounded-lg"
              width={500}
              height={300}
            />
          </div>
        )}
        {isEditing && !showSuccess ? (
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="post_title"
              >
                Post Title
              </label>
              <input
                id="post_title"
                name="post_title"
                value={updatedPost?.post_title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter post title"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="post_content"
              >
                Post Content
              </label>
              <textarea
                id="post_content"
                name="post_content"
                value={updatedPost?.post_content}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter post content"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleUpdate} disabled={isLoading}>
                Update
              </Button>
              <Button onClick={handleCancelEdit} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {!showSuccess && (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Post Content</h3>
                  <div className="mt-6 my-2">
                    <Button onClick={handleEdit}>Edit</Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="ml-2"
                          variant="destructive"
                          disabled={isLoading}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Confirm Deletion</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this post? This action
                            cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            onClick={handleDelete}
                            variant="destructive"
                            disabled={isLoading}
                          >
                            Yes, Delete
                          </Button>
                          <Button variant="outline">Cancel</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p>{post_content}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Comments</h3>
                  <ul>
                    {comments?.map((comment, index) => (
                      <li key={index} className="mb-2">
                        <strong>User {comment.user_id}</strong>:{" "}
                        {comment.comment_content}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Likes</h3>
                  <p>{likes ? likes.length : 0}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2">Dislikes</h3>
                  <p>{dislikes ? dislikes.length : 0}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostEditPage;
