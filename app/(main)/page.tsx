import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import Uygulamalar from "@/components/uygulamalar";

function Page() {
  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="uygulamalar">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-4">
          <TabsTrigger value="aboneliklerim">
            Aboneliklerim
          </TabsTrigger>
          <TabsTrigger value="uygulamalar">
            Tüm Uygulamalar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="aboneliklerim">
          tüm aboneliklerim
          {/* {data.map((item) => (
            // <Card name="aboneliğim" />
          ))} */}
        </TabsContent>

        <TabsContent value="uygulamalar">
          <Uygulamalar />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
