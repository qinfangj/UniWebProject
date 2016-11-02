import React from 'react';
import css from './pages.css';
import Layout from '../components/Layout';


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


class HomePage extends React.Component {
    render() {
        return (
            <h1>Welcome to the Lausanne Genomic Technologies Facility!</h1>
        );
    }
}


export {
    App,
    HomePage,
}