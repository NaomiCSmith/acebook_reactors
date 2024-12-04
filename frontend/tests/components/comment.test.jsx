// file: comment.test.jsx

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { deleteComment, updateComment } from "../../src/services/comments.js";
import Comment from "../../src/components/Comment.jsx";
import "@testing-library/jest-dom";

// mock deleteComment and updateComment

vi.mock("../../src/services/comments", () => ({
    deleteComment: vi.fn(),
    updateComment: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

describe("Comment", () => {
    const mockComment = {
        _id: "comment1",
        message: "I am a comment... or am I",
        userId: "dev1",
    };

    const mockOnCommentDeleted = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.setItem("token", "mockToken");
    });

    afterEach(() => {
        localStorage.clear();
    });


// renders comment with username and message

    test("comment renders with username and post message", async () => {
        render(
            <BrowserRouter>
                <Comment
                    comment={mockComment}
                    userID="dev1"
                    token="mockToken"
                    onCommentDeleted={mockOnCommentDeleted}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(/dev1/i)).toBeInTheDocument();
        expect(screen.getByDisplayValue(/I am a comment... or am I/i)).toBeInTheDocument();
        expect(screen.getByText(/Delete/i)).toBeInTheDocument();
        expect(screen.getByText(/Edit/i)).toBeInTheDocument();
    })

// basic tests can be found in commentButton.test.jsx and I didn't
// want to repeat so going straight into the errors which I missed
// out there


// show an error if comment doesn't delete

    test("error is shown if comment does not delete", async () => {
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
        vi.spyOn(window, "confirm").mockReturnValueOnce(true);
        deleteComment.mockRejectedValueOnce(new Error("Failed to delete the comment."));
        
        render(
            <Comment
                comment={mockComment}
                userID="dev1"
                token="mockToken"
                onCommentDeleted={mockOnCommentDeleted}
            />
        );

        const user = userEvent.setup();
        const deleteButton = screen.getByText(/Delete/i);
        await user.click(deleteButton);


        expect(deleteComment).toHaveBeenCalledWith("mockToken", mockComment._id);
        expect(alertMock).toHaveBeenCalledWith("Failed to delete the comment.");
    });


// error is shown when comment edit doesn't work

    test("error is shown if comment edit does not go through", async () => {
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
        // vi.spyOn(window, "confirm").mockReturnValueOnce(true);
        updateComment.mockRejectedValueOnce(new Error("Failed to update the comment."));
        
        render(
            <Comment
                comment={mockComment}
                userID="dev1"
                token="mockToken"
                onCommentDeleted={mockOnCommentDeleted}
            />
        );

        const user = userEvent.setup();
        const editButton = screen.getByText(/Edit/i);
        await user.click(editButton);

        const textBox = screen.getByRole("textbox");
        await user.clear(textBox);
        await user.type(textBox, "Fresh new look for my comment");

        const saveButton = screen.getByText(/Save/i);
        await user.click(saveButton);

        expect(updateComment).toHaveBeenCalledWith("mockToken", mockComment._id, "Fresh new look for my comment");
        expect(alertMock).toHaveBeenCalledWith("Failed to update the comment.");
    })
});