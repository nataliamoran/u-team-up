export const filterAdmins = search => {

    const admin = {
        name: search.state.adminName,
        email: search.state.adminEmail,
    };


    const newlyFilteredAdmins = search.state.administrators.filter(s => {
        return !(s.adminName === admin.name &&
            s.adminEmail === admin.email &&
            (admin.name === "" && admin.email === "") ||
            (s.adminName === admin.name) ||
            (s.adminEmail === admin.email));
    });

    search.setState({
        filteredAdmins: newlyFilteredAdmins
    });

};

export const addAdmins = search => {

    const admin = {
        name: search.state.adminName1,
        email: search.state.adminEmail1,
    };

    const newlyFilteredAdmins = search.state.administrators;
    newlyFilteredAdmins.push({adminName: admin.name, adminId: "7", adminEmail: admin.email});

    search.setState({
        filteredAdmins: newlyFilteredAdmins
    });

};