import clsx from "clsx";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

export default function Card({
  children,
  title,
  className,
  childrenClassName,
}: CardProps) {
  return (
    <div
      className={clsx(
        "from-card to-card/50 flex flex-col gap-4 rounded-xl border bg-linear-to-br p-4 shadow-md",
        className,
      )}
    >
      {title && <h2 className="text-2xl font-semibold">{title}</h2>}

      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
