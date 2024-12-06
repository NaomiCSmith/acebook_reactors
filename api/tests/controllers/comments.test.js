// file: api/tests/controllers/comments.test.js

const mongoose = require("mongoose");

const { create, getAllComments, deleteAComment, updateAComment } = require("../../controllers/comments.js");
const { generateToken } = require("../../lib/token.js");

const Comment = require("../../models/comment.js");

jest.mock("../../models/comment.js");
jest.mock("../../lib/token.js");


describe("comments controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("create", () => {

        it("create a comment and returns 201 status code", async () => {
            const req = {
                body: {
                    postId: "post1",
                    userId: "dev1",
                    message: "First comment",
                },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            Comment.prototype.save = jest.fn().mockResolvedValueOnce(req.body);

            await create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({message: "OK"});
        });
    });
    

    describe("getAllComments", () => {
        it("get all comments on a post", async () => {
            const req = {
                params: { postId: "post1" },
                query: { user_id: "user1" },
            };
            const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            };

            const mockComments = [
                { postId: "post1", userId: "user1", message: "Test comment 1" },
                { postId: "post1", userId: "user1", message: "Test comment 2" },
                ];

            Comment.find.mockResolvedValueOnce(mockComments);
            generateToken.mockReturnValueOnce("mockToken");

            await getAllComments(req, res);

            expect(Comment.find).toHaveBeenCalledWith({ postId: "post1" });
            expect(generateToken).toHaveBeenCalledWith("user1");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ comments: mockComments, token: "mockToken" });
        });
    });


    describe("deleteAComment", () => {
        it("user can delete their comment ", async () => {
            const req = {
            params: { commentId: "12345" },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                };

            Comment.findById.mockResolvedValueOnce({ _id: "12345" });
            Comment.findByIdAndDelete.mockResolvedValueOnce();

            await deleteAComment(req, res);

            expect(Comment.findById).toHaveBeenCalledWith("12345");
            expect(Comment.findByIdAndDelete).toHaveBeenCalledWith("12345");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Comment deleted successfully." });
        });
    });


    describe("updateAComment", () => {
        it("user can update their comment and save", async () => {
            const req = {
            params: { commentId: "comment1" },
            body: { message: "Updated comment" },
            };
            const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            };

            const mockComment = { _id: "id1", message: "Original comment", save: jest.fn() };

            Comment.findById.mockResolvedValueOnce(mockComment);

            await updateAComment(req, res);

            expect(Comment.findById).toHaveBeenCalledWith("comment1");
            expect(mockComment.message).toBe("Updated comment");
            expect(mockComment.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: "Comment updated successfully",
                comment: mockComment,
            });
        });
    });
});