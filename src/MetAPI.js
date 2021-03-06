import './MetAPI.css';
import React from 'react';
import axios from 'axios';
// import ProgressiveImage from 'react-progressive-image';
import useProgressiveImage from './useProgressiveImage';

export default class MetAPI extends React.Component {
    state = {
        primaryImage: '',
        accessionNumber: '',
        title: '',
        season: null,
        primaryImageSmall: '',
    };

    async componentDidMount(props) {
        const season = this.props.season;
        // console.log(season);
        const [response] = await Promise.all([
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${season}`
            ),
        ]);
        const objectIDs = response.data.objectIDs;
        const randomObject =
            objectIDs[Math.floor(Math.random() * objectIDs.length)];
        // console.log(randomObject);
        // console.log(season);
        const artObject = await axios.get(
            'https://collectionapi.metmuseum.org/public/collection/v1/objects/' +
                randomObject
        );

        this.setState({
            primaryImage: artObject.data.primaryImage,
            primaryImageSmall: artObject.data.primaryImageSmall,
            title: artObject.data.title,
            accessionNumber: artObject.data.accessionNumber,
            artistDisplayName: artObject.data.artistDisplayName,
            creditLine: artObject.data.creditLine,
            objectURL: artObject.data.objectURL,
        });
        console.log('hello', this.state.primaryImageSmall);
        // console.log(src);
    }
    render() {
        return (
            <div
                className='primary-image'
                style={{
                    backgroundImage: `url(${this.state.primaryImage})`,
                }}
            >
                <a
                    href={this.state.objectURL}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <div className='art-info'>
                        {/* <h1>{this.state.title.substring(0, 128) + '...'}</h1> */}
                        <h1>
                            {this.state.title.length < 40
                                ? this.state.title
                                : this.state.title.substring(0, 40) + '...'}
                        </h1>
                        <p>{this.state.accessionNumber}</p>
                    </div>
                </a>
                <br />
            </div>
        );
    }
}
