import React, { useState } from 'react';

import Todo from '../components/Todo';


function TodoList() {
    const [todos, setTodos] = useState([]);
    const [addTodoText, setAddTodoText] = useState('');
    const [indexOnEdit, setIndexOnEdit] = useState(-1);

    const handleAddTodo = () => {
        let textToAdd = addTodoText.trim();
        if (textToAdd.length !== 0) {
            let newTodos = [...todos];
            newTodos.push({ checked: false, text: textToAdd });
            setTodos(newTodos);
            setAddTodoText('');
        }
    }

    const handleDelete = (index) => {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
        setEditMode(false)
    }

    const updateNewTodoText = (event) => {
        setAddTodoText(event.target.value);
    }

    const setEditMode = (index = -1, isEnabled) => {
        if (isEnabled && index === -1)
            console.error("Error enabling edit mode: index should be set when edit moe is enabled");
        setIndexOnEdit(isEnabled ? index : index);
    }

    const updateTodos = (action, indexToUpdate, field, value) => {
        switch (action) {
            case 'delete':
                handleDelete(indexToUpdate);
                break;
            case 'update':
                handleUpdate(indexToUpdate, field, value)
                break;
            default:
                console.error("action " + action + " not supported on updateTodos");
        }
    }


    const handleUpdate = (index, field, value) => {
        let newTodos = [...todos];

        switch (field) {
            case 'text':
                newTodos[index] = { ...newTodos[index], text: value };
                break;
            case 'checked':
                newTodos[index] = { ...newTodos[index], checked: value };
                break;
            default:
                console.error("field " + field + " not supported on handleUpdate");
        }
        setTodos(newTodos);
    }


    return (
        <>
            <h1>TODOs </h1>
            <input value={addTodoText} onChange={updateNewTodoText} onKeyPress />
            <button className="btn btn-primary btn-sm m-2" onClick={handleAddTodo}>Add </button>

            {todos.map((todo, index) => <Todo index={index} {...todo}
                indexOnEdit={indexOnEdit}
                handleDelete={handleDelete}
                setEditMode={setEditMode}
                updateTodos={updateTodos} />
            )}

        </>);
}

export default TodoList;

