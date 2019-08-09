import React, { Component } from 'react'
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatView extends Component {

    componentDidUpdate = () =>{
        const container = document.getElementById('chat-view-container');
        if(container)
            container.scrollTo(0, container.scrollHeight);
    }
    render() {
        const {classes, chat, user} = this.props;

        if(chat === undefined){
            return(<main id='chat-view-container' className={classes.content}></main>)
        }else{
            return(
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {chat.users.filter(_usr => _usr !== user)[0]}
                    </div>
                    <main id="chat-view-container" className={classes.content}>
                        {
                            chat.messages.map((_msg, _index) =>{
                                return(
                                    <div key={_index} className={_msg.sender === this.props.user ? classes.userSent : classes.friendSent }>
                                        {_msg.message}
                                    </div>
                                )
                            })
                        }
                    </main>
                </div>
            )
        }
    }
}

export default withStyles(styles)(ChatView);