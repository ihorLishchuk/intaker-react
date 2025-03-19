import {useContext} from "react";

import WidgetServiceContext from "../services/WidgetServiceContext.ts";

const useWidgetService = () => {
    const context = useContext(WidgetServiceContext);
    if (!context) {
        throw new Error("useWidgetService must be used within a WidgetServiceProvider");
    }
    return context;
};

export default useWidgetService;