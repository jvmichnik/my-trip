"use client";

import "../lib/dayfns";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

type DaySelectProps = {
  days: Date[];
};

export function DaySelect({ days }: DaySelectProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleChangeSearchParam(index: number) {
    const date = days[index];
    const dateFormatted = dayjs(date).format("YYYY-MM-DD");
    router.push(pathname + "?" + createQueryString("date", dateFormatted));
    setCurrent(index);
  }

  useEffect(() => {
    handleChangeSearchParam(0);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const index = api.selectedScrollSnap();
      handleChangeSearchParam(index);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return (
    <Carousel opts={{ align: "center" }} setApi={setApi}>
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3"></CarouselItem>
        {days.map((x, i) => (
          <CarouselItem
            key={x.toISOString()}
            data-current={current == i}
            className="md:basis-1/2 lg:basis-1/3 data-[current=false]:opacity-10"
          >
            <div className="border-gray-200 border rounded-lg text-center py-2 text-xl font-semibold">
              {dayjs(x).format("DD MMM")}
            </div>
          </CarouselItem>
        ))}
        <CarouselItem className="md:basis-1/2 lg:basis-1/3"></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
