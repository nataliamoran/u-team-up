import React from "react";

import "./styles.css";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {Link} from "react-router-dom";


class TeamMemberPreview extends React.Component {

    render() {
        const {teamMemberPreview} = this.props;
        console.log("Team Member Preview")
        console.log(teamMemberPreview)

        const name = teamMemberPreview.fullname || teamMemberPreview._id;

        const photo =
            <img className="team_member__photo"
                 src={teamMemberPreview.imageUrl || require('./static/account.png')}
                 alt={ `${name} avatar` } />;

        const university = teamMemberPreview.university;

        return (
            <div className="team-member-preview">
                <div className='team-member-preview__info-row'>
                    <Link className="team_page__link"
                          to={'/student-profile/' + teamMemberPreview._id}>
                        {photo}
                    </Link>
                </div>
                <div className='name_cell team-member-preview__info-row'>
                    <Link className="team_page__link"
                          to={'/student-profile/' + teamMemberPreview._id}>
                        {name}
                    </Link>
                </div>
                <div className='university_cell team-member-preview__info-row'>
                    {university}
                </div>
                { typeof(this.props.append) === 'function'
                  && <div>{ this.props.append(teamMemberPreview) }</div> }
            </div>
        );
    }
}


export default TeamMemberPreview;
