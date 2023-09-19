import { ListItem, Box, ListItemButton, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface MyComponentProps {
    checked: boolean,
    text: string,
    onClick: (index: number) => void,
    index: number,
    onCheck: (index: number) => void
}


const TaskItem = (prop: MyComponentProps) => {

    return (
        <ListItem>
            <Checkbox checked={prop.checked} onClick={() => {
                prop.onCheck(prop.index);
            }}></Checkbox>
            <ListItemButton>
                <Box sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '1',
                    width: '150px'
                }}>
                    <ListItemText>{prop.text}</ListItemText>
                </Box>
            </ListItemButton>
            <IconButton color='secondary' onClick={() => prop.onClick(prop.index)} sx={{ backgroundColor: 'red' }}><DeleteOutlineIcon /></IconButton>
        </ListItem>
    )
}

export default TaskItem;
