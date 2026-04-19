const CONFIG = {
  Applied:   { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500"   },
  Interview: { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-500"  },
  Offer:     { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500"  },
  Rejected:  { bg: "bg-red-50",    text: "text-red-600",    dot: "bg-red-500"    },
};

export default function StatusBadge({ status }) {
  const c = CONFIG[status] || CONFIG["Applied"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs
        font-medium flex-shrink-0 ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}