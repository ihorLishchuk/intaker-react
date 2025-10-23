import { render, screen, fireEvent, act } from "@testing-library/react";
import WeatherWidget from "../components/weather-widget/WeatherWidget.tsx";
import { widgetStore, removeWidget, toggleFavourite, updateWidget } from "../stores";
import { useSnackbar } from "../hooks";
import { weatherService } from "../api";
import { DEFAULT_WEATHER_UPDATE_SEQUENCE } from "../consts";
import {WidgetEntity} from "../entities";

jest.mock("../stores", () => ({
    widgetStore: { useStore: jest.fn() },
    removeWidget: jest.fn(),
    toggleFavourite: jest.fn(),
    updateWidget: jest.fn(),
}));
jest.mock("../hooks", () => ({
    useSnackbar: jest.fn(),
}));
jest.mock("../api", () => ({
    weatherService: {
        getCurrentWeatherByCity: jest.fn(),
        getNDaysForecast: jest.fn(),
    },
}));
jest.mock("../components/weather-widget/WeatherWidgetBasic.tsx", () => () => <div data-testid="basic" />);
jest.mock("../components/weather-widget/WeatherWidgetForecast.tsx", () => () => <div data-testid="forecast" />);

const widget = {
    currentWeather: { id: 1, name: "Berlin" },
    forecast: {},
    favourite: false,
} as unknown as WidgetEntity;

describe("WeatherWidget", () => {
    beforeEach(() => {
        jest.useFakeTimers();
        (widgetStore.useStore as jest.Mock).mockReturnValue([widget]);
        (useSnackbar as jest.Mock).mockReturnValue({ showSnackbar: jest.fn() });
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it("renders widget title", () => {
        render(<WeatherWidget widget={widget} />);
        expect(screen.getByText("Berlin")).toBeInTheDocument();
        expect(screen.getByTestId("basic")).toBeInTheDocument();
        expect(screen.getByTestId("forecast")).toBeInTheDocument();
    });

    it("calls toggleFavourite when icon is clicked", () => {
        render(<WeatherWidget widget={widget} />);
        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        expect(toggleFavourite).toHaveBeenCalled();
    });

    it("calls removeWidget when Remove button is clicked", () => {
        render(<WeatherWidget widget={widget} />);
        fireEvent.click(screen.getByText(/remove/i));
        expect(removeWidget).toHaveBeenCalled();
    });

    it("updates widget periodically", async () => {
        (weatherService.getCurrentWeatherByCity as jest.Mock).mockResolvedValue({ id: 1, name: "Berlin" });
        (weatherService.getNDaysForecast as jest.Mock).mockResolvedValue([]);

        render(<WeatherWidget widget={widget} />);

        await act(async () => {
            jest.advanceTimersByTime(DEFAULT_WEATHER_UPDATE_SEQUENCE);
            await Promise.resolve();
        });

        expect(updateWidget).toHaveBeenCalled();
    });
});
