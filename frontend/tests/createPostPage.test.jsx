import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { CreatePost } from "../src/pages/Create/CreatePost";

describe("Create Post Page", () => {
    test("Has the text Submit post", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
        <BrowserRouter>
        <CreatePost />
        </BrowserRouter>
    );

    const heading = screen.getByRole("heading");
    expect(heading.textContent).toEqual("Submit a post:");
    });

    test("Has a submit button", async () => {
    render(
        <BrowserRouter>
        <CreatePost />
        </BrowserRouter>
    );

    const button = screen.getByText("Submit Post");
    expect(button).toBeTruthy();
    });
});