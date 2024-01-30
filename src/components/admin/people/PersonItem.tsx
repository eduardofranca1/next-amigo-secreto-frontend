import { PersonComplete } from "@/types/people";
import { ItemButton } from "../ItemButton";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as PeopleApi from "@/api/people";

type Props = {
  item: PersonComplete;
  refreshAction: () => void;
  onEdit: (person: PersonComplete) => void;
};

export const PersonItem = ({ item, refreshAction, onEdit }: Props) => {
  const handleDeleteButton = async () => {
    try {
      if (confirm("Are you that you want to delete this person?")) {
        await PeopleApi.deletePerson(item.id_event, item.id_group, item.id);
        refreshAction();
      }
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <div className="border border-gray-700 bg-gray-900 rounded p-3 mb-3 flex items-center">
      <div className="flex-1">
        {item.name} (CPF:{item.cpf})
      </div>
      <ItemButton IconElement={FaRegEdit} onClick={() => onEdit(item)} />
      <ItemButton IconElement={FaRegTrashAlt} onClick={handleDeleteButton} />
    </div>
  );
};

export const PersonItemPlaceHolder = () => {
  return (
    <div
      className="w-full h-16 border border-gray-700 rounded mb-3
          bg-gradient-to-r from-gray-900 to-gray-950 animate-pulse
        "
    ></div>
  );
};

export const PersonItemNotFound = () => {
  return (
    <div className="text-center py-4 text-gray-500">
      There is not people in this group
    </div>
  );
};
