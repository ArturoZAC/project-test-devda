import { IconSearch } from "@tabler/icons-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <div className="relative w-full max-w-md">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <IconSearch stroke={2} />
      </span>
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
      />
    </div>
  );
};
