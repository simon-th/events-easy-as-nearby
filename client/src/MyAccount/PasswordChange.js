import React, { Component } from "react";
import { withFirebase } from "../Components/Firebase";
import { Button, FormGroup, Label, Input, Form, Row, Col, UncontrolledPopover, PopoverBody } from "reactstrap";
import "./PasswordChange.css";

const INITIAL_STATE = {
    passwordOne: "",
    passwordTwo: "",
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;
        this.props.firebase.doPasswordUpdate(passwordOne).then(() => {
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
        const { passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

        return (
            <div className="PasswordChange">
                <h3 className="text-center">Change Password</h3>
                <form onSubmit={this.onSubmit}>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup controlId="password" bsSize="medium">
                                    <Label>New Password</Label>
                                    <Input
                                        autoFocus
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
                                <FormGroup controlId="confirmpassword" bsSize="medium">
                                    <Label>Confirm New Password</Label>
                                    <Input
                                        name="passwordTwo"
                                        value={passwordTwo}
                                        onChange={this.onChange}
                                        type="password"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button id="change" bsSize="medium" disabled={isInvalid} type="submit">
                                Change Password
                            </Button>

                            <UncontrolledPopover placement="right" target="change">
                                <PopoverBody>Check your email for link to reset password</PopoverBody>
                            </UncontrolledPopover>
                            {error && <p id="err">{error.message}</p>}
                        </div>
                    </Form>
                </form>
            </div>
      );
    }
}
export default withFirebase(PasswordChangeForm);
