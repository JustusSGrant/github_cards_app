/* eslint-disable no-undef */
import React from 'react';
import axios from 'axios';
import './App.css';

const testData =  [
  { 
    name: "Dan Abarov", 
    avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", 
    company: "facebook" 
  },
  {
    name: "Sophie Alpert",
    avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "facebook"
  },
  {
    name: "Sebastian Markbåge",
    avatar_url: "https://avatars0.githubusercontent.com/u/6348?v=4",
    company: "facebook"
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profiles: testData
    }
  }

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }));
  }
  
  render() {
    return (
      <div className="header">
        <h1>{this.props.title}</h1>
        <Form onSubmit={ this.addNewProfile }/>
        <CardList profiles={ this.state.profiles }/>
      </div>
    )
  }
}

const CardList = (props) => (
  <div>
    { props.profiles.map(profile => <Card {...profile} key={ profile.name }/>) }
  </div>
);

class Card extends React.Component {
  render() {
    return (
      <div className="github-profile" style={{ margin: '1rem' }}>
        <img className="profile-pic" src={ this.props.avatar_url } alt="placeholder" style={{ maxWidth: '150px' }}/>
        <div className="info" style={{ display: 'inline-block', marginLeft: 10 }} >
          <div className="name" style={{fontSize: '125% '}} >{ this.props.name }</div>
          <div className="company">{ this.props.company }</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state  = {
    userName: ""
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input 
          type="text" 
          placeholder="Github Username"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          required 
        />
        <button>Add Card </button>
      </form>
    )
  }
}

export default App;
