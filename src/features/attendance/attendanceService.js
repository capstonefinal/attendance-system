import axios from "/axiosConfig";

const deleteStudent = async (data) => {
    await axios.delete(`courses/${data.courseId}/students/${data.studentId}`)
    return await getCourse(data.courseId)
}

const attendanceService = {
deleteStudent  
}

export default attendanceService