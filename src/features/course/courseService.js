import axios from "/axiosConfig";

const getCourses = async () => {
    const response = await axios.get('courses')
        .then((res) => {
            return res.data
        })
    return response
}
const getCourse = async (courseId) => {
    const response = await axios.get(`courses/${courseId}`)
        .then((res) => {
            return res.data
        })
    return response
}
const addCourse = async (courseData) => {
    await axios.post('courses', courseData)
    return getCourses()
}
const updateCourse = async (courseData) => {
    await axios.patch(`courses/${courseData.courseId}`, courseData.formData)
    return getCourses()
}
const deleteCourse = async (courseData) => {
    await axios.delete(`courses/${courseData.courseId}`)
    return getCourses()
}
const addStudent = async (courseData) => {
    const response = await axios.post(`courses/${courseData._id}/students`, courseData)
        .then((res) => {
            return res.data
        })
    return response
}
const updateStudent = async (data) => {
    await axios.patch(`courses/${data.courseId}/students/${data.studentId}`, data.studentData)
    return await getCourse(data.courseId)
}
const deleteStudent = async (data) => {
    await axios.delete(`courses/${data.courseId}/students/${data.studentId}`)
    return await getCourse(data.courseId)
}

const courseService = {
    getCourses,
    getCourse,
    addCourse,
    addStudent,
    updateStudent,
    deleteStudent,
    updateCourse,
    deleteCourse,
}

export default courseService