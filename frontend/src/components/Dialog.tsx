import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TodoProps } from './Todo';


interface DialogProps {
    open: boolean;
    handleClose: () => void;
    createTodo: (todoProps: Partial<TodoProps>) => void;
}

export default function FormDialog(dialogProps: DialogProps) {

    return (
        <React.Fragment>
            <Dialog
                open={dialogProps.open}
                onClose={dialogProps.handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries()) as Partial<TodoProps>;
                            dialogProps.createTodo(formJson)
                            dialogProps.handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add new todo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Provide your todo, keep it short and simple
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="content"
                        name="content"
                        label="content"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogProps.handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
