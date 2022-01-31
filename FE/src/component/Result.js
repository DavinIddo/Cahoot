import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import React from 'react'

function Result({ armors }) {
    const armor_set = ['helm', 'torso', 'arms', 'waist', 'legs']

    return (
        <div>
            <List>
                { 
                    armor_set.map((piece, index) => (
                        <ListItem key={index}>
                            <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                            <ListItemText>{piece}</ListItemText>
                            {armors[piece].map((armor, ind) => (
                                <ListItemText key={ind}>{armor}</ListItemText>
                            ))}
                        </ListItem>
                    ))
                }
            </List>
        </div>
    );
}

export default Result;