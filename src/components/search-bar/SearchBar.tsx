import {TextField} from "@mui/material";
import React from "react";

const SearchBar = ({ onValueChanged }: { onValueChanged: (value: string) => void }) => {

    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChanged(event.target.value);
    }

    return (
        <TextField
            id="filled-search"
            label="Search by"
            type="search"
            size="small"
            onChange={handleValueChanged}
        />
    );
}

export default SearchBar;