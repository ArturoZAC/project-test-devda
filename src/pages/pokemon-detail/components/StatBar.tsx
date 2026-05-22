interface Props {
  name: string;
  value: number;
}

const STAT_COLORS: Record<string, string> = {
  hp: "bg-green-500",
  attack: "bg-red-500",
  defense: "bg-blue-500",
  "special-attack": "bg-purple-500",
  "special-defense": "bg-indigo-500",
  speed: "bg-yellow-400",
};

export const StatBar = ({ name, value }: Props) => {
  const percent = Math.min((value / 255) * 100, 100);
  const color = STAT_COLORS[name] ?? "bg-gray-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-gray-500 capitalize w-28 shrink-0">
        {name.replace("-", " ")}
      </span>
      <span className="text-xs font-mono text-gray-700 w-8 shrink-0">{value}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
