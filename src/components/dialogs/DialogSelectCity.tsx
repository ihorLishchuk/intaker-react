import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

import SearchBar from "../search-bar/SearchBar.tsx";

interface DialogSelectCityProps {
    open: boolean;
    onClose: (value: string | null) => void;
}

const DialogSelectCity = (props: DialogSelectCityProps) => {
    const { onClose, open } = props;
    const [city, setCity] = useState<string>()

    const handleClose = () => {
        onClose(null);
    };

    const handleSelect = () => {
        onClose(city as string);
    };

    const handleValue = (value: string) => {
        setCity(value);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Type a city</DialogTitle>
            <DialogContent>
                <SearchBar onValueChanged={handleValue} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleSelect}>Select</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogSelectCity;