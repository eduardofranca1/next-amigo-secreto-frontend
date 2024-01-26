import { useEffect, useState } from "react";
import * as AdminGroupsApi from "@/api/groups";
import { Group } from "@/types/group";
import { GroupItemNotFound, GroupItemPlaceHolder } from "./GroupItem";

type Props = {
  eventId: number;
};

export const EventTabGroups = ({ eventId }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadGroups = async () => {
    setLoading(true);
    const groupList = await AdminGroupsApi.getAll(eventId);
    setLoading(false);
    setGroups(groupList);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <div>add/edit</div>

      {!loading &&
        groups?.length > 0 &&
        groups.map((item) => <div key={item.id}>{item.name} </div>)}
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
