import React, { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components';

import { Input, Button } from './TodoStyles';
import Todo from "./Todo"


interface TodoItem {
    text: string;
    checked: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [addTodoText, setAddTodoText] = useState<string>('');
    const [indexOnEdit, setIndexOnEdit] = useState<number>(-1);

    const handleAddTodo = () => {
        let textToAdd = addTodoText.trim();
        if (textToAdd.length !== 0) {
            let newTodos = [...todos];
            newTodos.push({ checked: false, text: textToAdd });
            setTodos(newTodos);
            setAddTodoText('');
        }
    }
    const handleDelete = (index: number) => {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setEditMode(false)
    }

    const updateNewTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddTodoText(event.target.value);
        setEditMode(false);
    }

    const setEditMode = (isEnabled: boolean, index = -1) => {
        if (isEnabled && index === -1)
            console.error("Error enabling edit mode: index should be set when edit moe is enabled");
        setIndexOnEdit(isEnabled ? index : index);
    }

    const updateTodos = (action: string, indexToUpdate: number, value?: string) => {
        switch (action) {
            case 'delete':
                handleDelete(indexToUpdate);
                break;
            case 'update':
                handleUpdateText(indexToUpdate, value ? value : "")
                break;
            default:
                console.error("action " + action + " not supported on updateTodos");
        }
    }

    const handleUpdateText = (index: number, value: string) => {
        let newTodos = [...todos];
        newTodos[index] = { ...newTodos[index], text: value };
        setTodos(newTodos);
    }

    const handleUpdateChecked = (index: number, value: boolean) => {
        let newTodos = [...todos];
        newTodos[index] = { ...newTodos[index], checked: value };
        setTodos(newTodos);
    }


    return (
        <ThemeProvider theme={theme}>
            <Title>TODOs </Title>
            <Input value={addTodoText} onChange={updateNewTodoText} placeholder="Add new item" />
            <Button onClick={handleAddTodo}>Add </Button>

            {todos.map((todo, index) => <Todo
                key={index}
                index={index} {...todo}
                indexOnEdit={indexOnEdit}
                handleUpdateChecked={handleUpdateChecked}
                setEditMode={setEditMode}
                updateTodos={updateTodos} />
            )}

        </ThemeProvider>);
}



const theme = {
    boderColor: "black",
    color: "black",
    bgColor: "#448D76"
}

const Title = styled.h1`
 padding: 10px;
 text-align: center;
 color: #F7D4D6;
 font-size: 2.5em;
 background: ${props => props.theme.color};
 `;



