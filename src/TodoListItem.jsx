import React, { Component } from 'react';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import { Checkbox } from 'material-ui'
import style from './TodoListItem.css'

export default class TodoListItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let styleTaskText = this.props.task.done ? style.taskChecked : style.task;
        return (
            <div className={style.item}>
                <Checkbox className={style.checkbox} 
                    color="primary"
                    onChange={() => { this.props.completeTask(this.props.task.id) }}
                    checked={this.props.task.done} />
                <label className={styleTaskText}>
                    {this.props.task.task}
                </label>
                <IconButton className={style.button}
                    aria-label="Delete"
                    onClick={(e) => this.props.deleteTask(this.props.task.id)}>
                    <DeleteIcon />
                </IconButton >
            </div>
        );
    }
} 