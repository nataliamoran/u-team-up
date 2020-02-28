import React from "react";
import ReactDOM from "react-dom";
import { Container, Header, List } from "semantic-ui-react";

import "./styles.css";

import AdministratorPreviewList from "./../AdministratorPreviewList";

import SearchAdminForm from "./../SearchAdminForm";
import AddAdminForm from "./../AddAdminForm";

import Menu from "./../Menu";

import { addAdmins } from "../../actions/searchAdmin";
import { filterAdmins } from "../../actions/searchAdmin";

class AdminDashboard extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
        	adminId: "",
            adminName: "",
	        adminEmail: "",
            adminId1: "",
            adminName1: "",
            adminEmail1: "",
	        administrators: [ // TODO: FETCH
                { adminName: "Paul McCartney", adminId: "1", adminEmail: "paul@gmail.com" },
                { adminName: "George Harrison", adminId: "2", adminEmail: "george@gmail.com" },
                { adminName: "Ringo Starr", adminId: "3", adminEmail: "ringo@gmail.com" },
            	{ adminName: "John Lennon", adminId: "4", adminEmail: "john@gmail.com" }, 
            	{ adminName: "David Bowie", adminId: "5", adminEmail: "david@gmail.com" },
            	{ adminName: "Bob Dylan", adminId: "6", adminEmail: "bob@gmail.com" }
            ]
        }

        this.state.filteredAdmins = Array.from(this.state.administrators);
    }

    handleSearchInput = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSearchInput1 = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        const {adminId} = this.props;

        return (
            <div className="admin_dashboard_view">
                <div className="admin_list"> 
                    <h1 className="search_form_title">Administrators: </h1>
                    <table className="headers">
                        <tr> 
                            <td className="name">
                                <h2>Name</h2> 
                            </td>
                            <td className="email">
                                <h2>Email</h2> 
                            </td>
                        </tr> 
                    </table>
                    <AdministratorPreviewList administrators={this.state.filteredAdmins} /> 
                </div>
                <div className="remove_admin">
                    <h1 className="remove_admin_header">Remove Admin</h1>
                    <SearchAdminForm
                        adminName={this.state.adminName}
                        adminEmail={this.state.adminEmail}
                        handleSearch={this.handleSearchInput}
                        filterAdmins={() => filterAdmins(this)}
                    />
                </div>
                <div className="add_admin">
                    <h1 className="add_admin_header">Add Admin</h1>
                    <AddAdminForm
                        adminName1={this.state.adminName1}
                        adminEmail1={this.state.adminEmail1}
                        handleSearch={this.handleSearchInput1}
                        addAdmins={() => addAdmins(this)}
                    />
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
