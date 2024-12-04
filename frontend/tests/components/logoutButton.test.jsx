// file: logoutButton.test.jsx

import { render, screen, userEvent } from "@testing-library/react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LogoutButton from "../../src/components/LogoutButton.jsx";
import "@testing-library/jest-dom";

// mock useNavigate

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(), // Mock useNavigate here
    };
});

// vi.mock("react-router-dom", async () => ({
//     ...vi.importActual("react-router-dom"),
//     useNavigate: vi.fn(),
// }));

describe("LogoutButton", () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        localStorage.clear();
        mockNavigate.mockClear();
    });


// logout button is rendered on webpage

    test("renders the logout button", async () => {
        render(
            <BrowserRouter>
                <LogoutButton />
            </BrowserRouter>
        );

        expect(screen.getByText(/Log out/i)).toBeInTheDocument();
    });

    
// user is logged out using button - feel free to debug this!

    // test("user is logged out after clicking button", async () => {
    //     const removeItemSpy = vi.spyOn(localStorage, "removeItem");
    //     mockNavigate.mockImplementation(() => {});

    //     render(
    //         <BrowserRouter>
    //             <LogoutButton />
    //         </BrowserRouter>
    //     );


    //     const logoutButton = screen.findByRole("button");
    //     await userEvent.click(logoutButton);

    //     expect(removeItemSpy).toHaveBeenCalledWith("token");
    //     expect(removeItemSpy).toHaveBeenCalledWith("email");
    //     expect(removeItemSpy).toHaveBeenCalledWith("userID");
    //     expect(removeItemSpy).toHaveBeenCalledWith("userId");

    //     expect(mockNavigate).toHaveBeenCalledWith("/");
    // });
});
