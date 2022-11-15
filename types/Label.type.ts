export type LabelType = "button" | "form_field" | "title" | "tab";

export enum LabelTypes {
  "button" = "Button",
  "form_field" = "Form field",
  "title" = "Title",
  "tab" = "Tab",
}

export type Label = {
  label_id: string;
  label_name: string;
  label_title: string;
  label_title_en_US: string;
  label_type: LabelTypes;
};
