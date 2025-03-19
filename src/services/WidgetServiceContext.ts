import {createContext} from "react";

import widgetService from './WidgetService';

const WidgetServiceContext = createContext(widgetService);

export default WidgetServiceContext;