"use client";

import { logOut } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const onClick = () => logOut();

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}
