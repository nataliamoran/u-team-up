import React from "react";

import "./styles.css";

class AdministratorPreview extends React.Component {
    render() {
        const { administratorPreview } = this.props;
        console.log(administratorPreview);
        if (administratorPreview.adminId === "7") {
            console.log(administratorPreview.adminName);
        }

        return (
            <div id="wrapper10">
                <div className="administrator-preview__bg-image10">
                    <table className="administrator-preview10">
                        <tr key={administratorPreview.adminId}>
                            <td className="name_cell10">
                                {administratorPreview.adminName}
                            </td>
                            <td className="email_cell10">
                                {administratorPreview.adminEmail}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default AdministratorPreview;
