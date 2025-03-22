import { Container, Stack, Button } from '@mui/material';
import DenseAppBar from './components/AppBar';
import AddIcon from '@mui/icons-material/Add';
import Todo from './components/Todo';
import useTodos from './hooks/setTodos';
import { useState } from 'react';
import FormDialog from './components/Dialog';

export default function App() {

  const { todos, loading, error, createTodo, deleteTodo, updateTodo } = useTodos();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container
      maxWidth="lg"
      style={{
        marginBlock: "1vh",
        backgroundColor: "#eeeeee",
        height: "90%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <DenseAppBar />
      </header>

      <Stack mt={'2vh'} pt={'2vh'} spacing={1} alignItems={'center'} bgcolor={'white'} sx={{ flexGrow: 1 }}>
        
        {todos.length !== 0 ? todos.map(todo => (
          <Todo
            key={todo._id}
            content={todo.content}
            completed={todo.completed}
            _id={todo._id}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )) : <h1>No todos</h1>}
      </Stack>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
        style={{
          padding: '3vh 5vh',
          backgroundColor: 'purple',
          width: 'fit-content',
          position: 'relative',
          left: '50%',
          right: '50%',
          borderRadius: '30px',
          bottom: 0,
          transform: 'translate(-50%, 50%)'
        }}
      >
        Add Todo
      </Button>
      <FormDialog open={open} handleClose={handleClose} createTodo={createTodo} />
    </Container>
  )
}