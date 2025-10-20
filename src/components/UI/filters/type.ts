type FiltersItem = {
  label: string;
  query: string;
};
export interface FiltersPropsType {
  FiltersItems: FiltersItem[];
  selectedQuery: string;
  onClick: (query: string) => void;
}

export const filters = [
  {
    label: "All",
    query: "all",
  },
  {
    label: "CPG",
    query: "cpg",
  },
  {
    label: "Crypto",
    query: "crypto",
  },
];
