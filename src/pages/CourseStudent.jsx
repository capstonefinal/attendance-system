import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudents, getCourse, addStudent, updateStudent, deleteStudent } from "../features/course/courseSlice";
import Modal from '../components/Modal';
import { toast } from 'react-toastify';

export default function CourseStudent() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    
    const [studentData, setStudentData] = useState({
        studentName: '',
        studentId: ''
    })
    const [updatedCourse, setUpdatedCourse] = useState(null)
    const { course } = useSelector((state) => state.course)
    const [studentList, setStudentList] = useState([])

    const [selectedStudentId, setSelectedStudentId] = useState(null)

    useEffect(() => {

        dispatch(getCourse(params.course))
    }, [])
    useEffect(() => {
        if (course) {
            setStudentList(course.students)
      }
    }, [course])
    useEffect(() => {
        if (updatedCourse) {
        dispatch(addStudent(updatedCourse))
      }
    }, [updatedCourse])
    
    
    async function handleSaveStudent() {
        if (!selectedStudentId) {
            setUpdatedCourse(() => ({
                ...course,
                students: [...course.students,studentData]
            }))
            toast.success('Student added')
        } else {
            dispatch(updateStudent({ courseId: params.course, studentId: selectedStudentId, studentData }))
            toast.success('Student data upated')
        }
        modalClose()
    }
    
    function handleOnChange(e) {
        setStudentData((prev) => ({
            ...studentData,
            [e.target.name]: e.target.value
        })) 
    }

    function modalOpen() {
        setModalVisible(true);
    }
    function modalClose() {
        setStudentData({
            studentName: '',
            studentId: ''
        })
        setSelectedStudentId(null)
        setModalVisible(false);
    }

    function handleEditStudent(e,student) {
        e.stopPropagation()
        setSelectedStudentId(student._id)
        setStudentData({
            studentName: student.studentName,
            studentId: student.studentId
        })
        modalOpen()
    }
    async function handleDeleteStudent(e,student) {
        e.stopPropagation()
        // setSelectedStudentId(student._id)
        if (confirm(`Are you sure you want to delete student ${student.studentName}?`)) {
            dispatch(deleteStudent({ courseId: params.course, studentId: student._id }))
            setStudentData({
                studentName: '',
                studentId: ''
            })
            toast.success(`${student.studentName} Deleted`)
        }
    }
    
    return <>
        <div className="overflow-clip w-full items-center flex flex-col p-5">
            <div className='flex w-full justify-between'>
                <p onClick={()=>navigate(-1)} className="hover:cursor-pointer">{ "< Back" }</p>
                {/* <p>Number of Students : { " "+studentList ? studentList.length:null }</p> */}
            </div>
            <div className="w-full text-4xl my-5 flex max-w-4xl">
                <p className="w-full">{ course ? course.courseName+" - "+course.yearLevel : null }</p>
                <button onClick={modalOpen} className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-lg text-sm flex-none">Add Student</button>
            </div>
            
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full max-w-4xl">
                <table className="w-full text-sm text-left text-gray-200">
                    <thead className="text-gray-200 bg-gray-600">
                        <tr>
                            <td scope="col" className="py-3 px-6">
                                Name
                            </td>
                            <td scope="col" className="py-3 px-6 text-center">
                                Student ID
                            </td>
                            <td scope="col" className="py-3 px-6 text-center">
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !studentList ? null : studentList.map((student) => {
                            return (
                                <tr key={student._id} className="border-b bg-gray-700 border-gray-700 hover:bg-gray-500">
                                    <td scope="row" className="py-1 px-3 whitespace-nowrap">
                                        {student.studentName}
                                    </td>
                                    <td className="py-1 px-3 text-center">
                                        {student.studentId}
                                    </td>
                                    <td className="text-center flex justify-center items-center py-1 space-x-2" >
                                        <svg onClick={(e) => { handleEditStudent(e, student) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className='h-full text-green-600 hover:bg-gray-700 rounded-full p-1.5 cursor-pointer'>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        <svg onClick={(e) => { handleDeleteStudent(e, student) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className='h-full text-red-600 hover:bg-gray-700 rounded-full p-1.5 cursor-pointer'>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <Modal modalVisible={modalVisible} modalClose={modalClose} fullscreen={false}>
            <div className="m-4 space-y-4 p-10 flex flex-col">
                <p className='text-5xl mb-2'>Add Student</p>
                <div className='flex flex-col'>
                    <label htmlFor="studentName">Student Name</label>
                    <input onChange={handleOnChange} value={studentData.studentName} autoFocus className="bg-gray-600 py-2 px-4 rounded-md" type="text" name="studentName" id="studentName" placeholder="Enter Student Name" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="studentId">Student ID</label>
                    <input onChange={handleOnChange} value={ studentData.studentId } className="mb-5 bg-gray-600 py-2 px-4 rounded-md" type="text" name="studentId" id="studentId" placeholder="Enter Student ID" required />
                </div>
                {/* <div className='flex flex-col'>
                    <label htmlFor="class">Class</label>
                    <select className='bg-gray-600 text-gray-200 py-2 px-3 rounded-md' name="class" id="class" defaultValue=''>
                        <option value="" className='text-gray-400 p-2 text-lg' disabled>Select Class</option>
                        <option value="1" className='text-gray-200 p-2 text-lg'>BSIT - IV</option>
                        <option value="2" className='text-gray-200 p-2 text-lg'>BSBA - III</option>
                        <option value="3" className='text-gray-200 p-2 text-lg'>BSED - I</option>
                        <option value="4" className='text-gray-200 p-2 text-lg'>BSA - II</option>
                    </select>
                </div> */}
                <button onClick={handleSaveStudent} className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-md">Save</button>
            </div>
        </Modal>
    </>
}