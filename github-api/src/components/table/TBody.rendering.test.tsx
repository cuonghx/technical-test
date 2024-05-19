import { render, screen } from "@testing-library/react";
import { IUser } from "@/models/users/IUser";
import { Body } from "./TBody";

describe("TableBody component", () => {
  it("renders table body with one row correctly", () => {
    const testid = "unit-test-table";
    const items: IUser[] = [
      {
        id: 1,
        avatar_url: "/",
        score: 1.0,
        login: "cuonghx",
        type: "User",
      },
    ];
    render(<Body items={items} testid={testid} />);
    const tableElement = screen.getByTestId(testid);
    expect(tableElement).not.toBeNull();
    const children = tableElement.children;
    expect(children).toHaveLength(1);
    expect(children.item(0)?.textContent).toContain(items[0].login);
  });

  it("renders table body with multiple rows correctly", () => {
    const testId = "unit-test-tbody";
    const items: IUser[] = [
      {
        id: 1,
        avatar_url: "/",
        score: 1.0,
        login: "cuonghx",
        type: "User",
      },
      {
        id: 2,
        avatar_url: "/",
        score: 2.0,
        login: "john_doe",
        type: "User",
      },
    ];

    render(<Body items={items} testid={testId} />);
    const tableElement = screen.getByTestId(testId);
    const rows = tableElement.querySelectorAll("tr");
    expect(tableElement).not.toBeNull();
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain(items[0].login);
    expect(rows[1].textContent).toContain(items[1].login);
  });

  it("renders table body with empty data correctly", () => {
    const testId = "unit-test-tbody";
    const items: IUser[] = [];

    render(<Body items={items} testid={testId} />);
    const tbodyElement = screen.getByTestId(testId);
    const rows = tbodyElement.querySelectorAll("tr");
    expect(tbodyElement).not.toBeNull();
    expect(rows).toHaveLength(0);
  });
});
