export const GroupItem = () => {};

export const GroupItemPlaceHolder = () => {
  return (
    <div
      className="w-full h-16 border border-gray-700 rounded mb-3
        bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse
      "
    ></div>
  );
};

export const GroupItemNotFound = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      There is not events groups registered
    </div>
  );
};
