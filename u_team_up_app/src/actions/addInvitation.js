export const addInvitations = search => {

    const invitation = {
        name: search.state.studentName,
    };

    const newlyFilteredInvitations = search.state.invitations;
    newlyFilteredInvitations.push({studentName: invitation.name, studentId: "7", invitationStatus: "Pending"});

    search.setState({
        filteredInvitations: newlyFilteredInvitations
    });

};