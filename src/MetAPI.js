import './MetAPI.css';
import React from 'react';
import axios from 'axios';

export default class MetAPI extends React.Component {
    state = {
        primaryImage: '',
        accessionNumber: '',
        title: '',
        artistDisplayName: '',
        creditLine: '',
        objectURL: '',
    };

    async componentDidMount(props) {
        const [response] = await Promise.all([
            axios.get(
                `https://collectionapi.metmuseum.org/public/collection/v1/search?q=winter`
            ),
        ]);
        const objectIDs = response.data.objectIDs;
        const randomObject =
            objectIDs[Math.floor(Math.random() * objectIDs.length)];
        console.log(randomObject);
        const artObject = await axios.get(
            'https://collectionapi.metmuseum.org/public/collection/v1/objects/' +
                randomObject
        );
        console.log(artObject.data.primaryImage);
        this.setState({
            primaryImage: artObject.data.primaryImage,
            title: artObject.data.title,
            accessionNumber: artObject.data.accessionNumber,
            artistDisplayName: artObject.data.artistDisplayName,
            creditLine: artObject.data.creditLine,
            objectURL: artObject.data.objectURL,
        });
    }
    render() {
        return (
            <div
                className='primary-image'
                style={{
                    backgroundImage: `url(${this.state.primaryImage})`,
                }}
            >
                {/* <img src={this.state.primaryImage} /> */}
                <p>
                    {this.state.accessionNumber}
                    <br />
                    {this.state.title}
                    <br />
                    {this.state.artistDisplayName}
                    <br />
                    {this.state.objectCreditline}
                    <br />
                    <a href={this.state.objectURL}>{this.state.objectURL}</a>
                </p>
            </div>
        );
    }
}
