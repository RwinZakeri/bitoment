export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="pb-[70px]">
      {children}
      <div className="fixed flex gap-2 left-1/2 -translate-x-1/2 max-w-[520px] bottom-0 w-full h-[70px] bg-red-200">
        <div className="w-full h-full bg-red-500"></div>
        <div className="w-full h-full bg-red-500"></div>
        <div className="w-full h-full bg-red-500"></div>
        <div className="w-full h-full bg-red-500"></div>
      </div>
    </section>
  );
  
}