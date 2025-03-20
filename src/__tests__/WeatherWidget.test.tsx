import { render, screen, fireEvent, act } from "@testing-library/react";
import WeatherWidget from "../components/weather-widget/WeatherWidget";

import useWeatherService from "../hooks/useWeatherService";
import {CurrentWeatherEntity, ForecastEntity, WidgetEntity} from "../entities";

const mockRemoveWidget = jest.fn();
const mockToggleFavourite = jest.fn();
const mockUpdateWidget = jest.fn();
const mockShowSnackbar = jest.fn();
const mockGetCurrentWeatherByCity = jest.fn(() => Promise.resolve("mockedCurrentWeather"));
const mockGetNDaysForecast = jest.fn(() => Promise.resolve("mockedForecast"));

jest.mock("../hooks/useWidgetService", () => () => ({
    removeWidget: mockRemoveWidget,
    toggleFavourite: mockToggleFavourite,
    updateWidget: mockUpdateWidget,
    widgets: [{ currentWeather: { id: 1, name: "Berlin" } }] // Ensure widget exists
}));

jest.mock("../hooks/useSnackbar", () => () => ({
    showSnackbar: mockShowSnackbar
}));

jest.mock("../hooks/useWeatherService", () => () => ({
    getCurrentWeatherByCity: mockGetCurrentWeatherByCity,
    getNDaysForecast: mockGetNDaysForecast
}));

jest.mock("../components/weather-widget/WeatherWidgetBasic", () => () => <div data-testid="weather-widget-basic" />);
jest.mock("../components/weather-widget/WeatherWidgetForecast", () => () => <div data-testid="weather-widget-forecast" />);

const mockWidget: WidgetEntity = {
    currentWeather: { id: 1, name: "Berlin" } as CurrentWeatherEntity,
    forecast: {} as ForecastEntity,
    favourite: false,
};

describe("WeatherWidget Component", () => {
    test("renders the weather widget correctly", () => {
        render(<WeatherWidget widget={mockWidget} />);

        expect(screen.getByText("Berlin")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
    });

    test("calls removeWidget when Remove button is clicked", () => {
        render(<WeatherWidget widget={mockWidget} />);

        const removeButton = screen.getByRole("button", { name: /remove/i });
        fireEvent.click(removeButton);

        expect(mockRemoveWidget).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toHaveBeenCalledWith("The widget was removed successfully", "success");
    });

    test("calls toggleFavourite when favourite button is clicked", () => {
        render(<WeatherWidget widget={mockWidget} />);

        const favButton = screen.getAllByRole("button")[0];
        fireEvent.click(favButton);
        expect(mockToggleFavourite).toHaveBeenCalledTimes(1);
    });

    test("updates widget periodically", async () => {
        jest.useFakeTimers();
        const { getCurrentWeatherByCity, getNDaysForecast } = useWeatherService();

        render(<WeatherWidget widget={mockWidget} />);

        await act(async () => {
            jest.runOnlyPendingTimers();
        });

        expect(getCurrentWeatherByCity).toHaveBeenCalledWith("Berlin");
        expect(getNDaysForecast).toHaveBeenCalledWith({ name: "Berlin" });
        expect(mockUpdateWidget).toHaveBeenCalled();

        jest.useRealTimers();
    });
});