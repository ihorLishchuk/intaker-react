import {createRef, RefObject} from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Favourites from "../components/favourites/Favourites.tsx";

describe("Favourites Component", () => {
    test("renders menu button", () => {
        const stateRef = createRef<boolean>() as RefObject<boolean>;
        const setShowFavorites = jest.fn();

        render(<Favourites stateRef={stateRef} setShowFavorites={setShowFavorites} />);

        const button = screen.getByRole("button", { name: /menu/i });
        expect(button).toBeInTheDocument();
    });

    test("opens and closes the menu on button click", () => {
        const stateRef = createRef<boolean>() as RefObject<boolean>;
        const setShowFavorites = jest.fn();

        render(<Favourites stateRef={stateRef} setShowFavorites={setShowFavorites} />);

        const button = screen.getByRole("button", { name: /menu/i });
        fireEvent.click(button);

        expect(screen.getByText("Favourite cities")).toBeInTheDocument();
        expect(screen.getByText("All cities")).toBeInTheDocument();
    });

    test("selecting menu item updates state and calls setShowFavorites", () => {
        const stateRef = createRef<boolean>() as RefObject<boolean>;
        const setShowFavorites = jest.fn();

        render(<Favourites stateRef={stateRef} setShowFavorites={setShowFavorites} />);

        const button = screen.getByRole("button", { name: /menu/i });
        fireEvent.click(button);

        const favouriteCitiesOption = screen.getByText("Favourite cities");
        fireEvent.click(favouriteCitiesOption);

        expect(stateRef.current).toBe(true);
        expect(setShowFavorites).toHaveBeenCalledTimes(1);

        fireEvent.click(button);

        const allCitiesOption = screen.getByText("All cities");
        fireEvent.click(allCitiesOption);

        expect(stateRef.current).toBe(false);
        expect(setShowFavorites).toHaveBeenCalledTimes(2);
    });
});
