/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAppStore } from "@/store";
import { Header } from "./THeader";
import { Body } from "./TBody";

const HEADER = ["Username", "Type", "Score"];

export const TableComponent: React.FC<{
  testid?: string;
}> = ({ testid = "not-set" }) => {
  const { usersStore } = useAppStore();
  const { users } = usersStore.getters;
  if (users.length === 0) return <></>;
  return (
    <table
      data-testid={testid}
      className="table table-xs table-pin-rows table-pin-cols"
    >
      <Header headers={HEADER} />
      <Body items={users} />
    </table>
  );
};
