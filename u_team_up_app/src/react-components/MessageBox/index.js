import React from 'react';

import Header from '../Header';
import './styles.css';

class MessageBox extends React.Component {
    // @param props: {globalState: object}
    constructor(props) {
        super(props);

        this.state = {
            uid: props.globalState.identity.uid,
            inbox: [ // TODO: FETCH
                { type: 'notification',
                  id: '1',
                  timeSent: new Date(2020, 1, 25, 14, 45),
                  sender: 'system',
                  title: 'Appointment Notification',
                  content: 'You have a meeting in 1h.',
                  read: false,
                },
                { type: 'direct',
                  id: '2',
                  timeSent: new Date(2020, 1, 26, 3, 55),
                  sender: 'user2',
                  title: 'uwu',
                  content: 'Hello.',
                  read: true,
                },
            ],
        };
    }

    render() {
        // TODO: FETCH
        const authorized = this.props.globalState.loginStatus === 'user';

        const generateMessageView = msg => (
            <div key={ msg.id }
                 className={ 'message_box__message'
                             + (msg.read ? '' : ' message_box_message_unread') }>
                <Header type='secondary'
                        title={ `${ msg.read ? '' : '[*] ' }${msg.type} from "${msg.sender}":` }
                        data={ msg.title } />
                <div className='message_box__message_content'>
                    { msg.content }
                </div>
            </div>);

        return (
            <div className='message_box'>
                <Header type='main' title='Your messages'/>
                <div className='message_box__body'>
                    { authorized
                      ? this.state.inbox.map(generateMessageView)
                      : 'You are not allowed to visit this page. Please log in or sign up.' }
                </div>
            </div>
        );
    }
};

export default MessageBox;
