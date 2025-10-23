import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";

import { toggleFavorites } from "../../stores";

const Favourites = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (value: boolean) => {
        setAnchorEl(null);
        toggleFavorites(value);
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={() => handleSelect(true)}>
                    Favourite cities
                </MenuItem>
                <MenuItem onClick={() => handleSelect(false)}>
                    All cities
                </MenuItem>
            </Menu>
        </>
    );
};

export default Favourites;
