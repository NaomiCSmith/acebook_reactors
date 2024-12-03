// file: likeButton.test.jsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import { likePost, unLikePost } from "../../src/services/posts.js";
import '@testing-library/jest-dom';

import LikeButton from "../../src/components/LikeButton.jsx";


vi.mock("../../src/services/posts", () => ({
    likePost: vi.fn(),
    unLikePost: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

describe("LikeButton", () => {
    const mockPost = {
    _id: "post1",
    likes: 10,
    likedBy: ["user1", "user2"],
    };

    const mockUserID = "user3";


    // like button renders with image in unliked state initially

    test("renders like button with thumbs image", async () => {
        render(
            <BrowserRouter>
                <LikeButton post={mockPost} userID={mockUserID} />
            </BrowserRouter>
        );

        expect(screen.getByText(/10 likes/i)).toBeInTheDocument();
        expect(screen.getByAltText(/thumbs up button/i).src).toContain("unliked.png");
    });


    // like button increases by one and image turns into liked state

    test("increases like count by 1 when like button is clicked", async () => {
        const mockResponse = { message: "Post liked", likes: 11 };
        likePost.mockResolvedValue(mockResponse);

        // alternative:
        // likePost.mockImplementation(() =>
        //     Promise.resolve({
        //         message: "Post liked",
        //         likes: 11,
        //     })
        // );

        render(
            <BrowserRouter>
                <LikeButton post={mockPost} userID={mockUserID} />
            </BrowserRouter>
        );
        
        const user = userEvent.setup();
        const button = screen.getByAltText(/thumbs up button/i);
        await user.click(button);

        expect(screen.getByText(/11 likes/i)).toBeInTheDocument();
        expect(screen.getByAltText(/thumbs up button/i).src).toContain("liked.png");
    });



   // like button reduces by one and image turns into unliked state

    test("decreases like count by 1 when like button is clicked after already being liked", async () => {
        const mockPostWithUserLike = { ...mockPost, likedBy: [mockUserID] };
        
        const mockResponse = { message: "Post Un-liked", likes: 9 };
        unLikePost.mockResolvedValue(mockResponse);

        render(
            <BrowserRouter>
                <LikeButton post={mockPostWithUserLike} userID={mockUserID} />
            </BrowserRouter>
        );
    
        const user = userEvent.setup();
        const button = screen.getByAltText(/thumbs up button/i);
        await user.click(button);

        expect(screen.getByText(/9 likes/i)).toBeInTheDocument();
        expect(screen.getByAltText(/thumbs up button/i).src).toContain("unliked.png");
    });
});