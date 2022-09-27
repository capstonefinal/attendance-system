import { useState, useEffect } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addCourse, deleteCourse, getCourses, reset, updateCourse } from "../features/course/courseSlice";
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
export default function Course() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)

    const {courses, isError, isSuccess, message} = useSelector((state) => state.course)
    const [formData, setFormData] = useState({
        courseName: '',
        yearLevel: ''
    })
    const [selectedCourseId, setSelectedCourseId] = useState(null)

    useEffect(() => {
        dispatch(getCourses())
    }, [])
    useEffect(() => {
        if (isError) {
            toast(message)
        }
        if (isSuccess) {
            dispatch(reset())
        }
    }, [isError, isSuccess, message, dispatch])
    // useEffect(() => {
    //     if (selectedCourseId) {
    //         toast.warn(selectedCourseId)
    //     }
    // }, [selectedCourseId])



    function handleOnChange(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })) 
    }
    async function handleOnSubmit() {
        if (formData.courseName && formData.yearLevel) {
            if (selectedCourseId === null) {                
                dispatch(addCourse(formData))
                toast.success(formData.courseName + ' - ' + formData.yearLevel + ' successfuly added')
            } else {
                dispatch(updateCourse({courseId: selectedCourseId, formData:formData}))
                toast.success(formData.courseName+' - '+formData.yearLevel+' successfuly Upated')
            }
            modalClose()
        } else {
            toast.error('Please fill all fields')
        }
    }
    function modalOpen() {
        setModalVisible(true);
    }
    function modalClose() {
        setSelectedCourseId(null)
        setFormData({
            courseName: '',
            yearLevel: ''
        })
        setModalVisible(false);
    }
    function handleSubjectClick(e) {
        navigate(`/courses/${e}`);
    }
    function handleEditCourse(e,course) {
        e.stopPropagation()
        setSelectedCourseId(course._id)
        setFormData({
            courseName: course.courseName,
            yearLevel: course.yearLevel
        })
        modalOpen()
    }
    async function handleDeleteCourse(e,course) {
        e.stopPropagation()
        setSelectedCourseId(course._id)
        if (confirm(`Are you sure you want to delete ${course.courseName+" - "+course.yearLevel}?`)) {
            dispatch(deleteCourse({ courseId: course._id }))
            toast.success(`${course.courseName+" - "+course.yearLevel} Deleted`)
        }
    }


    return <>
        <div className="overflow-clip w-full items-center flex flex-col p-5">
            <div className="w-full text-4xl mb-5 flex max-w-4xl">
                <p className="w-full">Courses</p>
                <button onClick={modalOpen} className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-lg text-sm flex-none">Add Course</button>
            </div>
            
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full max-w-4xl">
                <table className="w-full text-sm text-left text-gray-200">
                    <thead className="text-gray-200 bg-gray-600">
                        <tr>
                            <td scope="col" className="py-3 px-6">
                                Course Name
                            </td>
                            <td scope="col" className="py-3 px-6 text-center">
                                Year level
                            </td>
                            <td scope="col" className="py-3 px-6 text-center">
                                Total Students
                            </td>
                            <td scope="col" className="py-3 px-6 text-center">
                                
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !courses ? null : courses.map((course) => {
                                const {courseName, yearLevel, _id, students} = course
                                return (
                                    <tr key={_id} onClick={()=>handleSubjectClick(_id)} id='qweqweqwe' className="border-b bg-gray-700 border-gray-700 hover:cursor-pointer hover:bg-gray-500">
                                        <td className="py-2 px-3">
                                            {courseName}
                                        </td>
                                        <td className="py-2 px-3 text-center">
                                            {yearLevel}
                                        </td>
                                        <td className="py-2 px-3 text-center">
                                            {students.length}
                                        </td>
                                        <td className="text-center flex justify-center items-center py-1 space-x-2" >
                                            <svg onClick={(e) => { handleEditCourse(e,course); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className='h-full text-green-600 hover:bg-gray-700 rounded-full p-1.5 cursor-pointer'>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            <svg onClick={(e) => { handleDeleteCourse(e,course); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className='h-full text-red-600 hover:bg-gray-700 rounded-full p-1.5 cursor-pointer'>
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
                <p className='text-5xl mb-2'>Add Course</p>
                <div className='flex flex-col'>
                    <label htmlFor="courseName">Course Name</label>
                <input onChange={handleOnChange} autoFocus value={formData.courseName} className="bg-gray-600 py-2 px-4 rounded-md" type="text" name="courseName" id="courseName" placeholder="Enter Course Name" required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="yearLevel">Year Level</label>
                    <select onChange={handleOnChange} className='bg-gray-600 mb-5 text-gray-200 py-2 px-3 rounded-md' name="yearLevel" id="yearLevel" value={formData.yearLevel}>
                        <option value="" className='text-gray-400 p-2 text-lg' disabled>Select Year Level</option>
                        <option value="I" className='text-gray-200 p-2 text-lg'>I</option>
                        <option value="II" className='text-gray-200 p-2 text-lg'>II</option>
                        <option value="III" className='text-gray-200 p-2 text-lg'>III</option>
                        <option value="IV" className='text-gray-200 p-2 text-lg'>IV</option>
                    </select>
                </div>
                <button onClick={handleOnSubmit} className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-md">Save</button>
            </div>
        </Modal>
    </>
}