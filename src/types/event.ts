export type Event = {
  id: number;
  status: boolean;
  title: string;
  description: string;
  grouped: boolean;
};

export type AddEvent = {
  title: string;
  description: string;
  grouped: boolean;
};

export type UpdateEvent = {
  title?: string;
  description?: string;
  grouped?: boolean;
  status?: boolean;
};
