import { getAllPosts } from "@/helpers/get-database";
import Card from "./card";

async function Uygulamalar() {
  const posts = await getAllPosts({ includePages: false });

  return (
    <div className="grid grid-cols-1 gap-4 cursor-pointer md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {posts?.map((item) => (
        <Card key={item.id} post={item} />
      ))}
    </div>
  );
}

export default Uygulamalar;
