export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="bg-white">{children}</section>;
}
