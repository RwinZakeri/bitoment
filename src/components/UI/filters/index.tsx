import { FiltersPropsType } from "./type";

const Filters = ({
  FiltersItems,
  selectedQuery,
  onClick,
}: FiltersPropsType) => {
  const clickEvent = (e: string) => {
    onClick(e);
  };
  return (
    <div className="flex gap-2">
      {FiltersItems.map((item) => {
        return (
          <div
            onClick={() => clickEvent(item.query)}
            className={`px-5 py-1.5 rounded-sm w-fit cursor-pointer ${
              selectedQuery === item.query
                ? "bg-teal-light"
                : "bg-white"
            }`}
            key={item.label}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
