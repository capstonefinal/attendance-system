import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import { addSubject, getSubjects } from '../features/subject/subjectSlice';
export default function Subject() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false)
    const modalOpen = () => {
        setModalVisible(true)
    }
    const modalClose = () => {
        setModalVisible(false)
    }
    const handleSubjectClick = (subjectId) => {
        navigate(`/subjects/${subjectId}`)
    }

    const {subjects, courses} = useSelector((state)=>state.subject)

    useEffect(() => {
        dispatch(getSubjects())
    }, [])
    
    function handleSubjectSave(e) {
        e.preventDefault()
        dispatch(addSubject(subjectData))
        toast.success('Subject added')
    }
    const [subjectData, setSubjectData] = useState({
        subjectName: '',
        course: ''
    })
    function handleOnChange(e) {
        setSubjectData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })) 
    }
    return <>
        <div className="overflow-clip w-full items-center flex flex-col p-5">
            <div className='flex w-full justify-between max-w-4xl'>
                <p></p>
                <p>Number of Subjects : { subjects ? subjects.length : null }</p>
            </div>
            <div className="w-full text-4xl my-5 flex max-w-4xl">
                <p className="w-full">Subjects</p>
                <button onClick={modalOpen} className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-lg text-sm flex-none">Add Subject</button>
            </div>
            
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full max-w-4xl">
                <table className="w-full text-sm text-left text-gray-200">
                    <thead className="text-gray-200 bg-gray-600">
                        <tr>
                            <td scope="col" className="py-3 px-6">
                                Subject
                            </td>
                            <td scope="col" className="py-3 px-6">
                                Class
                            </td>
                            <td scope="col" className="py-3 px-6 text-center">
                                Total Students
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subjects ? null : subjects.map((subject)=>{
                                return <tr onClick={()=>handleSubjectClick(subject._id)} id={subject._id}  key={subject._id} className="border-b bg-gray-700 border-gray-700 hover:cursor-pointer hover:bg-gray-500">
                                    <td scope="row" className="py-4 px-6 whitespace-nowrap">
                                        {subject.subjectName}
                                    </td>
                                    <td className="py-4 px-6">
                                        {subject.course.courseName + " - " + subject.course.yearLevel}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        {subject.course.students.length}
                                    </td>
                                </tr>
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
        <Modal modalVisible={modalVisible} modalClose={modalClose} fullscreen={false}>
            <div className="m-4 space-y-4 p-10 flex flex-col">
                <p className='text-5xl mb-2'>Add Subject</p>
                <form onSubmit={handleSubjectSave} className='space-y-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="subjectName">Subject Name</label>
                        <input onChange={handleOnChange} value={subjectData.subjectName} className="bg-gray-600 py-2 px-4 rounded-md" type="text" name="subjectName" id="subjectName" placeholder="Enter Subject Name" required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="course">Course</label>
                        <select onChange={handleOnChange} value={subjectData.course} className='bg-gray-600 text-gray-200 py-2 px-3 rounded-md mb-3' name="course" id="course" required>
                            <option value="" className='text-gray-400 p-2 text-lg' disabled>Select Course</option>
                            {
                                courses && courses.map((course) => {
                                    return <option value={course._id} key={course._id} className='text-gray-200 p-2 text-lg'>{course.courseName+" - "+course.yearLevel}</option>
                                })
                            }
                            {/* <option value="1" className='text-gray-200 p-2 text-lg'>BSIT - IV</option>
                            <option value="2" className='text-gray-200 p-2 text-lg'>BSBA - III</option>
                            <option value="3" className='text-gray-200 p-2 text-lg'>BSED - I</option>
                            <option value="4" className='text-gray-200 p-2 text-lg'>BSA - II</option> */}
                        </select>
                    </div>
                    <button className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-md w-full">Save</button>
                </form>
            </div>
        </Modal>
    </>
}