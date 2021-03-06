import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';
import * as authActions from '../actions/authActions';

class SignIn extends Component {

  static propTypes = {
    welcomePage: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.welcomePage || '',
      password: ''
    };
  }
  componentDidMount() {
    if (this.state.username.length) {
      this.refs.passwordInput.getInputDOMNode().focus();
    } else {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
  }
  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    if (this.state.username.length < 1) {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      var userObj = {
        username: this.state.username,
        password: this.state.password
      };
      dispatch(authActions.signIn(userObj))
      this.setState({ username: '', password: ''});
    }
  }
  render() {
    return (
      <div>
        <header style={{display: 'flex', justifyContent: 'center', background: '#000000', color: '#FFFFFF', flexGrow: '0', order: '0'}}>
          Войти в чат
        </header>
        <main style={{display: 'flex', justifyContent: 'center'}}>
          <form onSubmit={::this.handleSubmit}>
            <Input
              label="Имя пользователя"
              ref="usernameInput"
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={this.state.username}
              onChange={::this.handleChange}
            />
            <Input
              label="Пароль"
              ref="passwordInput"
              type="password"
              name="password"
              placeholder="Пароль"
              value={this.state.password}
              onChange={::this.handleChange}
            />
            <Button
              bsStyle="success"
              style={{width: '100%', height: '4rem', marginTop: '2rem'}} name="submitButton"
              type="submit" >
                <p style={{color: 'white', margin: '0', padding: '0', fontSize: '1.5em'}} >Войти</p>
            </Button>
          </form>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      welcomePage: state.welcomePage,
  }
}
export default connect(mapStateToProps)(SignIn)
