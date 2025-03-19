import React, {useEffect, useRef} from "react";
import {TextField} from "@mui/material";

const SearchBar = ({ onValueChanged, required }: { onValueChanged: (value: string) => void, required: boolean }) => {

    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        onValueChanged(event.target.value);
    }

    const inputRef = useRef({} as HTMLInputElement);

    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current.focus();
        });

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <TextField
            id="filled-search"
            label="Search by"
            type="search"
            size="small"
            required={required}
            onChange={handleValueChanged}
            inputRef={inputRef}
        />
    );
}

export default SearchBar;