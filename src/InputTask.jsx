import React, { Component } from 'react';
import style from './InputTask.css'

export default class Headers extends Component {

    constructor(props) {
        super(props);
        this.state = { inputValue: "" };
    }

    keyPress = (event) => {
        if (event.key == 'Enter') {
            var task = this.state.inputValue;
            task = task.trim();
            if (task.length != 0) {
                this.setState({ inputValue: "" });
                this.props.addTask(task);
            }
        }
    }

    onInput = (event) => {
        let value = event.target.value;
        this.setState({ inputValue: value });
    }

    render() {
        return (
                <input className={style.input} 
                    placeholder=" Enter task"
                    onChange={this.onInput}
                    onKeyPress={this.keyPress}
                    value={this.state.inputValue} />
        );
    }
}