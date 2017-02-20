"use strict";
import React from 'react';
import css from './App.css';
import Layout from '../Layout/Layout.js';



class App extends React.Component {
    componentDidMount() {
        document.title = "UHTS LIMS Web /index";
    }
    render() {
        return (
            <Layout className={css.content}>
                {this.props.children}
            </Layout>
        );
    }
}

export default App;