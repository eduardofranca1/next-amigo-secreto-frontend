import { Group } from "@/types/group";
import { ItemButton } from "../ItemButton";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as GroupApi from "@/api/groups";

type Props = {
  item: Group;
  refreshAction: () => void;
  onEdit: (group: Group) => void;
};

export const GroupItem = ({ item, refreshAction, onEdit }: Props) => {
  const handleDeleteButton = async () => {
    try {
      if (confirm("Are you sure the you want to delete this group?")) {
        await GroupApi.deleteGroup(item.idEvent, item.id);
        refreshAction();
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
      <div className="flex-1">{item.name}</div>
      <ItemButton IconElement={FaRegEdit} onClick={() => onEdit(item)} />
      <ItemButton IconElement={FaRegTrashAlt} onClick={handleDeleteButton} />
    </div>
  );
};

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
