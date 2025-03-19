import React from "react";

import widgetService from "./WidgetService.ts";
import WidgetServiceContext from './WidgetServiceContext.ts';

const WidgetServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <WidgetServiceContext.Provider value={widgetService}>
            {children}
        </WidgetServiceContext.Provider>
    );
};

export default WidgetServiceProvider;