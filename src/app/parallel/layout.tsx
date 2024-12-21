import Link from "next/link";

const Layout = ({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) => {
  return (
    <div>
      <div>
        <Link href="/parallel">Parallel</Link>
        &nbsp;
        <Link href="/parallel/setting">Setting</Link>
      </div>
      <br />
      {sidebar}
      {feed}
      {children}
    </div>
  );
};

export default Layout;
