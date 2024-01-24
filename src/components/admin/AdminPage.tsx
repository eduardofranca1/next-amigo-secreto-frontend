"use client";
import * as AdminApi from "@/api/admin";
import { Event } from "@/types/event";
import { useEffect, useState } from "react";
import {
  EventItem,
  EventItemNotFound,
  EventItemPlaceHolder,
} from "./events/EventItem";
import { ItemButton } from "./ItemButton";
import { FaPlus } from "react-icons/fa";
import { ModalScreens } from "@/types/modal";
import { Modal } from "./Modal";
import { EventAdd } from "./events/EventAdd";

export const AdminPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalScreen, setModalScreen] = useState<ModalScreens>(null);

  const loadEvents = async () => {
    setModalScreen(null);
    setLoading(true);
    const eventList = await AdminApi.getEvents();
    setLoading(false);
    setEvents(eventList);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div>
      {/* sub header */}
      <div className="p-3 flex items-center">
        <h1 className="text-2xl flex-1">Events</h1>
        <ItemButton
          IconElement={FaPlus}
          onClick={() => setModalScreen("add")}
        />
      </div>
      <div className="my-3">
        {!loading &&
          events.length > 0 &&
          events.map((item) => (
            <EventItem
              key={item.id}
              item={item}
              refreshAction={loadEvents}
              openModal={() => {}}
            />
          ))}
        {!loading && events.length === 0 && <EventItemNotFound />}
        {loading && (
          <>
            <EventItemPlaceHolder />
            <EventItemPlaceHolder />
          </>
        )}
      </div>
      {modalScreen && (
        <Modal onClose={() => setModalScreen(null)}>
          {modalScreen === "add" && <EventAdd refreshAction={loadEvents} />}
        </Modal>
      )}
    </div>
  );
};
