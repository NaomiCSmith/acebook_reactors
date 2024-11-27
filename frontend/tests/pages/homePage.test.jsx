import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../../src/pages/Home/HomePage";

describe("Home Page", () => {
  test("Shows the site tagline", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const tagline = screen.getByText("Connect and share with the devs in your life, Acebook style.");
    expect(tagline).not.toBeNull()
  });

  test("Displays a signup link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const signupLink = screen.getByText("Create New Account");
    expect(signupLink.getAttribute("href")).toEqual("/signup");
  });

  test("Displays a login link", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const loginLink = screen.getByText("Log In");
    expect(loginLink.getAttribute("href")).toEqual("/login");
  });
});
