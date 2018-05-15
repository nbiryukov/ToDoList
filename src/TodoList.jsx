import React, { Component } from 'react';
import TodoListItem from './TodoListItem.jsx'
import style from './TodoList.css'

export default class TodoList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const taskList = this.props.todos.map(task =>
            <TodoListItem task={task} key={task.id}
                deleteTask={this.props.deleteTask}
                completeTask={this.props.completeTask} />)
        return (
            <div className={style.list}>
                {taskList}
            </div>
        );
    }
}   