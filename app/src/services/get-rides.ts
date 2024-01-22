import { prisma } from "@/lib/prisma";
import dayjs from "dayjs";
import { cache } from "react";

export const getRides = cache(async (date: Date) => {
  console.log(date, dayjs(date).add(1, "d").toDate());

  var result = await prisma.ride.findMany({
    include: {
      necessaryItems: {
        orderBy: {
          name: "asc",
        },
      },
    },
    where: {
      data: {
        gte: date,
        lte: dayjs(date).add(1, "d").toDate(),
      },
    },
  });

  return result;
});
