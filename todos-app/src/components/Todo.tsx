import React from 'react'

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

    const enableEditMode = (index: number) => {
        setEditMode(true, index);
    }

    const handleSaveChanges = (index: number) => {
        setEditMode(false)
    }


    return (
        <h6 key={index} onDoubleClick={() => enableEditMode(index)} >
            {
                (index === indexOnEdit) ?
                    (
                        <>
                            <input value={text} onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateTodos('update', index, event.target.value)} />
                            <button className="btn btn-primary btn-sm m-1" onClick={() => handleSaveChanges(index)}>Save</button>
                            <button className="btn btn-danger btn-sm m-1" onClick={() => updateTodos('delete', index)}>X</button>
                        </>
                    ) : (
                        <p style={checked ? { textDecorationLine: 'line-through' } : {}}>
                            <input type="checkbox" checked={checked} onChange={event => handleUpdateChecked(index, event.target.checked)} />
                            {"  "} {text} </p>
                    )
            }
        </h6>
    );
}
