import { BadgeCheck } from "lucide-react";

type CardProps = {
  ride: {
    id: string;
    name: string;
    cost: number;
    description: string | null;
    order: number;
    latitude: number;
    totalCost: number;
    necessaryItems: {
      id: string;
      name: string;
      cost: number;
      bought: boolean;
      ride_id: string;
    }[];
  };
};

export function Card({ ride }: CardProps) {
  const custo = Number(ride.cost);

  return (
    <div className="border-gray-200 border rounded-lg px-8 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline pr-2">
          <p className="mr-3 text-gray-300 text-lg font-semibold">
            #{ride.order}
          </p>
          <div>
            <h2 className="text-lg font-semibold leading-snug">{ride.name}</h2>
          </div>
        </div>
        <div className="text-xl font-semibold">
          {custo ? `$${ride.totalCost.toFixed(2)}` : "Free"}
        </div>
      </div>
      {custo > 0 && (
        <div className="flex justify-between">
          <strong className="font-medium">Entrada</strong>
          <span className="text-gray-500">${custo.toFixed(2)}</span>
        </div>
      )}
      {ride.description && (
        <p className="text-sm text-gray-500 mt-2">{ride.description}</p>
      )}
      {ride.necessaryItems.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">Items</p>
          <div>
            {ride.necessaryItems.map((n) => (
              <div
                data-bought={n.bought}
                key={n.name}
                className="flex justify-between data-[bought=true]:line-through"
              >
                <strong className="font-medium flex items-center ">
                  <span
                    data-bought={n.bought}
                    className="text-xs mr-2 data-[bought=true]:text-green-500 data-[bought=false]:text-gray-200"
                  >
                    <BadgeCheck size={18} />
                  </span>
                  {n.name}
                </strong>
                <span className="text-gray-500">${n.cost.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
