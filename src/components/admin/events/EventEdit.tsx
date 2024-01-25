"use client";

import { Event } from "@/types/event";
import { useState } from "react";
import { EventTabInfo } from "./EventTabInfo";

type Props = {
  event: Event | undefined;
  refreshAction: () => void;
};

type Tabs = "info" | "groups" | "people";

export const EventEdit = ({ event, refreshAction }: Props) => {
  if (!event) return;

  const [tab, setTab] = useState<Tabs>("info");

  return (
    <div>
      {/* área das tabs */}
      <div className="flex text-center border-b border-gray-500 cursor:pointer">
        <div
          onClick={(e) => setTab("info")}
          className={`flex-1 p-3 hover:bg-gray-700 ${
            tab === "info" ? "bg-gray-600" : ""
          }`}
        >
          Infos
        </div>
        <div
          onClick={(e) => setTab("groups")}
          className={`flex-1 p-3 hover:bg-gray-700 ${
            tab === "groups" ? "bg-gray-600" : ""
          }`}
        >
          Groups
        </div>
        <div
          onClick={(e) => setTab("people")}
          className={`flex-1 p-3 hover:bg-gray-700 ${
            tab === "people" ? "bg-gray-600" : ""
          }`}
        >
          People
        </div>
      </div>
      {/* conteúdo das tabs */}
      <div>
        {tab === "info" && (
          <EventTabInfo event={event} refreshAction={refreshAction} />
        )}
        {tab === "groups" && "groupsss"}
        {tab === "people" && "peopleee"}
      </div>
    </div>
  );
};
