import React from "react";

import "./styles.css";

/*import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
*/
class UniversityPreview extends React.Component {

    render() {
        const {universityPreview} = this.props;
        console.log(universityPreview)
        if (universityPreview.adminId === "7") {
            console.log(universityPreview.adminName)
        }

        return (
            <div id="wrapper3">
                <div className="university-preview__bg-image2">
                    <table className="university-preview2">
                            <tr key={universityPreview.universityId}>
                                <td className="name_cell2">
                                    {universityPreview.universityName}
                                </td>
                                <td className="id_cell2">
                                    {universityPreview.universityId}
                                </td>
                            </tr>
                    </table>
                </div>
            </div>
        );
    }
}


export default UniversityPreview;
