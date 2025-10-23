import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import Favourites from "../favourites/Favourites.tsx";
import WeatherWidgetEmpty from "../weather-widget/WeatherWidgetEmpty.tsx";
import WeatherWidgetList from "../weather-widget/WeatherWidgetList.tsx";

const Dashboard = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ marginBottom: "1rem" }}>
                <Toolbar>
                    <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Favourites />
                </Toolbar>
            </AppBar>

            <Box
                component="section"
                sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
            >
                <WeatherWidgetList />
                <WeatherWidgetEmpty />
            </Box>
        </Box>
    );
};

export default Dashboard;
