type IconProps = { className?: string };

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: false,
};

export const ArrowRight = ({ className = "size-5" }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const Download = ({ className = "size-5" }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </svg>
);

export const Pause = ({ className = "size-5" }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M8 5v14M16 5v14" />
  </svg>
);

export const Play = ({ className = "size-5" }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
  </svg>
);

export const Check = ({ className = "size-5" }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const Alert = ({ className = "size-5" }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M12 3L2 21h20L12 3zM12 10v5M12 18v.5" />
  </svg>
);

export const TriangleUp = ({ className = "size-3" }: IconProps) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden="true" focusable="false">
    <path d="M6 2l5 8H1z" fill="currentColor" />
  </svg>
);

export const TriangleDown = ({ className = "size-3" }: IconProps) => (
  <svg viewBox="0 0 12 12" className={className} aria-hidden="true" focusable="false">
    <path d="M6 10L1 2h10z" fill="currentColor" />
  </svg>
);
