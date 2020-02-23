import React from 'react';

import Header from '../Header';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import './styles.css';

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
        };
    }

    render() {
        return (
            <div className='navigator'>
                <div className='navigator__header_line'>
                    <Header type='main' title='UTeamUp!' className='navigator__header_title'>
                        <div className='navigator__auth_button_container'>
                            {
                                this.state.global.loginStatus === 'guest' ?
                                <Link className='navigator__auth_link' to='/'>
                                    <Button variant='outlined' color='primary'>Log in</Button>
                                </Link> :
                                <Link className='navigator__auth_link' to='/'>
                                    <Button variant='outlined' color='primary'>Log out</Button>
                                </Link>
                            }
                        </div>
                    </Header>
                </div>
                { this.props.children }
            </div>
        );
    }
}

export default Navigator;
