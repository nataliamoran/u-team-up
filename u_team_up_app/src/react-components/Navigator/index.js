import React from 'react';

import Header from '../Header';
import Menu from '../Menu';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button/Button';
import './styles.css';

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            global: props.globalState,
        };
        
        this.back = this.back.bind(this);
    }

    back() {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className='navigator'>
                <div className='navigator__header_line'>
                    <div className='navigator__header_left'>
                        <Button variant='outlined'
                                color='primary'
                                onClick={ this.back }>
                            { '<<' }
                        </Button>
                    </div>
                    
                    <Header type='main' title='UTeamUp!' className='navigator__header_title'>
                        <Menu loginStatus={ this.state.global.loginStatus }
                              identity={ this.state.global.identity } />
                    </Header>
                </div>
                { this.props.children }
            </div>
        );
    }
}

export default withRouter(Navigator);
