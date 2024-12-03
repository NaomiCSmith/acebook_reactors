// file: commentButton.test.jsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import { getComments, createComment } from "../../src/services/comments.js";
import '@testing-library/jest-dom';

import CommentButton from "../../src/components/CommentButton.jsx";


vi.mock("../../src/services/comments.js", () => ({
    getComments: vi.fn(),
    createComment: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

describe("CommentButton", () => {
    const mockPost = {
        _id: "post1",
        commentCount: 2,
    };
    const mockUserID = "user1";
    const mockToken = "token1";
    const mockComments = [
        { _id: "comment1", message: "Test Comment 1", userId: "user2" },
        { _id: "comment2", message: "Test Comment 2", userId: "user3" },
    ];


// comment button renders with initial count

    test("renders comment button with initial count", async () => {
        render(
            <BrowserRouter>
                <CommentButton post={mockPost} userID={mockUserID} token={mockToken} />
            </BrowserRouter>
        );

        expect(screen.getByAltText(/comment speech bubble/i)).toBeInTheDocument();
        expect(screen.getByText(mockPost.commentCount)).toBeInTheDocument();
        });


// can view comments and see each comment left

    test("user can see each comment on a post", async () => {
        const mockResponse = { comments: mockComments };
        getComments.mockResolvedValueOnce(mockResponse);

        render(
            <BrowserRouter>
                <CommentButton post={mockPost} userID={mockUserID} token={mockToken} />
            </BrowserRouter>
        );

        const user = userEvent.setup();
        const button = screen.getByAltText(/comment speech bubble/i);
        await user.click(button);

        expect(await screen.findByText(/Test Comment 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Test Comment 2/i)).toBeInTheDocument();
    });


// no comments shown when there are none registered in database

    test("cannot see comments when there are none posted", async () => {
        const mockResponse = { comments: [] };
        getComments.mockResolvedValueOnce(mockResponse);

        render(
            <BrowserRouter>
                <CommentButton post={mockPost} userID={mockUserID} token={mockToken} />
            </BrowserRouter>
        );

        const user = userEvent.setup();
        const button = screen.getByAltText(/comment speech bubble/i);
        await user.click(button);

        expect(await screen.findByText(/No comments yet. Be the first to comment!/i)).toBeInTheDocument();
    });


// add a new comment and see it in the comments after

    test("user can add a comment and read it in the comment section", async () => {
        const mockResponse = { message: "OK" };
        createComment.mockResolvedValueOnce(mockResponse);

        render(
            <BrowserRouter>
                <CommentButton post={mockPost} userID={mockUserID} token={mockToken} />
            </BrowserRouter>
        );

        const user = userEvent.setup();
        const button = screen.getByAltText(/comment speech bubble/i);
        await user.click(button);

        const addCommentButton = await screen.findByRole("button", { name: /add a comment/i });
        await user.click(addCommentButton);

        const commentBody = await screen.getByRole("textbox");
        const postCommentButton = await screen.getByRole("button", { name : /post comment/i });
        
        await userEvent.type(commentBody, "A test comment!");
        await user.click(postCommentButton);

        expect(await screen.findByText(/A test comment!/i)).toBeInTheDocument();
        expect(screen.getByText(/3/)).toBeInTheDocument();
    });


// error message appears when comment is unsuccessful

    test("error message for failed comments", async () => {
        createComment.mockRejectedValueOnce(new Error("Failed to create comment"));

        render(
            <BrowserRouter>
                <CommentButton post={mockPost} userID={mockUserID} token={mockToken} />
            </BrowserRouter>
        );

        const user = userEvent.setup();
        const button = screen.getByAltText(/comment speech bubble/i);
        await user.click(button);

        const addCommentButton = await screen.findByRole("button", { name: /add a comment/i });
        await user.click(addCommentButton);

        const commentBody = await screen.getByRole("textbox");
        const postCommentButton = await screen.getByRole("button", { name : /post comment/i });

        await userEvent.type(commentBody, "Failing comment");
        await user.click(postCommentButton);

        expect(await screen.findByText(/Something went wrong. Please try again./i)).toBeInTheDocument();
    })
});