import { MapProps } from "@/components/map";
import dynamic from "next/dynamic";
import { getRides } from "@/services/get-rides";

const Map = dynamic<MapProps>(() => import("@/components/map"), {
  ssr: false,
});

type MarkersMapProps = {
  date: Date;
};

export default async function MarkersMap({ date }: MarkersMapProps) {
  const rides = await getRides(date);

  const markers = rides.map((r) => ({
    lat: r.latitude,
    lng: r.longitude,
    name: r.name,
    order: r.order,
  }));

  return <Map markers={markers} />;
}
