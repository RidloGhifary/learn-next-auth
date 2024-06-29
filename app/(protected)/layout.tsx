import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="w-full min-h-full py-6 flex flex-col gap-y-10 items-center justify-center bg-black">
      <Navbar />
      {children}
    </div>
  );
}
