export const filterStudents = search => {

    const student = {
        name: search.state.studentName,
        university: search.state.studentUniversity,
        course: search.state.studentCourse
    };


    const newlyFilteredStudents = search.state.students.filter(s => {
        return (s.name === student.name &&
            s.university === student.university &&
            s.course === student.course) ||
            (student.name === "" && student.university === "" && student.course === "") ||
            (s.name === student.name) ||
            (s.course === student.course) ||
            (s.university === student.university);
    });

    search.setState({
        filteredStudents: newlyFilteredStudents
    });

};
