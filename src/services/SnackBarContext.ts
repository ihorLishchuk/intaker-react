import {createContext} from "react";

import {SnackbarContextType} from "../entities";

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export default SnackbarContext;
