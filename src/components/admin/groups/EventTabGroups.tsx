import { useEffect, useState } from "react";
import * as AdminGroupsApi from "@/api/groups";
import { Group } from "@/types/group";
import {
  GroupItem,
  GroupItemNotFound,
  GroupItemPlaceHolder,
} from "./GroupItem";
import { GroupAdd } from "./GroupAdd";
import { GroupEdit } from "./GroupEdit";

type Props = {
  eventId: number;
};

export const EventTabGroups = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadGroups = async () => {
    setSelectGroup(null);
    setLoading(true);
    const groupList = await AdminGroupsApi.getAll(eventId);
    setLoading(false);
    setGroups(groupList);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const handleEditButton = async (group: Group) => {
    try {
      setSelectGroup(group);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  return (
    <div>
      <div className="border border-dashed p-3 my-3">
        {!selectedGroup && (
          <GroupAdd eventId={eventId} refreshAction={loadGroups} />
        )}
        {selectedGroup && (
          <GroupEdit group={selectedGroup} refreshAction={loadGroups} />
        )}
      </div>

      {!loading &&
        groups?.length > 0 &&
        groups.map((item) => (
          <GroupItem
            key={item.id}
            item={item}
            refreshAction={loadGroups}
            onEdit={handleEditButton}
          />
        ))}
      {loading && (
        <>
          <GroupItemPlaceHolder />
          <GroupItemPlaceHolder />
        </>
      )}
      {!loading && groups?.length === 0 && <GroupItemNotFound />}
    </div>
  );
};
