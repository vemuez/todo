import React, { Component } from 'react';
import { RIEInput } from 'riek';

import './todo-detail.css';

export class TodoDetailComponent extends Component {
    constructor() {
        super();

        this.state = {
            id: null,
            value: '',
            isComplete: false
        };
    }

    componentWillMount = () => {
        const { todo } = this.props;

        if (!todo) {
            return;
        }

        this.setState({ ...todo });
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    handleAdd = () => {
        const { onAdd } = this.props;

        if (!onAdd) {
            return;
        }

        onAdd(this.state.value);
        this.setState({ value: '' });
    }

    handleUpdate = (item) => {
        const { onUpdate } = this.props;

        if (!onUpdate) {
            return;
        }

        const compareAndUpdate = () => {
            const { todo } = this.props;
            const { id, value, isComplete } = this.state;

            let todoItem = {};

            if (todo.value === value && todo.isComplete === isComplete) {
                return;
            }

            if (todo.value !== value) {
                todoItem.value = value;
            }

            if (todo.isComplete !== isComplete) {
                todoItem.isComplete = isComplete;
            }

            onUpdate(id, todoItem);
        }

        this.setState({ ...item }, () => compareAndUpdate());
    }

    handleDelete = () => {
        const { onDelete } = this.props;

        if (!onDelete) {
            return;
        }

        onDelete(this.state.id);
    }

    _handleKeyPress = (event, callback) => {
        if (event.key !== 'Enter') {
            return;
        }

        callback();
    }

    render = () => {
        const { id, value, isComplete } = this.state;

        if (!id) {
            return (
                <div className="todo-detail add row">
                    <div className="input-field col s12">
                        <input id="todo_add"
                            type="text"
                            value={value}
                            onChange={this.handleChange}
                            onKeyPress={((e) => this._handleKeyPress(e, this.handleAdd))} />

                        <label htmlFor="todo_add">Todo item</label>
                    </div>

                    <a className="btn add waves-effect green accent-4"
                        onClick={this.handleAdd}><i className="material-icons">add</i></a>
                </div>
            );
        }


        return (
            <div className="todo-detail update row">
                <RIEInput value={value}
                          propName='value'
                          change={this.handleUpdate} />

                <a className="btn check waves-effect light-blue lighten-1"
                   onClick={(() => this.handleUpdate({ isComplete: !isComplete }))}><i className="material-icons">{ isComplete ? 'check_box' : 'check_box_outline_blank' }</i></a>
                <a className="btn delete waves-effect red accent-2"
                    onClick={this.handleDelete}><i className="material-icons">delete</i></a>
            </div>
        );
    }
}