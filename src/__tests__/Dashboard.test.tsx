import { render, screen } from "@testing-library/react";
import Dashboard from "../components/dashboard/Dashboard.tsx";

jest.mock("../components/favourites/Favourites.tsx", () => () => (
    <div data-testid="favourites-mock">FavouritesMock</div>
));
jest.mock("../components/weather-widget/WeatherWidgetList.tsx", () => () => (
    <div data-testid="widget-list-mock">WeatherWidgetListMock</div>
));
jest.mock("../components/weather-widget/WeatherWidgetEmpty.tsx", () => () => (
    <div data-testid="widget-empty-mock">WeatherWidgetEmptyMock</div>
));

describe("Dashboard", () => {
    it("renders the main title", () => {
        render(<Dashboard />);
        expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
    });

    it("renders the AppBar with toolbar", () => {
        render(<Dashboard />);
        const title = screen.getByText(/dashboard/i);
        expect(title.closest("header")).toBeInTheDocument();
    });

    it("renders Favourites, WidgetList, and WidgetEmpty sections", () => {
        render(<Dashboard />);

        expect(screen.getByTestId("favourites-mock")).toBeInTheDocument();
        expect(screen.getByTestId("widget-list-mock")).toBeInTheDocument();
        expect(screen.getByTestId("widget-empty-mock")).toBeInTheDocument();
    });
});
