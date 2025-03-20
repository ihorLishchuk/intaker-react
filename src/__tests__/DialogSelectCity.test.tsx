import { render, screen, fireEvent } from "@testing-library/react";
import DialogSelectCity from "../components/select-city/DialogSelectCity.tsx";

jest.mock("../components/search-bar/SearchBar", () => ({ onValueChanged, required }: { onValueChanged: (value: string) => void; required?: boolean }) => (
    <input
        data-testid="search-bar"
        required={required}
        onChange={(e) => onValueChanged(e.target.value)}
    />
));

describe("DialogSelectCity Component", () => {
    test("renders the dialog with title and buttons", () => {
        render(<DialogSelectCity open={true} onClose={jest.fn()} />);

        expect(screen.getByText("Type a city")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /select/i })).toBeInTheDocument();
        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    });

    test("calls onClose when Close button is clicked", () => {
        const onCloseMock = jest.fn();
        render(<DialogSelectCity open={true} onClose={onCloseMock} />);

        fireEvent.click(screen.getByRole("button", { name: /close/i }));
        expect(onCloseMock).toHaveBeenCalledWith(null);
    });

    test("updates city value and calls onClose when Select is clicked", () => {
        const onCloseMock = jest.fn();
        render(<DialogSelectCity open={true} onClose={onCloseMock} />);

        const input = screen.getByTestId("search-bar");
        fireEvent.change(input, { target: { value: "Berlin" } });

        fireEvent.click(screen.getByRole("button", { name: /select/i }));
        expect(onCloseMock).toHaveBeenCalledWith("Berlin");
    });

    test("submitting the form triggers selection", () => {
        const onCloseMock = jest.fn();
        render(<DialogSelectCity open={true} onClose={onCloseMock} />);

        const input = screen.getByTestId("search-bar");
        fireEvent.change(input, { target: { value: "Paris" } });

        fireEvent.submit(screen.getByRole("dialog"));
        expect(onCloseMock).toHaveBeenCalledWith("Paris");
    });

    test("pressing Enter key selects the city", () => {
        const onCloseMock = jest.fn();
        render(<DialogSelectCity open={true} onClose={onCloseMock} />);

        const input = screen.getByTestId("search-bar");
        fireEvent.change(input, { target: { value: "London" } });

        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        fireEvent.submit(screen.getByRole("dialog"));
        expect(onCloseMock).toHaveBeenCalledWith("London");
    });

    test("does not close dialog if field is empty", () => {
        const onCloseMock = jest.fn();
        render(<DialogSelectCity open={true} onClose={onCloseMock} />);

        const input = screen.getByTestId("search-bar");
        fireEvent.change(input, { target: { value: "" } });

        fireEvent.click(screen.getByRole("button", { name: /select/i }));

        expect(onCloseMock).not.toHaveBeenCalled();
    });
});
