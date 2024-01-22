import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getDates = cache(async () => {
  var result: { date: Date }[] =
    await prisma.$queryRaw`select distinct DATE("data") date from public.ride order by DATE("data");`;

  return result.map((r) => r.date);
});
