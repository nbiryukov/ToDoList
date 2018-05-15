import React, { Component } from 'react';
import style from './Authorization.css'

export default class Authorization extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            message: ""
        };
    }

    handleChangeLogin = (e) => {
        this.setState({ login: e.target.value });
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSubmitLogin = (e) => {
        e.preventDefault();
        // TODO запрос на сервер
    }

    handleSubmitRegister = (e) => {
        e.preventDefault();
        // TODO запрос на сервер
    }

    render() {
        return (
            <form onSubmit={e => e.preventDefault()} className={style.form}>
                <label htmlFor="fname" className={style.logo} >Логин:</label>
                <input type="text" className={style.input} onChange={this.handleChangeLogin} />
                <label htmlFor="fname" className={style.logo} >Пароль:</label>
                <input type="password" className={style.input} onChange={this.handleChangePassword} />
                <input type="submit" className={style.button} onClick={this.handleSubmitLogin} value="Войти" />
                <input type="submit" className={style.button} onClick={this.handleSubmitRegister} value="Зарегистрироваться" />
                <label className={style.logo}>{this.state.message}</label>
            </form>
        );
    }
}