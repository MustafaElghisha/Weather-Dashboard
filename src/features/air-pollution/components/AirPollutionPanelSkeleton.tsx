import PollutionMeterCardSkeleton from "./PollutionMeterCardSkeleton";

export default function AirPollutionPanelSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <PollutionMeterCardSkeleton key={index} />
      ))}
    </div>
  );
}
