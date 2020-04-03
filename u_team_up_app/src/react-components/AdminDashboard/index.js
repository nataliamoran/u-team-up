import React from "react";

import "./styles.css";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "./../Input";

import AddAdminForm from "./../AddAdminForm";
import { addAdmins } from "../../actions/searchAdmin";

import { request } from '../../actions/url';
import { SERVER_URL } from '../../config';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            admins: [],
            username: '',
            password: '',
        };

        this.updateAdmins = this.updateAdmins.bind(this);
        this.addAdmin = this.addAdmin.bind(this);
        this.removeAdmin = this.removeAdmin.bind(this);
    }

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    componentDidMount() {
        this.updateAdmins().catch(() => {});
    }

    async updateAdmins() {
        const { token } = this.props.globalState.identity;
        const { result } = await request.get(`${SERVER_URL}api/admins`, { token });
        this.setState({ admins: result });
    }

    async addAdmin() {
        const { token } = this.props.globalState.identity;
        const { username, password } = this.state;
        await request.post(`${SERVER_URL}api/admin`, { token, username, password });
        this.setState({ username: '', password: '' });
        await this.updateAdmins();
    }

    async removeAdmin(username) {
        const { token } = this.props.globalState.identity;
        await request.delete(`${SERVER_URL}api/admin`, { token, username });
        await this.updateAdmins();
    }

    render() {
        const { adminId } = this.props;
        const identity = this.props.globalState.identity;

        if (identity.type !== 'admin') {
            return "You are not allowed to visit this page.";
        }

        return (
            <div className="admin_dashboard_view">
                <h1 className="welcome_back">Welcome Back, { identity.username }!</h1>
                <div>
                    <h1 className="admin_dashboard__title">view, add, remove administrators</h1>
                    <table className="admin_dashboard_headers">
                        <tr>
                            <th>
                                <h3>Name</h3>
                            </th>
                            <th>
                                <h3>Action</h3>
                            </th>
                        </tr>
                        { this.state.admins
                          .map(a =>
                               <tr key={ a._id }>
                                   <td>{ a._id }</td>
                                   <td>
                                       <Button
                                           variant="outlined"
                                           color="primary"
                                           onClick={() => this.removeAdmin(a._id)}>
                                           Remove
                                       </Button>
                                   </td>
                               </tr>)
                        }
                    </table>

                    <div className="add_admin">
                        <h1 className="add_admin_header">Add Admin</h1>
                        <Grid className="search-form"
                              container direction="row"
                              justify="center" alignItems="center">
                           <Input
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                                label="Admin name"
                                className="name__input"
                            />

                            <Input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                label="Password"
                            />

                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={this.addAdmin}
                                className="search-form__submit-button"
                            >
                                Add
                            </Button>

                        </Grid>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
