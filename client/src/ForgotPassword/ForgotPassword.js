import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Components/Firebase";
import { Button, FormGroup, Label, Input, Form, Row, Col, UncontrolledPopover, PopoverBody } from "reactstrap";
import "./ForgotPassword.css"

const PasswordForget = () => (
    <div>
        <h5 className="text-center">Forgot your password?</h5>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: "",
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;
        this.props.firebase
          .doPasswordReset(email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;
        const isInvalid = email === "";

        return (
            <div className="PasswordForget">
                <form onSubmit={this.onSubmit}>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup controlId="email" bsSize="medium">
                                    <Label>Email</Label>
                                    <Input
                                      autoFocus
                                      name="email"
                                      type="text"
                                      value={this.state.email}
                                      onChange={this.onChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Button id="reset" bsSize="medium" disabled={isInvalid} type="submit">
                                Reset My Password
                            </Button>

                            <UncontrolledPopover placement="right" target="reset">
                                <PopoverBody>Check your email for link to reset password</PopoverBody>
                            </UncontrolledPopover>

                            {error && <p id="err">{error.message}</p>}

                            <br />
                            <p id="login"><Link to="/login">Return to Login</Link></p>
                        </div>

                    </Form>
                </form>
            </div>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={"/forgotpassword"}>Forgot Password?</Link>
    </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForget;
export { PasswordForgetForm, PasswordForgetLink };
