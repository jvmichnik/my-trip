"use client";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";

type ItemsListProps = {
  item: {
    id: string;
    name: string;
    cost: number;
    bought: boolean;
    ride_id: string;
  };
  onUpdate: (idItem: string, checked: CheckedState) => void;
};

export function ItemCheckbox({ item, onUpdate }: ItemsListProps) {
  return (
    <div className="flex justify-between items-center">
      <Checkbox
        id={item.name}
        onCheckedChange={(checked) => onUpdate(item.id, checked)}
        checked={item.bought}
      />
      <label
        data-bought={item.bought}
        className="flex items-center ml-4 w-full justify-between data-[bought=true]:line-through"
        htmlFor={item.name}
      >
        <strong className="font-normal text-lg">{item.name}</strong>
        <span className="text-gray-500 text-md">${item.cost.toFixed(2)}</span>
      </label>
    </div>
  );
}
