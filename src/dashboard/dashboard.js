import React, { Component } from 'react'
import Chat from '../chatlist/chat';
import ChatView from '../chatview/chatView';
import ChatTextBox from '../chatTextBox/chatTextBox';
import NewChat from '../newChat/newChat';
import { ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import {Button, withStyles } from '@material-ui/core';
import styles from './styles';

const firebase = require('firebase');

class DashBoard extends Component {

    constructor(){
        super();
        this.state={
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats:[]
        };
    }

    signOut = () =>{
        firebase.auth().signOut();
    }
    selectChat = async (chatIndex) =>{
        // console.log('index:', chatIndex)
        await this.setState({selectedChat: chatIndex});
        this.messageRead();
        // console.log('Selected a chat', chatIndex)
    }

    submitMessage = (msg) =>{
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat]
            .users.filter(_usr => _usr !== this.state.email)[0]);
            
        firebase.firestore()
            .collection('chats')
            .doc(docKey)
            .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                    sender: this.state.email,
                    message: msg, 
                    timestamp: Date.now(),
                }),
                receiverHasRead: false
            });
        // console.log(docKey)
    }
    buildDocKey = (friend) =>[this.state.email, friend].sort().join(':');


    newChatBtnClicked = () =>{
        this.setState({
            newChatFormVisible: true,
            selectChat: null 
        })
    }

    messageRead = () => {
        const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        if(this.clickedChatWhereNotSender(this.state.selectedChat)){
            firebase.firestore()
                .collection('chats')
                .doc(docKey)
                .update({ receiverHasRead: true})

        }else{
            console.log('Clicked message where the user was the sender')
        }
    }
    clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length -1].sender !== this.state.email;
    
    componentDidMount = () =>{
        firebase.auth().onAuthStateChanged(async _usr =>{
            if(!_usr)
                this.props.history.push('/login');
            else{
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res =>{
                        const chats = res.docs.map(_doc => _doc.data())
                        await this.setState({
                            email: _usr.email,
                            chats: chats
                        });
                        console.log(this.state);
                    })
            }
        })
    }
    render() {
        const {classes} = this.props;
        return (
            <div className='dashboard-container' id='dashboard-container'>
                <Chat history={this.props.history}
                    newChatBtnFn={this.newChatBtnClicked}
                    selectChatFn={this.selectChat}
                    chats={this.state.chats}
                    userEmail={this.state.email}
                    selectedChatIndex={this.state.selectedChat}
                >
                </Chat>
                {
                    this.state.newChatFormVisible ? 
                    null :
                    <ChatView
                        user={this.state.email}
                        chat={this.state.chats[this.state.selectedChat]}
                    ></ChatView>
                }
                {
                    this.state.selectedChat !== null && !this.state.newChatFormVisible ?
                    <ChatTextBox messageReadFn={this.messageRead} submitMessageFn={this.submitMessage}></ChatTextBox> :
                    null
                }
                {
                    this.state.newChatFormVisible ? <NewChat goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChat> : null
                }
                <Button className={classes.signOutBtn} onClick={this.signOut}>Sign Out</Button>
            </div>
            
        )
    }
}

export default withStyles(styles)(DashBoard);