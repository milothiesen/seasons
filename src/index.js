import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay2 from './SeasonDisplay2';
import Spinner from './Spinner';
import Footer from './Footer';

class App extends React.Component {
    state = { lat: null, errorMessage: '' };
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ lat: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message })
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            // return <MetAPI />;
            return <SeasonDisplay2 lat={this.state.lat} />;
        }

        return <Spinner message='Please accept location request' />;
    }

    // react says that we have to define render!!
    render() {
        return (
            <div className='container'>
                <div className='wrapper'>{this.renderContent()}</div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
