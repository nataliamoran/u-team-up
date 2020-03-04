export const filterCourses = search => {

    const course = {
        name: search.state.courseName,
        university: search.state.courseUniversity,
    };


    const newlyFilteredCourses = search.state.courses.filter(s => {
        return !(s.courseName === course.name &&
            s.courseUniversity === course.university &&
            (course.name === "" && course.university === "") ||
            (s.courseName === course.name) ||
            (s.courseUniversity === course.university));
    });

    search.setState({
        filteredCourses: newlyFilteredCourses
    });

};

export const addCourses = search => {

    const course = {
        name: search.state.courseName1,
        university: search.state.courseUniversity1,
    };

    const newlyFilteredCourses = search.state.courses;
    newlyFilteredCourses.push({courseName: course.name, courseId: "7", courseUniversity: course.university});

    search.setState({
        filteredCourses: newlyFilteredCourses
    });

};