import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WeatherWidgetEmpty from "../components/weather-widget/WeatherWidgetEmpty.tsx";
import { addNewWidget, hasDuplicates } from "../stores";
import { weatherService } from "../api";
import { useSnackbar } from "../hooks";

jest.mock("../stores", () => ({
    addNewWidget: jest.fn(),
    hasDuplicates: jest.fn(),
}));
jest.mock("../api", () => ({
    weatherService: {
        getCurrentWeatherByCity: jest.fn(),
        getNDaysForecast: jest.fn(),
    },
}));
jest.mock("../hooks", () => ({
    useSnackbar: jest.fn(),
}));
jest.mock("../components/select-city/DialogSelectCity.tsx", () => ({ open, onClose }: any) => (
    open ? (
        <div data-testid="dialog">
            <button onClick={() => onClose("Berlin")}>Select Berlin</button>
            <button onClick={() => onClose(null)}>Cancel</button>
        </div>
    ) : null
));

describe("WeatherWidgetEmpty", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useSnackbar as jest.Mock).mockReturnValue({ showSnackbar });
        (weatherService.getCurrentWeatherByCity as jest.Mock).mockResolvedValue({ id: 1, name: "Berlin" });
        (weatherService.getNDaysForecast as jest.Mock).mockResolvedValue([]);
        jest.clearAllMocks();
    });

    it("opens dialog on card click", () => {
        render(<WeatherWidgetEmpty />);
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByTestId("dialog")).toBeInTheDocument();
    });

    it("adds new widget when city selected", async () => {
        (hasDuplicates as jest.Mock).mockReturnValue(false);
        render(<WeatherWidgetEmpty />);
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText(/select berlin/i));
        await waitFor(() => expect(addNewWidget).toHaveBeenCalled());
        expect(showSnackbar).toHaveBeenCalledWith("Widget added for Berlin", "success");
    });

    it("shows warning when duplicate city selected", async () => {
        (hasDuplicates as jest.Mock).mockReturnValue(true);
        render(<WeatherWidgetEmpty />);
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText(/select berlin/i));
        await waitFor(() => expect(showSnackbar).toHaveBeenCalledWith("You already have a widget with the city: Berlin", "warning"));
    });

    it("shows error if API fails", async () => {
        (hasDuplicates as jest.Mock).mockReturnValue(false);
        (weatherService.getCurrentWeatherByCity as jest.Mock).mockRejectedValue(new Error("fail"));
        render(<WeatherWidgetEmpty />);
        fireEvent.click(screen.getByRole("button"));
        fireEvent.click(screen.getByText(/select berlin/i));
        await waitFor(() => expect(showSnackbar).toHaveBeenCalledWith("Failed to fetch weather data", "error"));
    });
});
