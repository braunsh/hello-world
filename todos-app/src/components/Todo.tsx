import React, { useState } from 'react'
import styled from 'styled-components';


import { Input, Button } from "../components/TodoStyles";

interface TabProps {
    index: number;
    indexOnEdit: number;
    text: string;
    checked: boolean;
    handleUpdateChecked: (index: number, value: boolean) => void;
    setEditMode: (isEnabled: boolean, index?: number) => void;
    updateTodos: (action: string, indexToUpdate: number, value?: string) => void;
    onPress?: () => void;
}

export default function Todo({ index, indexOnEdit, text, checked, handleUpdateChecked, setEditMode, updateTodos }: TabProps) {

    const [editedText, setEditedText] = useState("");

    const enableEditMode = (index: number) => {
        setEditMode(true, index);
        setEditedText(text);
    }

    const handleSaveChanges = (index: number) => {
        setEditMode(false)
        if (editedText.trim().length !== 0)
            updateTodos('update', index, editedText);
    }


    return (
        <TodosContainer key={index} onDoubleClick={() => enableEditMode(index)} >
            {
                (index === indexOnEdit) ?
                    (
                        <>
                            <Input value={editedText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEditedText(event.target.value)} />
                            <SaveButton onClick={() => handleSaveChanges(index)}>Save</SaveButton>
                            <DeleteButton onClick={() => updateTodos('delete', index)}>Delete</DeleteButton>
                        </>
                    ) : (
                        <StyledTodo checked={checked}>
                            <input type="checkbox" checked={checked} onChange={event => handleUpdateChecked(index, event.target.checked)} />
                            {"  "} {text}
                        </StyledTodo>
                    )
            }
        </TodosContainer>
    );
}

interface ITodoProps {
    checked?: boolean,
}

const StyledTodo = styled.section<ITodoProps>`
${({ checked }) => checked && `
text-decoration-line: line-through;
`}
font-size: 1em;
padding: 0.25em;
`;

const TodoButton = styled(Button)`
border-radius: 20px;
`;

const SaveButton = styled(TodoButton)`
background: #448D76;
`;

const DeleteButton = styled(TodoButton)`
background: #BE5057;
`;

const TodosContainer = styled.section`
max-width: 1000px;
display: flex;
margin-left: 50px;
margin-right: 50px;
`;