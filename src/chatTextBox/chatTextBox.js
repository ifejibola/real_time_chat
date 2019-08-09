import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatTextBox extends Component {

    constructor(){
        super();
        this.state={
            chatText:''
        };
    }

    userTyping = (e) =>{
        // console.log('User typing', e);(
        e.keyCode === 13 ? this.submitMessage() : this.setState({chatText: e.target.value});
    }
    
    //If txt isnt empty string or empty spaces messageValid return true
    messageValid = (txt) => txt && txt.replace(/\s/g, '').length

    submitMessage = () =>{
        // console.log('Submit');
        if(this.messageValid(this.state.chatText)){
            // call parent function
            this.props.submitMessageFn(this.state.chatText);
            document.getElementById('chattextbox').value='';
        }
    }
    userClickedInput = () => {

        // console.log('Clicked Input');

        this.props.messageReadFn();
    
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.chatTextBoxContainer}>
                <TextField placeholder='Type your message...'
                    onKeyUp={(e)=> this.userTyping(e)}
                    id='chattextbox'
                    className={classes.chatTextBox}
                    onFocus={this.userClickedInput}
                >
                </TextField>
                <Send onClick={this.submitMessage} className={classes.sendBtn}></Send>
            </div>
        )
    }
}


export default withStyles(styles)(ChatTextBox)