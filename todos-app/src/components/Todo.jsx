import React, { Component } from 'react';


class Todo extends Component {
    state = {
        todos: [],
        newTodoText: '',
        indexOnEditMode: -1,
    };

    handleAddTodo = () => {
        let itemToAdd = this.state.newTodoText.trim();
        if (itemToAdd.length !== 0) {
            let changeList = [...this.state.todos];
            changeList[changeList.length] = { checked: false, text: itemToAdd };
            this.setState({ todos: changeList });
            this.setState({ newTodoText: " " });
        }
    }

    handleDelete = (index) => {
        let changeList = [...this.state.todos];
        changeList.splice(index, 1);
        this.setState({ todos: changeList });
        this.setState({ indexOnEditMode: -1 });
    }

    handleSaveChanges = (index) => {
        this.setState({ indexOnEditMode: -1 });
    }


    updateNewTodo = (event) => {
        this.setState({ indexOnEditMode: -1 });
        this.setState({ newTodoText: event.target.value });
    }

    setEditMode = (index) => {
        this.setState({ indexOnEditMode: index });
    }

    handleEdit = (index, event) => {
        let changeList = [...this.state.todos];
        changeList[index] = { ...changeList[index], text: event.target.value };
        this.setState({ todos: changeList });
    }

    handleCheckChange = (index, event) => {
        let changeList = [...this.state.todos];
        changeList[index] = { ...changeList[index], checked: event.target.checked };
        this.setState({ todos: changeList });
    }

    renderTodoItem = (todo, index) => {
        if (index === this.state.indexOnEditMode)
            return (
                <>
                    <input value={this.state.todos[index].text} onChange={(event) => this.handleEdit(index, event)} />
                    <button className="btn btn-primary btn-sm m-1" onClick={() => this.handleSaveChanges(index)}>Save</button>
                    <button className="btn btn-danger btn-sm m-1" onClick={() => this.handleDelete(index)}>X</button>
                </>);
        else return (
            <p style={todo.checked ? { textDecorationLine: 'line-through' } : {}}>
                <input type="checkbox" checked={todo.checked} onChange={event => this.handleCheckChange(index, event)} />
                {"  "} {todo.text} </p>);
    }

    render() {
        return (
            <>
                <h1>TODOs </h1>
                <input value={this.state.newTodoText} onChange={this.updateNewTodo} />
                <button className="btn btn-primary btn-sm m-2" onClick={this.handleAddTodo}>Add </button>

                {this.state.todos.map((todo, index) =>
                (
                    <h6 key={index} onDoubleClick={() => this.setEditMode(index)} >
                        {this.renderTodoItem(todo, index)}
                    </h6>
                ))}
            </>);
    }
}

export default Todo;