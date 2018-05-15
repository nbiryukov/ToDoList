import React, { Component } from 'react';
import style from './Header.css'


export default class Header extends Component {

    constructor(props) {
        super(props)
    }


    transitionToAuth = (e) => {
        e.preventDefault();
        this.props.transition('auth');
    }

    transitionToMain = (e) => {
        e.preventDefault();
        this.props.transition('main');
    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        var elem;
        if (Object.keys(this.props.user).length === 0) {
            elem = <a className={style.logo} href="" onClick={this.transitionToAuth}>Авторизация</a>;
        } else {
            elem = <div><a className={style.logo}>{this.props.user.login}</a>
                <a className={style.logo} href="" onClick={this.logout}>Выйти</a></div>;
        }
        return (
            <div className={style.header}>
                <a className={style.logo} href="" onClick={this.transitionToMain}>TODO List</a>
                {elem}
            </div>
        );
    }

}