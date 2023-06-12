import React, { Component } from 'react';
import { postUrl } from '../../apiCalls';

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    let newEntry = {
      title: this.state.title,
      long_url: this.state.urlToShorten
    }
    
    postUrl(newEntry)
      .then(data=>{
        console.log(data)
        this.props.addUrl(data)
        this.clearInputs();
      })
      .catch(err => {
        console.log(err.message)
      })
    
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  addUrl = (newEntry) => {
    this.setState({urls: [...this.state.urls, newEntry] })
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
