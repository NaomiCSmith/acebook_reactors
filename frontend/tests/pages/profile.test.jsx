// file: profile.test.jsx

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import { Profile } from "../../src/pages/Profile/Profile.jsx";
import "@testing-library/jest-dom";

vi.stubGlobal("localStorage", {
    getItem: vi.fn(),
    setItem: vi.fn(),
    });

vi.stubGlobal("fetch", vi.fn());


beforeEach(() => {
    vi.resetAllMocks();
    localStorage.getItem.mockReturnValue("mockUserID");
});

const mockUser = {
    _id: "userID",
    email: "dev1@makers.tech",
    username: "dev1",
    password: "123dev",
    photo: "/liked.png",
};

describe("Profile page", () => {

    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.getItem.mockReturnValue("mockUserID");
    });


// page renders initally with loading message

    test("displays a loading message", async () => {
        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });


// page renders with username and email

    test("profile renders with username and email", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        });

        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByRole("heading", {name: /dev1/i })).toBeInTheDocument();
            expect(screen.getByText(/dev1@makers.tech/i)).toBeInTheDocument();
        });
    });


// user can edit and save changes to their profile username and email

    test("user can edit and save changes to their profile details", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        });

        render(
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        );

        const user = userEvent.setup();
        await screen.findByRole("heading", { name: /dev1/i });

        const editButton = screen.getByText(/Edit Profile/i);
        await user.click(editButton);

        const usernameInput = screen.getByLabelText(/Username:/i);
        const emailInput = screen.getByLabelText(/Email:/i);
        const saveButton = screen.getByRole("button", {name: /Save/i});

        expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();

        await user.clear(usernameInput);
        await user.type(usernameInput, "developerLopez");

        await user.clear(emailInput);
        await user.type(emailInput, "dev_lyfe@makers.tech");

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                ...mockUser,
                username: "developerLopez",
                email: "dev_lyfe@makers.tech",
            }),
        });

        await user.click(saveButton);

        await waitFor(() => {
            expect(screen.getByRole("heading", { name: /developerLopez/i })).toBeInTheDocument();
            expect(screen.getByText(/dev_lyfe@makers.tech/i)).toBeInTheDocument();
        });
    });
});