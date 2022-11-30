export enum EventPropNames {
  "title" = "Title",
  "description" = "Description",
  "date" = "Date",
  "time" = "Time",
  "location" = "Location",
}

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
};
