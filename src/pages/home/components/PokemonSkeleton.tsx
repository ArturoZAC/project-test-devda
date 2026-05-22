export const PokemonSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-3 animate-pulse">
      <div className="bg-gray-200 rounded-xl w-full h-36" />
      <div className="h-3 w-12 bg-gray-200 rounded" />
      <div className="h-5 w-24 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
        <div className="h-6 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};
