import { CheckedState } from "@radix-ui/react-checkbox";
import { ItemCheckbox } from "./item-checkbox";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getRides } from "@/services/get-rides";

type ItemsListProps = {
  date: Date;
};

export async function ItemsList({ date }: ItemsListProps) {
  const rides = await getRides(date);

  async function updateItem(idItem: string, checked: CheckedState) {
    "use server";

    const isChecked = checked as boolean;
    await prisma.items.update({
      where: {
        id: idItem,
      },
      data: {
        bought: isChecked,
      },
    });
    revalidatePath("/");
  }

  const items = rides.flatMap((r) =>
    r.necessaryItems.map((n) => ({
      ...n,
      cost: Number(n.cost),
    }))
  );

  return (
    <div className="space-y-2 pt-4">
      {items.map((n) => (
        <ItemCheckbox key={n.id} item={n} onUpdate={updateItem} />
      ))}
      {items.length == 0 && (
        <div className="bg-gray-50 border border-gray-100 px-4 py-2 text-gray-600">
          Nenhum item 😊
        </div>
      )}
    </div>
  );
}
