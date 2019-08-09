import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from'@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styles from './styles';
// import { style } from '@material-ui/system';
const firebase = require('firebase');
class SignUp extends Component {

    constructor(){
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signUpError: ''
        }
    }

    //Validate form 
    formIsValid = () => this.state.password === this.state.passwordConfirmation;
    userTyping = (type, e)=>{
        // console.log(type, e)

        switch(type){
            case 'email':
                this.setState({email: e.target.value });
                break;

            case 'password':
                this.setState({password: e.target.value });
                break;
            case 'passwordConfirmation':
                this.setState({passwordConfirmation: e.target.value });
                break;

            default:
                break;
        }
    }
    submitSignup = (e)=>{
        e.preventDefault();
        // console.log('Submitting..', this.state);

        //If form passwords do not match
        if(!this.formIsValid()){
            this.setState({signUpError: 'Passwords do not match!'});
            return;
        }

        // If valid authenticate with firebase auth
        firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(authRes => {
            const userObj = {
                email: authRes.user.email
            };
            //Send user object to firebase database
            firebase.firestore().collection('users')
            .doc(this.state.email)
            .set(userObj)
            .then(()=>{
                this.props.history.push('/dashboard')
            })
        }, authError =>{
            console.log(authError);
            this.setState({signUpError: 'Failed to add user'});
        }, dbError =>{
            console.log(dbError);
            this.setState({signUpError: 'Failed to add user'});
        })

    }

    render() {

        const {classes} = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper>
                    <Typography component="h1">
                        SignUp
                    </Typography>
                    <form onSubmit={(e)=> this.submitSignup(e)} className={classes.form}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-email-input'>Enter Your Email</InputLabel>
                            <Input autoComplete='email' onChange={(e)=> this.userTyping('email', e)} autoFocus id='signup-email-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-input'>Create A Password</InputLabel>
                            <Input type='password' onChange={(e)=> this.userTyping('password', e)} id='signup-password-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-confirmation-input'>Confirm Password</InputLabel>
                            <Input type='password' onChange={(e)=> this.userTyping('passwordConfirmation', e)} id='signup-password-input'></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                    </form>
                    {
                        //if there is an error with signup
                        this.state.signUpError ? 
                        <Typography className={classes.errorText} component='h5' varient='h6'>
                            {this.state.signUpError}
                        </Typography> :
                        null
                    }
                    <Typography component='h5' variant='h6' className={classes.hasAccountHeader}>Already have an Account?</Typography>
                    <Link classes={classes.logInLink} to='/login'>Log In</Link>
                </Paper>
            </main>
        )
    }
}

export default withStyles(styles)(SignUp);