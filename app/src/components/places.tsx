import { getRides } from "@/services/get-rides";
import { Card } from "@/components/card";

type PlacesProps = {
  date: Date;
};

export async function Places({ date }: PlacesProps) {
  const rides = await getRides(date);

  const ridesParsed = rides.map((r) => {
    const totalItemsCost = r.necessaryItems.reduce((acc, cur) => {
      return acc + Number(cur.cost);
    }, 0);
    return {
      ...r,
      day: r.data.toDateString(),
      cost: Number(r.cost),
      totalCost: totalItemsCost,
      necessaryItems: r.necessaryItems.map((n) => ({
        ...n,
        cost: Number(n.cost),
      })),
    };
  });

  const totalCost = ridesParsed.reduce((acc, cur) => {
    return acc + Number(cur.totalCost);
  }, 0);

  return (
    <>
      <div className="mb-2 flex justify-end items-baseline px-8">
        <span className="mr-1 text-lg">Total:</span>
        <strong className="text-2xl font-semibold">
          ${totalCost.toFixed(2)}
        </strong>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-8">
        {ridesParsed.map((r) => (
          <Card key={r.id} ride={r} />
        ))}
      </div>
    </>
  );
}
