import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

function Result({ skill, armors }) {
    const armor_set = ['helm', 'torso', 'arms', 'waist', 'legs']

    return (
        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{ skill }</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <List>
                        { 
                            armor_set.map((piece, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                                    <ListItemText>{piece}</ListItemText>
                                    <ListItemText>{armors[piece]}</ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default Result;