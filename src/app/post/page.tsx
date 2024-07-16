'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEdgeStore } from "@/lib/edgestore";
import { Alert } from "@/components/ui/alert";
import { SingleImageDropzone } from "@/components/custom/single-image-dropdown";
import { useRouter } from "next/navigation";

interface FormData {
  post_title: string;
  post_content: string;
}

const AddPostForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const { edgestore } = useEdgeStore();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false); 

  const onDrop = (acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true); // Start loading

      if (file) {
        const imageUpload = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          },
        });
        await axios.post(
          "https://socialmedia-production-4469.up.railway.app/api/posts",
          {
            post_content: data.post_content,
            post_title: data.post_title,
            post_image_url: imageUpload?.url,
          }
        );

        reset();
        setImage(null);
        setProgress(0);
        setShowSuccess(true);
        setTimeout(()=>{
          router.replace('/')
        },900)
        router.refresh()
        setTimeout(() => {
          setShowSuccess(false);
        }, 2000);
      }
    } catch (error) {
      alert("Failed to submit post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-8 bg-white rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Post</h2>
        {showSuccess ? (
          <Alert variant={"default"} className="mb-4 text-green-500">
            Post submitted successfully!
          </Alert>
        ):<div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="post_title"
          >
            Post Title
          </label>
          <input
            id="post_title"
            {...register("post_title", { required: true, minLength: 5 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter post title"
          />
          {errors?.post_title && (
            <span className="text-red-500">
              Title is required (minimum 5 letters)
            </span>
          )}
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
            {...register("post_content", { required: true, minLength: 10 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter post content"
          />
          {errors?.post_content && (
            <span className="text-red-500">
              Content is required (minimum of 10 characters)
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Image
          </label>
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          {progress > 0 && (
            <div className="mt-2">
              <progress
                value={progress}
                max={100}
                className="w-full h-2 bg-blue-200 rounded"
              />
              <p>{progress}% Uploaded</p>
            </div>
          )}
        </div>

        <Button type="submit" disabled={loading}> {/* Disable button when loading */}
          {loading ? 'Adding Post...' : 'Add Post'}
        </Button>
        </div>}

      </form>
    </div>
  );
};

export default AddPostForm;
