"use strict";
import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.css';
import cx from 'classnames';
import { Dropdown, Button, FormControl } from 'react-bootstrap/lib';
import Icon from 'react-fontawesome';



class MultiCopyDropdown extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {open: false};
        this.onToggle = this.onToggle.bind(this);
        this.copy = this.copy.bind(this);
    }

    static propTypes = {
        rowIndex: PropTypes.number.isRequired,
        copyRowNtimes: PropTypes.func.isRequired,
    };

    onToggle() {
        // if (document.activeElement !== this.input) {   // use the ref?
        //     this.setState({open: !this.state.open});
        // }
        this.setState({ open: !this.state.open });
    }

    copy(ncopies) {
        this.props.copyRowNtimes(this.props.rowIndex, ncopies);
        this.setState({ open: false });
    }

    render() {
        return (
            <Dropdown className={css.dropdown} id={1} onToggle={this.onToggle} open={this.state.open} >
                <CustomToggle bsRole="toggle" >
                    <Icon className={css.copyNtimesButton} name="clone" />
                    <span className={css.copyNtimesNumber}>9</span>
                </CustomToggle>
                <CustomMenu bsRole="menu" copy={this.copy} />
            </Dropdown>
        );
    }
}


class CustomToggle extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }
    render() {
        return (
            <a href="" onClick={this.handleClick}>
                {this.props.children}
            </a>
        );
    }
}


class CustomMenu extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = { value: "" };
        this.onChange = this.onChange.bind(this);
        this.send = this.send.bind(this);
    }

    send(e) {
        if (e.type === 'keypress') {
            let keyCode = e.keyCode || e.which;
            if (keyCode !== 13){  // 'Enter' key
                return;
            }
        }
        let ncopies = parseInt(this.state.value);
        this.props.copy(ncopies);
        this.setState({ value: "" });
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div className={cx("dropdown-menu", css.dropdownMenu)}>
                <FormControl
                    className={css.multiCopyInput}
                    ref={c => { this.input = c; }}
                    type="number"
                    onChange={this.onChange}
                    onKeyPress={this.send}
                    value={this.state.value}
                />
                <Button
                    className={css.multiCopyOkButton}
                    bsStyle="primary"
                    onClick={this.send}>
                    OK
                </Button>
            </div>
        );
    }
}



export default MultiCopyDropdown;


