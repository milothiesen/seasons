import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import Footer from './Footer';
import MetAPI from './MetAPI';

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
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Spinner message='Please accept location request' />;
    }

    // react says that we have to define render!!
    render() {
        return (
            <div>
                <div className='wrapper'>
                    <MetAPI
                        primaryImage={this.state.primaryImage}
                        // title={this.state.title}
                        style={{
                            backgroundImage: `url(${this.state.primaryImage})`,
                        }}
                    />
                    {/* {this.renderContent()} */}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
