import React from 'react'

export default function Todo({ index, indexOnEdit, text, checked, setEditMode, updateTodos }) {

    const enableEditMode = (index) => {
        setEditMode(index, true);
    }

    const handleSaveChanges = (index) => {
        setEditMode(false)
    }


    return (
        <h6 key={index} onDoubleClick={() => enableEditMode(index)} >
            {
                (index === indexOnEdit) ?
                    (
                        <>
                            <input value={text} onChange={(event) => updateTodos('update', index, 'text', event.target.value)} />
                            <button className="btn btn-primary btn-sm m-1" onClick={() => handleSaveChanges(index)}>Save</button>
                            <button className="btn btn-danger btn-sm m-1" onClick={() => updateTodos('delete', index, 'text')}>X</button>
                        </>
                    ) : (
                        <p style={checked ? { textDecorationLine: 'line-through' } : {}}>
                            <input type="checkbox" checked={checked} onChange={event => updateTodos('update', index, 'checked', event.target.checked)} />
                            {"  "} {text} </p>
                    )
            }
        </h6>
    );
}
