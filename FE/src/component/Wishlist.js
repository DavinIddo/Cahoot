import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'

function Wishlist({ wishlists, handleDelete }) {

    return (
        <List>
            {wishlists.map((wish, index) => (
                <ListItem key={index} secondaryAction={
                    <IconButton edge='end' onClick={() => handleDelete({wish})}>
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemText primary={wish} />
                </ListItem>
            ))}
        </List>
    );
}

export default Wishlist;