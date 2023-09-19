import { TextField, InputAdornment, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { InputProp } from '../utils/constants';


const TaskInput = (prop: InputProp) => {
    return (
        <TextField placeholder='Enter task' color='primary' id='task-input' InputProps={{
            endAdornment: <InputAdornment position='end'><IconButton color='secondary' onClick={prop.onClick} sx={{ backgroundColor: 'green' }}><AddCircleOutlineIcon /></IconButton></InputAdornment>,
        }} ref={prop.ref}
            helperText={prop.helpText}
        />
    )
}

export default TaskInput;
