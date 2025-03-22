import { Stack, FormControlLabel, Checkbox } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

export interface TodoProps {
    completed: boolean
    content: string,
    _id: string
}

interface ExtraProps extends TodoProps {
    onDelete: (_id: string) => void;
    onUpdate: (_id: string, updatedFields: Partial<TodoProps>) => void;
}
function Todo(todoProps: ExtraProps) {
    const [checked, setChecked] = useState<boolean>(todoProps.completed);
    const updateCheckState = () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
        todoProps.onUpdate(todoProps._id, { completed: newCheckedState });
    };

    const deleteTodo = () => {
        todoProps.onDelete(todoProps._id);
    };
    return (
        <Stack paddingInline={'5vh'} width={'100%'} direction={'row'} justifyContent={'space-between'} >
            <FormControlLabel control={<Checkbox checked={checked} onChange={updateCheckState} />} label={todoProps.content} />
            <IconButton aria-label="delete" onClick={deleteTodo}>
                <DeleteIcon />
            </IconButton>
        </Stack>
    )
}

export default Todo