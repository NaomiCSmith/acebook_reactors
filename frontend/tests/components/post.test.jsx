import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

import { deletePost, updatePost } from "../../src/services/posts.js";
import Post from "../../src/components/Post.jsx";
import "@testing-library/jest-dom";
import LikeButton from "../../src/components/LikeButton";
import CommentButton from "../../src/components/CommentButton";


// mock deletePost and updatePost

vi.mock("../../src/services/posts", () => ({
  deletePost: vi.fn(),
  updatePost: vi.fn(),
}));

beforeEach(() => {
  vi.resetAllMocks();
});


describe("Post", () => {
  const mockPost = {
    _id: "post1",
    message: "Testing testing 1 2 3",
    userId: "dev1",
    postAuthor: { username: "developerLopez"},
    likes: 4,
    likedBy: ["dev2", "dev 3"],
  };

  const mockOnPostDeleted = vi.fn();

  beforeEach(() => {
    localStorage.setItem("userID", "dev1");
    localStorage.setItem("token", "mockToken");
  });

  afterEach(() => {
    localStorage.clear();
  });


// post is rendered on page

  test("displays the post on the webpage", () => {
    render(
      <BrowserRouter>
        <Post post={mockPost} onPostDeleted={mockOnPostDeleted}/>
      </BrowserRouter>
    );

    expect(screen.getByText(/developerLopez/i)).toBeInTheDocument();
    expect(screen.getByText(/Testing testing 1 2 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Edit/i)).toBeInTheDocument();
  });

  
// posts can be deleted by original poster

  test("posts can be deleted by orignal poster", async () => {
    deletePost.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <Post post={mockPost} onPostDeleted={mockOnPostDeleted}/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const deleteButton = screen.getByText(/Delete/i);
    window.confirm = vi.fn(() => true);
    await user.click(deleteButton);


    await waitFor(() => {
      expect(deletePost).toHaveBeenCalledWith(mockPost._id);
      expect(mockOnPostDeleted).toHaveBeenCalledWith(mockPost._id);
    })

    expect(window.confirm).toHaveBeenCalledTimes(1);
  });


// post is not deleted if user cancels

  test("post is not deleted if user decides to cancel deletion", async () => {
    deletePost.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <Post post={mockPost} onPostDeleted={mockOnPostDeleted}/>
      </BrowserRouter>
    );

    const user = userEvent.setup();
    const deleteButton = screen.getByText(/Delete/i);
    window.confirm = vi.fn(() => false);
    await user.click(deleteButton);

    expect(deletePost).not.toHaveBeenCalled();
    expect(mockOnPostDeleted).not.toHaveBeenCalled();

    expect(window.confirm).toHaveBeenCalledTimes(1);
  });


// original poster can edit a post

  test("original poster can edit their post", async () => {
    updatePost.mockResolvedValueOnce();

    render(
      <BrowserRouter>
        <Post post={mockPost} onPostDeleted={mockOnPostDeleted}/>
      </BrowserRouter>
    );

    const editButton = screen.getByText(/Edit/i);

    const user = userEvent.setup();
    await user.click(editButton);

    const textBox = screen.getByRole("textbox");
    await user.clear(textBox);
    await user.type(textBox, "This is my new updated post");

    const saveButton = screen.getByText(/Save/i);
    await user.click(saveButton);

    expect(textBox.value).toBe("This is my new updated post");

    await waitFor(() => {
      expect(updatePost).toHaveBeenCalledWith("mockToken", mockPost._id, "This is my new updated post");
    });

    expect(updatePost).toHaveBeenCalledTimes(1);
  })


// users who are not the original poster cannot see the edit or delete buttons

  test("users cannot edit or delete posts that are not orignally theirs", async () => {
    localStorage.setItem("userID", "dev3")

    render(
      <BrowserRouter>
        <Post post={mockPost} onPostDeleted={mockOnPostDeleted}/>
      </BrowserRouter>
    );

    expect(screen.queryByText(/Delete/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Edit/i)).not.toBeInTheDocument();
  })

});