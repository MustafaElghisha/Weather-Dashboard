import SideCardSkeleton from "./SideCardSkeleton";

export default function SidebarSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </div>
  );
}
