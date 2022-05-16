import React from 'react';
import './Signin.css';

const initialState = {
    signInEmail: '',
    signInPassword: '',
    errorMessage: '',
    feedbackMessage: ''
}

class Signin extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmitSignIn = () => {

        //check if @ is in email
        if (this.state.signInEmail.length > 0 && !this.state.signInEmail.includes('@')){
            this.setState({errorMessage: "Invalid email format."});
            return;
        }
        //Check if any field is empty
        else if(this.state.signInEmail === '' || this.state.signInPassword === ''){
            this.setState({errorMessage: "Invalid submission."});
            return;
        }

        this.setState({feedbackMessage: "Logging in..."});

        fetch(`https://pure-ravine-89852.herokuapp.com/signin`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                this.setState(initialState);

                if (user.id){         
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else {
                    this.setState({errorMessage: "Wrong email or password"});
                }
            })
    }

    render(){

        const {onRouteChange} = this.props;

        if (this.state.feedbackMessage.length > 0)
        {
            return (
                <article className="signin-box br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <p className='logging-in-message flash'>{this.state.feedbackMessage}</p>
                            </fieldset>
                        </div>
                    </main>
                </article>
            )
        }
        else
            return (

                <article className="signin-box br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="center f4 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                                </div>      
                            </fieldset>

                            {this.state.errorMessage.length > 0 ? 
                                <div>
                                    <p className='feedback-message flash'>{this.state.errorMessage}</p>
                                </div> 
                                : <div></div>
                            }

                            <div className="">
                                <input 
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in" 
                                />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            );
    }
}

export default Signin;