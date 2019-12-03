import React, { Component } from "react";
import PasswordChangeForm from "../../Components/PasswordChange";
import { AuthUserContext, withAuthorization } from '../../Components/Session';
import { Button } from 'reactstrap';
import firebase from 'firebase/app';
import axios from 'axios';

class MyAccount extends Component {
    state = {
      subs: [],
      isSubscribed: false,
    };

    check = () => {
      var email = firebase.auth().currentUser.email;
      console.log(email);
      var list = [];
      axios.get('/api/signup/sublist')
        .then(function (response) {
            response.data.data.forEach((s) => {
                list.push(s.email);
            })
        })
        .then(() => {
            this.setState({ subs: list });
        })
        .catch(function (error) {
            console.log(error);
        });

      console.log(list);
      var issub = this.state.subs.includes(email);
      console.log(issub);
      return issub;
    }

    onSubscribe = () => {
        var email = firebase.auth().currentUser.email;
        axios.post('/api/signup/newsub', {
            email: email,
        });
        this.check();
        this.forceUpdate();
    }

    onUnsubcribe = () => {
        var email = firebase.auth().currentUser.email;
        axios.delete('/api/signup/unsub', {
            email: email,
        });
        this.check();
        this.forceUpdate();
    }

    render() {
        return (
          <div>
            <AuthUserContext.Consumer>
              {authUser => (
                <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordChangeForm />
                </div>
              )}
            </AuthUserContext.Consumer>
            <br />
            <div className="text-center">
                <h3>Mailing list</h3>
                <AuthUserContext.Consumer>
                    {authUser =>
                      !this.check()
                          ? <Button className="subscribe" size="md" onClick={this.onSubscribe}>
                              Subscribe to receive daily notifications
                            </Button>
                          : <Button className="subscribe" size="md" onClick={this.onUnsubcribe}>
                              Unsubcribe to stop receiving daily notifications
                            </Button>
                    }
                </AuthUserContext.Consumer>
            </div>
          </div>
        );
    }
}
const condition = authUser => !!authUser;
export default withAuthorization(condition)(MyAccount);
