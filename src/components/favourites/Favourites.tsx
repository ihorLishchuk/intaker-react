import React, {Dispatch, RefObject, SetStateAction, useState} from "react";
import {MoreVert} from "@mui/icons-material";
import {IconButton, Menu, MenuItem} from "@mui/material";

const Favourites = ({ stateRef, setShowFavorites }: { stateRef: RefObject<boolean>, setShowFavorites: Dispatch<SetStateAction<boolean>> }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (favourites: boolean) => {
        setAnchorEl(null);
        stateRef.current = favourites;
        setShowFavorites((prev) => !prev);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose(true)}>Favourite cities</MenuItem>
                <MenuItem onClick={() => handleClose(false)}>All cities</MenuItem>
            </Menu>
        </>
    );
}

export default Favourites;