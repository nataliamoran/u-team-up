import React from 'react';

import './styles.css';

const debug = console.log;

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        debug(this.props);
        
        return (
            <div className={'header'
                            + (this.props.className ? ' ' + this.props.className : '')}>
                <div className='header__container'>
                    { this.props.type === 'main' ?
                      <h1 className='header__title'>
                          { this.props.title }
                      </h1> : 
                      <span className='header__title'>
                          { this.props.title }
                      </span>
                    }
                    { typeof(this.props.data) !== undefined
                      && <span className='header__data'>
                             { this.props.data }
                         </span>
                    }
                </div>
                <div className='header__right'>{ this.props.children }</div>
                <div className='header__clear' />
            </div>
        );
    }
}

export default Header;
