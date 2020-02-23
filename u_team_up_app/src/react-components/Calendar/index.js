import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '../Input';

import './styles.css';

const debug = console.log;

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const isSameDay = (a, b) => a.getMonth() === b.getMonth()
      && a.getFullYear() === b.getFullYear()
      && a.getDate() === b.getDate();

const formatDate = d => monthNames[d.getMonth()] + ' ' + d.getDate();

const formatTime = d => d.getHours() + (d.getMinutes() ? (':' + d.getMinutes()) : '');

const formatTimeInterval = s => formatTime(s.start) + '-' + formatTime(s.end);

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
            schedule: props.schedule,
            newEventName: '',
            newEventStartTime: '',
            newEventEndTime: '',
        };
        debug(this.state.schedule);

        this.addEventCallback = this.props.addEventCallback;

        this.changeMonth = this.changeMonth.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.changeDisplayDate = this.changeDisplayDate.bind(this);
    }

    changeMonth(diff) {
        const { displayDate } = this.state;

        displayDate.setMonth(displayDate.getMonth() + diff);

        this.setState({ displayDate });
    }

    addEvent() {

        const timeRe = /^([0-9]{1,2})(?::([0-9]{1,2}))$/;
        const arr = this.state.newEventStartTime.match(timeRe);
        if (!arr) { return; }
        const arr2 = this.state.newEventEndTime.match(timeRe);
        if (!arr2) { return; }

        const y = this.state.displayDate.getFullYear();
        const m = this.state.displayDate.getMonth();
        const d = this.state.displayDate.getDate();

        const [, h1, m1] = arr;
        const [, h2, m2] = arr2;
        const start = new Date(y, m, d, h1, m1);
        const end = new Date(y, m, d, h2, m2);

        const name = this.state.newEventName;
        
        this.addEventCallback({ start, end, name });
    }

    handleChange(e) {
        e.preventDefault();

        const { name, value } = e.target;
        if (/Time$/.test(name)) {
            this.setState({ [name]: value.replace(/[^0-9:]/g, '') });
        } else {
            this.setState({ [name]: value });
        }
    }

    // @param displayDate: const Date
    changeDisplayDate(displayDate) {
        debug('display date:', displayDate);
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

        const generateCalendarDays = () =>
              Array(numWeeks(this.state.displayDate)).fill(0)
              .map((_, week) =>
                   <tr className='calendar__week' key={ week }>
                       {
                           [0, 1, 2, 3, 4, 5, 6].map(day => {
                               const d = new Date(this.state.displayDate.getTime());
                               const dayCode = firstDayNum(d) + week * 7 + day;
                               d.setDate(dayCode);

                               const isDisplayMonth = d.getMonth() === this.state.displayDate.getMonth();
                               const isToday = isSameDay(d, this.state.today);
                               const isDisplayDate = isSameDay(d, this.state.displayDate);
                               const classes = 'calendar__day'
                                     + (isDisplayMonth ? '' : ' calendar__day_inactive')
                                     + (isToday ? ' calendar__day_today' :
                                        (isDisplayDate ? ' calendar__day_display' : ''));

                               return (<td key={ dayCode }
                                           className={ classes }
                                           onClick={ () => this.changeDisplayDate(d) }>
                                           <div>
                                               <div className='calendar__date'>{ d.getDate() }</div>
                                               { this.state.schedule
                                                 .filter(s => isSameDay(s.start, d))
                                                 .sort((a, b) => a.start.getTime() - b.start.getTime())
                                                 .map(s =>
                                                      <div className='calendar__schedule'
                                                           key={s.start.getTime() + ' ' + s.end.getTime()}>
                                                          { formatTimeInterval(s) }
                                                          <div className='calendar__schedule_name'>
                                                              {s.name}
                                                          </div>
                                                      </div>)
                                               }
                                           </div>
                                       </td>);
                           })
                       }
                   </tr>);
        
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
                                <th colSpan='7' className='calendar__title'>
                                    { monthNames[this.state.displayDate.getMonth()] }&nbsp;
                                    { this.state.displayDate.getFullYear() }</th>
                            </tr>
                            <tr className='calendar__header'>
                                <th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
                                <th>Thu</th><th>Fri</th><th>Sat</th>
                            </tr>
                            { generateCalendarDays() }
                        </tbody>
                    </table>
                </div>
                { this.addEventCallback &&
                  <div className='calendar__add_event_container'>
                      <div className='calendar__add_event_line'>
                          <div className='calendar__add_event'>
                              <Input className='calendar__add_event_input'
                                     name='newEventStartTime'
                                     value={ this.state.newEventStartTime }
                                     label='Start time'
                                     onChange={ this.handleChange } />
                          </div>
                          <div className='calendar__add_event'>
                              <Input className='calendar__add_event_input'
                                     name='newEventEndTime'
                                     value={ this.state.newEventEndTime }
                                     label='End time'
                                     onChange={ this.handleChange } />
                          </div>
                          <div className='calendar__add_event'>
                              <Input className='calendar__add_event_input'
                                     name='newEventName'
                                     value={ this.state.newEventName }
                                     label='Event name'
                                     onChange={ this.handleChange } />
                          </div>
                      </div>
                      <div className='calendar__add_event_line'>
                          <div className='calendar__add_event'>
                              <span className='calendar__add_event_date'>
                                  Date: { formatDate(this.state.displayDate) }
                              </span>
                          </div>
                          <div className='calendar__add_event'>
                              <Button className='calendar__button'
                                      variant='outlined'
                                      color='primary'
                                      onClick={ this.addEvent }>
                                  Add event
                              </Button>
                          </div>
                      </div>
                  </div>
                }
            </div>
        );
    }
};

export default Calendar;
