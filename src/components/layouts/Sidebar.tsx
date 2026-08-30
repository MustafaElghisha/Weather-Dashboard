import { Suspense, type Dispatch, type SetStateAction } from "react";
import clsx from "clsx";
import Chevron from "/src/assets/ChevronLeft.svg?react";
import { AirPollutionPanel } from "@/features/air-pollution/components/AirPollutionPanel";
import AirPollutionPanelSkeleton from "@/features/air-pollution/components/AirPollutionPanelSkeleton";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  return (
    <aside
      className={clsx(
        "bg-sidebar border-sidebar-border fixed top-0 right-0 h-dvh w-(--sidebar-width) scrollbar-none overflow-y-scroll border px-3 py-6 shadow-md transition-transform duration-500 lg:translate-x-0!",
        isSidebarOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold">Air Pollution</h2>
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
        >
          <Chevron className="size-6 rotate-180 cursor-pointer lg:hidden" />
        </button>
      </div>
      <Suspense fallback={<AirPollutionPanelSkeleton />}>
        <AirPollutionPanel />
      </Suspense>
    </aside>
  );
}
