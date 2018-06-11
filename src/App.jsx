import React, { Component } from 'react';
import style from './App.css';
import InputTask from './InputTask.jsx';
import TodoList from './TodoList.jsx';
import Header from './Header.jsx';
import Authorization from './Authorization.jsx';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      user: {},
      mainPage: true
    };
  }

  addTask = (valueTask) => {
    let todos = this.state.todos;
    todos.push({ id: new Date().getTime(), done: false, task: valueTask });
    this.setState({ todos: todos });
    if (Object.keys(this.state.user).length !== 0) {
      this.updateTodosServer(todos);
    }
  }

  deleteTask = (idTask) => {
    let newTodos = this.state.todos;
    newTodos = newTodos.filter(task => task.id != idTask);
    this.setState({ todos: newTodos });
    if (Object.keys(this.state.user).length !== 0) {
      this.updateTodosServer(newTodos);
    }
  }

  completeTask = (idTask) => {
    let newTodos = this.state.todos;
    newTodos.forEach((item, i, newTodos) => {
      if (item.id == idTask) {
        newTodos[i].done = !newTodos[i].done;
      }
    });
    this.setState({ todos: newTodos });
    if (Object.keys(this.state.user).length !== 0) {
      this.updateTodosServer(newTodos);
    }
  }

  logout = () => {
    this.setState({ user: {}, todos: [] });
  }

  auth = (user, todos) => {
    this.setState({ user: user, todos: todos, mainPage: true });
  }

  render() {

    var body;
    if (this.state.mainPage) {
      body = <div className={style.headerList}>
        <InputTask addTask={this.addTask} />
        <TodoList todos={this.state.todos} deleteTask={this.deleteTask} completeTask={this.completeTask} />
      </div>;
    } else {
      body = <div className={style.headerList} ><Authorization auth={this.auth} /></div>;
    }

    return (
      <div>
        <Header user={this.state.user} transition={this.transition} logout={this.logout} />
        {body}
      </div>
    );
  }

  transition = (where) => {
    if (where == 'main') {
      this.setState({ mainPage: true });
    } else if (where == 'auth') {
      this.setState({ mainPage: false });
    }
  }

  updateTodosServer = (todos) => {
    fetch('/api/update', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: this.state.user.login, todos: todos })
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
      if (data.ok == false) {
        alert("Не удалось обновить данные");
      }
    }).catch(error => {
      console.log(error);
    });
  }
}