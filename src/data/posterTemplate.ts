export type PosterTemplateFieldId =
  | "headline"
  | "message"
  | "description"
  | "demandOne"
  | "demandTwo"
  | "demandThree"
  | "demandFour";

export type PosterTemplateValues = Record<PosterTemplateFieldId, string>;

export const posterTemplateDefaults: PosterTemplateValues = {
  headline: "Your\nHeadline\nHere",
  message: "Your Big\nMessage",
  description:
    "Add your subheadline or description here.\nKeep it short, clear and impactful.\nThis space is for 2 to 4 lines of your key message or promise.",
  demandOne: "Add your\ndemand here",
  demandTwo: "Add your\ndemand here",
  demandThree: "Add your\ndemand here",
  demandFour: "Add your\ndemand here"
};

export const posterTemplateFieldGroups: Array<{
  title: string;
  fields: Array<{
    id: PosterTemplateFieldId;
    label: string;
    maxLength: number;
    rows: number;
  }>;
}> = [
  {
    title: "Editable message",
    fields: [
      { id: "headline", label: "Your headline here", maxLength: 64, rows: 3 },
      { id: "message", label: "Your big message", maxLength: 56, rows: 2 },
      { id: "description", label: "Subheadline / description", maxLength: 180, rows: 4 }
    ]
  },
  {
    title: "Our demand section",
    fields: [
      { id: "demandOne", label: "Demand 1", maxLength: 56, rows: 2 },
      { id: "demandTwo", label: "Demand 2", maxLength: 56, rows: 2 },
      { id: "demandThree", label: "Demand 3", maxLength: 56, rows: 2 },
      { id: "demandFour", label: "Demand 4", maxLength: 56, rows: 2 }
    ]
  }
];
