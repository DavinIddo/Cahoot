import { List, ListItem, ListItemText, ListItemIcon, ListItemButton, Tooltip } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react'

function Result({ armors, isLoggedIn }) {
    const armor_set = ['helm', 'torso', 'arms', 'waist', 'legs']

    function handleClick(armor) {
        fetch('http://localhost:4000/add_wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(armor)
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            <List>
                { 
                    armor_set.map((piece, index) => (
                        <ListItem key={index}>
                            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                            <ListItemText>{piece}</ListItemText>

                            {isLoggedIn ? (
                                armors[piece].map((armor, ind) => (
                                    <Tooltip key={ind} title='click to add to wishlist'>
                                        <ListItemButton onClick={() => handleClick({armor})} dense>
                                            <ListItemText>{armor}</ListItemText> 
                                        </ListItemButton>
                                    </Tooltip>
                                ))
                            ) : (
                                armors[piece].map((armor, ind) => (
                                    <ListItemText key={ind}>{armor}</ListItemText> 
                                ))
                            )}
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );
}

export default Result;