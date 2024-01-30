import * as GroupApi from "@/api/groups";
import * as PeopleApi from "@/api/people";
import { Group } from "@/types/group";
import { useEffect, useState } from "react";
import { GroupItemNotFound, GroupItemPlaceHolder } from "../groups/GroupItem";
import { PersonComplete } from "@/types/people";
import {
  PersonItem,
  PersonItemNotFound,
  PersonItemPlaceHolder,
} from "./PersonItem";
import { Person } from "@/types/person";
import { PersonAdd } from "./PersonAdd";
import { PersonEdit } from "./PersonEdit";

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

  //poeple
  const [people, setPeople] = useState<PersonComplete[]>([]);
  const [peopleLoading, setPoepleLoading] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null>(
    null
  );

  const loadPeople = async () => {
    try {
      if (selectedGroupId <= 0) return;
      setSelectedPerson(null);
      setPeople([]);
      setPoepleLoading(true);
      const result = await PeopleApi.getAll(eventId, selectedGroupId);
      setPoepleLoading(false);
      setPeople(result);
    } catch (error: any) {
      setPoepleLoading(true);
      alert(error.response.data);
    }
  };

  const handleEditButton = (person: PersonComplete) => {
    setSelectedPerson(person);
  };

  // quando o event group for alterado, a função de buscar as pessoas é executada para listar as pessoas daquele grupo
  useEffect(() => {
    loadPeople();
  }, [selectedGroupId]);

  return (
    <div>
      <div className="my-3">
        {!groupLoading && groupList?.length > 0 && (
          <select
            onChange={(e) => setSelectedGroupId(parseInt(e.target.value))}
            className="w-full bg-gray-800 text-white text-xl p-3 outline-none"
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
      {selectedGroupId > 0 && (
        <>
          <div className="border border-dashed p-3 my-3">
            {!selectedPerson && (
              <PersonAdd
                eventId={eventId}
                groupId={selectedGroupId}
                refreshAction={loadPeople}
              />
            )}
            {selectedPerson && (
              <PersonEdit person={selectedPerson} refreshAction={loadPeople} />
            )}
          </div>
          {!peopleLoading &&
            people?.length > 0 &&
            people.map((item) => (
              <PersonItem
                key={item.id}
                item={item}
                refreshAction={loadPeople}
                onEdit={handleEditButton}
              />
            ))}
          {peopleLoading && (
            <>
              <PersonItemPlaceHolder />
              <PersonItemPlaceHolder />
            </>
          )}
          {!peopleLoading && people?.length === 0 && <PersonItemNotFound />}
        </>
      )}
    </div>
  );
};
