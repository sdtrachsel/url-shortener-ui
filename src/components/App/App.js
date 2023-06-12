import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
      .then(data => {
        console.log('tocopy',data)
        this.setState({ urls: data.urls })
      })
      .catch(err => {
        console.log(err)
      })

  }

  addUrl = (newUrl) => {
    this.setState(prevState => ({
      urls: [...prevState.urls, newUrl]
    }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl} />
        </header>
        <UrlContainer urls={this.state.urls} />
      </main>
    );
  }
}

export default App;
