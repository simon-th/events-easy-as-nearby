import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, FormGroup, Label, Input, Form, Row, Col } from "reactstrap";
import { compose } from 'recompose';
import { withFirebase } from "../Components/Firebase";
import axios from "axios";
import "./Signup.css";

const SignUp = () => (
    <div>
        <h5 className="text-center">Create an account</h5>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser => {
            axios.post('/api/signup/newuser', {
                username: username,
                email: email,
            });
            this.setState({ ...INITIAL_STATE });
            this.props.history.push("/");
        })
        .catch(error => {
            this.setState({ error });
        });
        event.preventDefault();

        
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="Signup">
                <form onSubmit = {this.onSubmit}>
                    <Form>
                          <Row>
                              <Col>
                                  <FormGroup controlId="username" bsSize="medium">
                                      <Label>Username</Label>
                                      <Input
                                        id = "username"
                                        autoFocus
                                        name="username"
                                        type="username"
                                        value={username}
                                        onChange={this.onChange}
                                      />
                                  </FormGroup>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <FormGroup controlId="email" bsSize="medium">
                                      <Label>Email</Label>
                                      <Input
                                        id = "email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={this.onChange}
                                      />
                                  </FormGroup>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <FormGroup controlId="passwordOne" bsSize="medium">
                                      <Label>Password</Label>
                                      <Input
                                        id = "passwordOne"
                                        name="passwordOne"
                                        value={passwordOne}
                                        onChange={this.onChange}
                                        type="password"
                                      />
                                  </FormGroup>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <FormGroup controlId="passwordTwo" bsSize="medium">
                                      <Label>Confirm Password</Label>
                                      <Input
                                        id = "passwordTwo"
                                        name="passwordTwo"
                                        value={passwordTwo}
                                        onChange={this.onChange}
                                        type="password"
                                      />
                                  </FormGroup>
                              </Col>
                          </Row>
                          <div className="text-center">
                              <Button id = "submitB" bsSize="medium" disabled={isInvalid} type="submit">
                                Submit
                              </Button>
                              {error && <p id="err">{error.message}</p>}
                              <br />
                              <p id="login">Already have an account? <Link to='/login'>Login</Link></p>
                          </div>
                    </Form>
                </form>
            </div>
        )
    }
}
const SignUpLink = () => (
    <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
);

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

export default SignUp;
export { SignUpForm, SignUpLink };
