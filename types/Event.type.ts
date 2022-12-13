export enum EventPropNames {
  "title" = "Title",
  "description" = "Description",
  "date" = "Date",
  "link" = "Link",
  "location" = "Location",
}

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  link: string;
  location: string;
};
