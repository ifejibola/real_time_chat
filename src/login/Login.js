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

class Login extends Component {

    constructor(){
        super();
        this.state={
            email: null,
            password: null,
            loginError:'',
        }
    }

    userTyping=(type, e)=>{
        // console.log(type, e);
        switch(type){
            case 'email':
                this.setState({ email: e.target.value});
                break;
            case 'password':
                    this.setState({ password: e.target.value});
                break;
            default:
                break;
        }
    }
    submitLogin = async (e)=>{
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{
            this.props.history.push('/dashboard');
        }, err=>{
            this.setState({ loginError: 'Server Error'});
            console.log(err);
        })

        e.preventDefault();
        // console.log('submitting', this.state)
    }
    render() {
        const {classes} = this.props;

        return (
            <main className ={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography  component='h1' variant='h5'>
                        Login
                    </Typography>

                    <form className={classes.form} onSubmit={(e)=> this.submitLogin(e)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-email-input'>Enter your Email</InputLabel>
                            <Input autoComplete='email' autoFocus id='login-email-input' onChange={(e)=>this.userTyping('email', e) }></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-password-input'>Enter Your Passowrd</InputLabel>
                            <Input type='password' id='login-password-input' onChange={(e)=>this.userTyping('password', e) }></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Login</Button>
                    </form>
                    {
                        this.state.loginError ?
                        <Typography className={classes.errorText} component='h5' variant='h6'>
                            Incorrect Login Information
                        </Typography>:
                        null
                    }
                    <Typography component='h5' variant='h6' className={classes.noAccountHeader}>Don't have a account?</Typography>
                    <Link className={classes.signUpLink} to='/signup'>SignUp!</Link>
                </Paper>
            </main>
        );
    }

}

export default withStyles(styles)(Login);