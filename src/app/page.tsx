import Footer from "@/components/custom/Footer";
import Posts from "@/components/custom/Posts";

export default function Home() {
  return ( 
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow px-10 mb-2 pb-2">
      <Posts />
    </div>
    <div className="sticky bottom-0">
      <Footer />
    </div>
  </div>
  );
}
