export const filterStudents = search => {

    const student = {
        name: search.state.studentName,
        university: search.state.studentUniversity,
        course: search.state.studentCourse
    };


    const newlyFilteredStudents = search.state.students.filter(s => {
        return (s.studentName === student.name &&
            s.studentUniversity === student.university &&
            s.studentCourse === student.course) ||
            (student.name === "" && student.university === "" && student.course === "") ||
            (s.studentName === student.name) ||
            (s.studentCourse === student.course) ||
            (s.studentUniversity === student.university);
    });

    search.setState({
        filteredStudents: newlyFilteredStudents
    });

};
