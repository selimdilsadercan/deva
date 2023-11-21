"use client";
import { cn } from "@/lib/utils";
import { TPost } from "@/types/post";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  post: TPost;
}

function Card({ post }: Props) {
  const router = useRouter();

  function handleClick() {
    router.push(`/uygulamalar/${post.Name}`);
  }

  return (
    <div
      className={cn(
        "flex flex-row bg-white border-2 border-gray-200 rounded-lg pt-2.5 pb-2.5 pl-2 hover:bg-[#F7F7F7]",
        post.icon && "transition"
      )}
      onClick={handleClick}
    >
      {post.icon && (
        <Image
          src={post.icon}
          height={20}
          width={20}
          alt="Card Image"
          className="mr-1 rounded-sm my-[2px]"
        />
      )}
      <div>{post.Name}</div>
    </div>
  );
}

export default Card;
