import React from 'react';
import Button from '@material-ui/core/Button';

import './styles.css';

const debug = console.log;

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        
        const now = new Date();
        const displayMonth = props.displayMonth || now.getMonth();
        const displayYear = props.displayYear || now.getFullYear();
        const displayDate = new Date(displayYear, displayMonth, 1, 2);

        debug(displayDate);
              
        this.state = {
            today: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 2),
            displayDate,
        };

        this.changeMonth = this.changeMonth.bind(this);
    }

    changeMonth(diff) {
        const { displayDate } = this.state;

        displayDate.setMonth(displayDate.getMonth() + diff);

        this.setState({ displayDate });
    }

    render() {
        const firstDayNum = date => {
            const nd = new Date(date.getTime());
            nd.setDate(1);
            return nd.getDate() - nd.getDay();
        }
        
        // returns a Date object pointing to the first day
        // that should be displayed in the calendar
        //
        // @param date: const Date
        const firstDayOfWeek = (date) => {
            const newDate = new Date(date.getTime());
            newDate.setDate(firstDayNum(date));
            return newDate;
        };

        // number of weeks needed to display the calendar
        // for a particular month
        //
        // @param date: const Date
        const numWeeks = (date) => {
            const isLeap = date => {
                const year = date.getFullYear();
                return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
            };
            const numDays = [31, isLeap(date) ? 29 : 28, 31, 30, 31, 30,
                             31, 31, 30, 31, 30, 31];
            
            return Math.ceil((numDays[date.getMonth()] - firstDayNum(date)) / 7);
        };
        
        return (
            <div className='calendar'>
                <div className='calendar__button_container'>
                    <Button className='calendar__button_left'
                            variant='outlined'
                            color='primary'
                            onClick={ () => this.changeMonth(-1) }> {'<'} </Button>
                    <Button className='calendar__button_right'
                            variant='outlined'
                            color='primary'
                            onClick={ () => this.changeMonth(+1) }> {'>'} </Button>
                </div>
                <div className='calendar__container'>
                    <table>
                        <tbody>
                            <tr className='calendar__title'>
                                <th colspan='7' className='calendar__title'>
                                    { monthNames[this.state.displayDate.getMonth()] }&nbsp;
                                    { this.state.displayDate.getFullYear() }</th>
                            </tr>
                            <tr className='calendar__header'>
                                <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
                                <th>Thu</th><th>Fri</th><th>Sat</th>
                            </tr>
                            {
                                Array(numWeeks(this.state.displayDate)).fill(0)
                                .map((_, week) =>
                                     <tr className='calendar__week' key={ week }>
                                         {
                                             [0, 1, 2, 3, 4, 5, 6].map(day => {
                                                 debug('w=', week);
                                                 const d = new Date(this.state.displayDate.getTime());
                                                 debug('d=', d);
                                                 const dayCode = firstDayNum(d) + week * 7 + day;
                                                 d.setDate(dayCode);

                                                 const isDisplayMonth = d.getMonth() === this.state.displayDate.getMonth();
                                                 const isToday = d.getMonth() === this.state.today.getMonth()
                                                       && d.getFullYear() === this.state.today.getFullYear()
                                                       && d.getDate() === this.state.today.getDate();
                                                 const classes = 'calendar__day'
                                                       + (isDisplayMonth ? '' : ' calendar__day_inactive')
                                                       + (isToday ? ' calendar__day_today' : '');

                                                 return (<td key={ dayCode }
                                                       className={ classes }>
                                    { d.getDate() }
                                </td>);
                                             })
                                         }
                                     </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

export default Calendar;
