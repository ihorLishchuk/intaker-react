import { render, screen, fireEvent } from "@testing-library/react";
import Favourites from "../components/favourites/Favourites.tsx";
import { toggleFavorites } from "../stores";

jest.mock("../stores", () => ({
    toggleFavorites: jest.fn(),
}));

describe("Favourites", () => {
    it("renders the icon button", () => {
        render(<Favourites />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("opens and closes the menu when clicking the icon", () => {
        render(<Favourites />);
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(screen.getByRole("menu")).toBeInTheDocument();
        fireEvent.click(document.body);
    });

    it("calls toggleFavorites with true when selecting Favourite cities", () => {
        render(<Favourites />);
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText(/favourite cities/i));
        expect(toggleFavorites).toHaveBeenCalledWith(true);
    });

    it("calls toggleFavorites with false when selecting All cities", () => {
        render(<Favourites />);
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText(/all cities/i));
        expect(toggleFavorites).toHaveBeenCalledWith(false);
    });
});
