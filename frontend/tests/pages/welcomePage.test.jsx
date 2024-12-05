// file: welcomePage.test.jsx

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { WelcomePage } from "../../src/pages/Welcome/WelcomePage";

describe("Welcome Page", () => {
    test("Greets the user in title", () => {
        render(
            <BrowserRouter>
                <WelcomePage />
            </BrowserRouter>
        );
        const tagline = screen.getByText("Welcome");
        expect(tagline).not.toBeNull()
    });


// ensure links match up to each page - profile, all posts, and create post

    test("Displays three links to profile, posts, and create post", async () => {
        render(
        <BrowserRouter>
            <WelcomePage />
        </BrowserRouter>
    );

    const profileLink = screen.getByText("View Your Profile");
    const postsLink = screen.getByText("View All Posts")
    const createPostLink = screen.getByText("Create a Post");

    expect(profileLink.closest('a').getAttribute("href")).toEqual("/profile");
    expect(postsLink.closest('a').getAttribute("href")).toEqual("/posts");
    expect(createPostLink.closest('a').getAttribute("href")).toEqual("/createpost");
    });
});
