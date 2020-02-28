                <div className="add_admin_box"> 
                    <h1 className="search_form_title">Add Admin</h1>
                    <div className="search_admin_form">
                        <SearchAdminForm
                            adminName={this.state.adminName}
                            handleSearch={this.handleSearchInput}
                            filterAdmininistrators={() => filterAdmininistrators(this)}
                        />
                    </div>
                </div> 

                <div className="remove_admin_box"> 
                    <h1 className="search_form_title">Remove Admin</h1>
                    <div className="search_admin_form">
                        <SearchAdminForm
                            adminName={this.state.adminName}
                            handleSearch={this.handleSearchInput}
                            filterAdmininistrators={() => filterAdmininistrators(this)}
                        />
                    </div>
                </div>