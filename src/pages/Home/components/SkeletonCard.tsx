const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
