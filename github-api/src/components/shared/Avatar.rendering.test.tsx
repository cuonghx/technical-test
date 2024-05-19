import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";
import '@testing-library/jest-dom'

describe("Avatar component", () => {
  it("renders avatar image with correct URL and alt text", () => {
    const avatarUrl = "https://url.com/avatar.png";
    const altText = "User Avatar";

    render(<Avatar avatar_url={avatarUrl} alt={altText} />);
    const avatarElement = screen.getByAltText(altText);
    expect(avatarElement).not.toBeNull();
    expect(avatarElement).toHaveAttribute("src", avatarUrl);
    expect(avatarElement).toHaveAttribute("alt", altText);
  });

  it("renders fallback avatar image when URL is not provided", () => {
    const altText = "User Avatar";
    render(<Avatar alt={altText} />);
    const avatarElement = screen.getByAltText(altText);
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute("src", "static/images/fallback-avatar.png");
    expect(avatarElement).toHaveAttribute("alt", altText);
  });

  it("renders fallback avatar image when URL is empty string", () => {
    const avatarUrl = "";
    const altText = "User Avatar";

    render(<Avatar avatar_url={avatarUrl} alt={altText} />);
    const avatarElement = screen.getByAltText(altText);
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute("src", "static/images/fallback-avatar.png");
    expect(avatarElement).toHaveAttribute("alt", altText);
  });
});
