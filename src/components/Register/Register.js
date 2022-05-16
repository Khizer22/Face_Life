import React from 'react';
import './Register.css';

const initialState = {
    email: '',
    password: '',
    name: '',
    errorMessage: '',
    feedbackMessage: ''
}

class Register extends React.Component{

    constructor(props){
        super(props);
        this.state = initialState;
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onSubmitSignIn = () => {

        console.log(this.state);

        //check if @ is in email
        if (this.state.email.length > 0 && !this.state.email.includes('@')){
            this.setState({errorMessage: "Invalid email format."});
            return;
        }
        //Check if any field is empty
        else if(this.state.email === '' || this.state.password === '' || this.state.name === ''){
            this.setState({errorMessage: "Invalid submission."});
            return;
        }

        this.setState({feedbackMessage: "Registering..."});

        fetch('https://pure-ravine-89852.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
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
                    this.setState({errorMessage: "Unable to register."});
                }
            })
    }

    render(){

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
                                <legend className="center f4 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input onChange={this.onNameChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                                </div>
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

                                {this.state.errorMessage.length > 0 ? 
                                <div>
                                    <p className='feedback-message flash'>{this.state.errorMessage}</p>
                                </div> 
                                : <div></div>
                                }

                            </fieldset>
                            <div className="">
                                <input 
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Register" 
                                />
                            </div>
                        </div>
                    </main>
                </article>
            )
    }
}

export default Register;