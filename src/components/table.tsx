import React from "react";

type TableProps = {
  children: React.ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => {
  const tableClassName = `min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden my-2 border-collapse ${className || ''}`;
  return (
    <table className={tableClassName}>
      {children}
    </table>
  );
}