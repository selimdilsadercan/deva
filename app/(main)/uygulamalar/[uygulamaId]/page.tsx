import Image from "next/image";

function Page({ params }: { params: { uygulamaId: string } }) {
  return (
    <div className="flex">
      <div className="flex flex-row w-full justify-between align-middle bg-[#ab2525] rounded-xl ">
        <div className="flex flex-row justify-center gap-3 align-middle ">
          {/* <Image src={}></Image> */}
          <h1>{params.uygulamaId}</h1>
        </div>
      </div>
    </div>
  );
}

export default Page;
