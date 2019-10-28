import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, FormGroup, Label, Input, Form, Row, Col } from "reactstrap";
import { compose } from "recompose";
import { withFirebase } from "../Components/Firebase";
import "./Login.css";

const Login = () => (
    <div>
        <h5 className="text-center">Login to your account</h5>
        <LoginForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class LoginFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase.doSignInWithEmailAndPassword(email, password).then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.goBack();
        })
        .catch(error => {
            this.setState({ error });
        });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <div className="Login">
                <form onSubmit={this.onSubmit}>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup controlId="email" bsSize="medium">
                                    <Label>Email</Label>
                                    <Input
                                      id = "email"
                                      autoFocus
                                      name="email"
                                      type="text"
                                      value={email}
                                      onChange={this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup controlId="password" bsSize="medium">
                                    <Label>Password</Label>
                                    <Input
                                      id = "password"
                                      name="password"
                                      value={password}
                                      onChange={this.onChange}
                                      type="password"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button id = "submitB" bsSize="medium" disabled={isInvalid} type="submit">
                                Login
                            </Button>
                            {error && <p id="err">{error.message}</p>}
                            <br />
                            <p id="signup"><Link to ='/forgotpassword'>Forgot Password?</Link></p>
                            <p id="signup">Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                        </div>
                    </Form>
                </form>
            </div>
        );
    }
}

const LoginForm = compose(
    withRouter,
    withFirebase,
)(LoginFormBase);
export default Login;
export { LoginForm };
