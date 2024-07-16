"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ButtonToNavabar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const handleBackHome=()=>{
    router.refresh()
    router.push('/')
  }

  const handleAddPost = ()=>{
    router.push('/post')
  }
  return <div>{pathName!=='/'?<Button onClick={handleBackHome}>Home</Button>:<Button onClick={handleAddPost}>Add post</Button>}</div>;
};

export default ButtonToNavabar;
