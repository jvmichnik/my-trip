import dayjs from "dayjs";

import { DaySelect } from "@/components/day-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Places } from "@/components/places";
import { getDates } from "@/services/get-dates";
import { ItemsList } from "@/components/items-list";
import MarkersMap from "@/components/markers";

export default async function Home({
  searchParams,
}: {
  searchParams: { date: Date };
}) {
  const dates = await getDates();
  const dateParams = searchParams.date
    ? dayjs(searchParams.date).utc(true).toDate()
    : null;

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col max-w-[28rem] pt-8">
        <div className="px-20 mb-6">
          <DaySelect days={dates} />
        </div>
        <Tabs defaultValue="places" className="w-full">
          <div className="px-8">
            <TabsList className="w-full">
              <TabsTrigger value="places" className="w-full">
                Places
              </TabsTrigger>
              <TabsTrigger value="items" className="w-full">
                Items
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="places">
            {dateParams && <Places date={dateParams} />}
          </TabsContent>
          <TabsContent value="items" className="px-8">
            {dateParams && <ItemsList date={dateParams} />}
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex-1 bg-gray-400">
        {dateParams && <MarkersMap date={dateParams} />}
      </div>
    </main>
  );
}
