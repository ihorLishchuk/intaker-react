
import {fireEvent, render, screen} from "@testing-library/react";

import SnackbarProvider from "../services/SnackBarProvider.tsx";
import WidgetServiceProvider from "../services/WidgetServiceProvider.tsx";
import Dashboard from "../components/dashboard/Dashboard.tsx";
import React from "react";

jest.mock("../components/weather-widget/WeatherWidgetEmpty.tsx", () => () => (
    <div data-testid="weather-widget-empty">WeatherWidgetEmpty</div>
));

jest.mock("../components/weather-widget/WeatherWidgetList.tsx", () => ({ showFavorites }: { showFavorites: boolean }) => (
    <div data-testid="weather-widget-list">WeatherWidgetList - {showFavorites ? "Favorites" : "All"}</div>
));

jest.mock("../components/favourites/Favourites.tsx", () => ({ stateRef, setShowFavorites }: { stateRef: { current: boolean }, setShowFavorites: React.Dispatch<React.SetStateAction<boolean>> }) => (
    <button data-testid="toggle-favourites" onClick={() => {
        stateRef.current = !stateRef.current;
        setShowFavorites((prev: boolean) => !prev);
    }}>
        Toggle Favourites
    </button>
));

const MockDashboard = () => (
    <SnackbarProvider>
        <WidgetServiceProvider>
            <Dashboard />
        </WidgetServiceProvider>
    </SnackbarProvider>
);

describe("Dashboard Component", () => {
    test("renders Dashboard correctly", () => {
        render(<MockDashboard />);

        expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
        expect(screen.getByTestId("weather-widget-empty")).toBeInTheDocument();
        expect(screen.getByTestId("weather-widget-list")).toBeInTheDocument();
        expect(screen.getByTestId("toggle-favourites")).toBeInTheDocument();
    });

    test("toggles favorites view when button is clicked", () => {
        render(<MockDashboard />);

        const toggleButton = screen.getByRole("button", { name: /toggle favourites/i });
        expect(screen.getByTestId("weather-widget-list")).toHaveTextContent("All");

        fireEvent.click(toggleButton);
        expect(screen.getByTestId("weather-widget-list")).toHaveTextContent("Favorites");

        fireEvent.click(toggleButton);
        expect(screen.getByTestId("weather-widget-list")).toHaveTextContent("All");
    });
});