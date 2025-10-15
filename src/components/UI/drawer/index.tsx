import { DrawerPropsType } from "./type";

const Drawer = ({ children, title }: DrawerPropsType) => {
  return (
    <>
      <div className="w-screen h-screen bg-black/60 absolute top-0 left-0"></div>
      <div className="w-full rounded-t-lg absolute bottom-0 left-0 bg-white">
        <div className="w-11 h-1 "></div>
        <p className="text-center">{title}</p>
        {children}
      </div>
    </>
  );
};

export default Drawer;
