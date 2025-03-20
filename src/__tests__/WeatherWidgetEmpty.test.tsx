import {render, screen, fireEvent, act} from "@testing-library/react";
import WeatherWidgetEmpty from "../components/weather-widget/WeatherWidgetEmpty.tsx";

jest.mock("../components/select-city/DialogSelectCity", () => ({ open, onClose }: { open: boolean; onClose: (city: string) => void }) => (
    open ? <div data-testid="dialog-select-city" onClick={() => onClose("Berlin")} /> : null
));

const mockWeatherService = {
    getCurrentWeatherByCity: jest.fn(() => Promise.resolve("mockedCurrentWeather")),
    getNDaysForecast: jest.fn(() => Promise.resolve("mockedForecast"))
};

const mockWidgetService = {
    addNewWidget: jest.fn(),
    hasDuplicates: jest.fn(() => false)
};

const mockSnackbar = {
    showSnackbar: jest.fn()
};

jest.mock("../hooks/useWeatherService", () => () => mockWeatherService);
jest.mock("../hooks/useWidgetService", () => () => mockWidgetService);
jest.mock("../hooks/useSnackbar", () => () => mockSnackbar);

describe("WeatherWidgetEmpty Component", () => {
    test("renders the empty widget card", () => {
        render(<WeatherWidgetEmpty />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("opens the city selection dialog when clicked", () => {
        render(<WeatherWidgetEmpty />);

        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByTestId("dialog-select-city")).toBeInTheDocument();
    });

    test("adds a new widget when a city is selected", async () => {
        render(<WeatherWidgetEmpty />);

        fireEvent.click(screen.getByRole("button"));

        await act(async () => {
            fireEvent.click(screen.getByTestId("dialog-select-city"));
        });

        expect(mockWeatherService.getCurrentWeatherByCity).toHaveBeenCalledWith("Berlin");
        expect(mockWeatherService.getNDaysForecast).toHaveBeenCalledWith({ name: "Berlin" });
        expect(mockWidgetService.addNewWidget).toHaveBeenCalledWith({
            currentWeather: "mockedCurrentWeather",
            forecast: "mockedForecast",
            favourite: false,
        });
        expect(mockSnackbar.showSnackbar).toHaveBeenCalledWith("Widget added for Berlin", "success");
    });

    test("shows a warning if a duplicate widget is added", async () => {
        mockWidgetService.hasDuplicates.mockImplementation(() => true);

        render(<WeatherWidgetEmpty />);

        fireEvent.click(screen.getByRole("button"));

        await act(async () => {
            fireEvent.click(screen.getByTestId("dialog-select-city"));
        });

        expect(mockSnackbar.showSnackbar).toHaveBeenCalledWith("You already have a widget with the city: Berlin", "warning");
    });

    test("shows an error if fetching weather data fails", async () => {
        mockWidgetService.hasDuplicates.mockImplementation(() => false);
        mockWeatherService.getCurrentWeatherByCity.mockRejectedValue(new Error("Network error"));

        render(<WeatherWidgetEmpty />);

        fireEvent.click(screen.getByRole("button"));

        await act(async () => {
            fireEvent.click(screen.getByTestId("dialog-select-city"));
        });

        expect(mockSnackbar.showSnackbar).toHaveBeenCalledWith("Failed to fetch weather data", "error");
    });
});