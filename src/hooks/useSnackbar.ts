import {useContext} from "react";

import SnackbarContext from "../services/SnackBarContext.ts";

import {SnackbarContextType} from "../entities";

const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("useSnackbar must be used within a SnackbarProvider");
    }
    return context;
};

export default useSnackbar;