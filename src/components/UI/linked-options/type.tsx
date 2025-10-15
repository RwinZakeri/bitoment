export interface optionsType {
  title: string;
  value: string | number;
}
export interface LinkedOptionsPropsType {
  label: string;
  options: optionsType[];
  onLinkedOption: (value: string | number) => void;
}

export const settingLinkedOptions: optionsType[] = [
  {
    title: "Language",
    value: 1,
  },
  {
    title: "Theme",
    value: 2,
  },
  {
    title: "Base Currency",
    value: 3,
  },
];
