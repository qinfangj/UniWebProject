import React from 'react';
import pagesCss from './pages.css';
import Layout from '../components/Layout';


class App extends React.Component {

    render() {
        return (
            <Layout className={pagesCss.content}>

                {this.props.children}

            </Layout>
        );
    }

}

export default App;