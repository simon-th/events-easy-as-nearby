import React, { Component } from "react";
import PasswordChangeForm from "./PasswordChange";
import { AuthUserContext, withAuthorization } from '../Components/Session';
import axios from "axios";

class MyAccount extends Component {
    constructor(props) {
        super(props);
    };


    render() {
        return (
            <AuthUserContext.Consumer>
              {authUser => (
                <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordChangeForm />
                </div>
              )}
            </AuthUserContext.Consumer>
        );
    }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(MyAccount);
