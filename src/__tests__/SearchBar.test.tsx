import {render, screen, fireEvent, act} from "@testing-library/react";
import SearchBar from "../components/search-bar/SearchBar.tsx";

describe("SearchBar Component", () => {
    test("renders the input field correctly", () => {
        render(<SearchBar onValueChanged={jest.fn()} required={true} />);

        const input = screen.getByLabelText("Search by *");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "search");
        expect(input).toBeRequired();
    });

    test("calls onValueChanged when input changes", () => {
        const onValueChangedMock = jest.fn();
        render(<SearchBar onValueChanged={onValueChangedMock} required={false} />);

        const input = screen.getByLabelText("Search by");
        fireEvent.change(input, { target: { value: "Hello" } });

        expect(onValueChangedMock).toHaveBeenCalledTimes(1);
        expect(onValueChangedMock).toHaveBeenCalledWith("Hello");
    });

    test("focuses the input field on mount", () => {
        jest.useFakeTimers();

        render(<SearchBar onValueChanged={jest.fn()} required={false} />);

        act(() => {
            jest.runAllTimers(); // Ensures useEffect's setTimeout executes
        });

        const input = screen.getByLabelText("Search by");
        expect(document.activeElement).toBe(input);

        jest.useRealTimers();
    });
});
