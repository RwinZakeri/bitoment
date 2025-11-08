export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white dark:bg-gray-100 h-screen">{children}</section>
  );
}
