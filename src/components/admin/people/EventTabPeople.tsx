import * as GroupApi from "@/api/groups";
import { Group } from "@/types/group";
import { useEffect, useState } from "react";
import { GroupItemNotFound, GroupItemPlaceHolder } from "../groups/GroupItem";

type Props = {
  eventId: number;
};

export const EventTabPeople = ({ eventId }: Props) => {
  const [groupList, setGroupsList] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const [groupLoading, setGroupLoading] = useState<boolean>(true);

  const loadGroups = async () => {
    try {
      setSelectedGroupId(0);
      setGroupLoading(true);
      const result = await GroupApi.getAll(eventId);
      setGroupLoading(false);
      setGroupsList(result);
    } catch (error: any) {
      setGroupLoading(true);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <div className="my-3">
        {!groupLoading && groupList?.length > 0 && (
          <select
            onChange={(e) => setSelectedGroupId(parseInt(e.target.value))}
            className="w-full bg-transparent text-white text-xl p-3 outline-none"
          >
            <option value={0}>Select a group</option>
            {groupList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        )}
        {groupLoading && <GroupItemPlaceHolder />}
        {!groupLoading && groupList?.length === 0 && <GroupItemNotFound />}
      </div>
    </div>
  );
};
