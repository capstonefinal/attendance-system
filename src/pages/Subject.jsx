import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import subjectService from "../features/subject/subjectService";
import { addSubject, getSubjects } from "../features/subject/subjectSlice";
export default function Subject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();

  const modalOpen = () => {
    setModalVisible(true);
  };
  const modalClose = () => {
    setModalVisible(false);
  };
  const handleSubjectClick = (subjectId) => {
    navigate(`/subjects/${subjectId}`);
  };

  // const { subjects, courses } = useSelector((state) => state.subject);

  const data = useQuery(
    ["data"],
    async () =>
      await subjectService.getSubjects(
        await JSON.parse(localStorage.getItem("user"))._id
      )
    // {
    //   // Refetch the data every {N} seconds
    //   refetchInterval: 5000,
    // }
  );

  // useEffect(() => {
  //   queryClient.refetchQueries(["data"]);
  // }, [data]);
  // const data = useQuery(["data"], async () => {
  //   return await axios.get("subjects").then((res) => {
  //     return res.data;
  //   });
  // });
  function handleSubjectSave(e) {
    e.preventDefault();
    dispatch(addSubject(subjectData));
    toast.success("Subject added");
    queryClient.refetchQueries(["data"]);
  }
  const [subjectData, setSubjectData] = useState({
    subjectName: "",
    course: "",
  });
  function handleOnChange(e) {
    setSubjectData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleEditSubject(e, subject) {
    e.stopPropagation();
    // setSelectedCourseId(subject._id);
    // setFormData({
    //   courseName: course.courseName,
    //   yearLevel: course.yearLevel,
    // });
    // modalOpen();
  }
  const deleteSubjectMutation = useMutation(async (subject) => {
    await subjectService.deleteSubject(subject);
    queryClient.invalidateQueries(["data"]);
  });
  function handleDeleteSubject(e, subject) {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this subject?")) {
      deleteSubjectMutation.mutate(subject);
    }
  }

  return (
    <>
      <div className="overflow-clip w-full items-center flex flex-col p-5">
        <div className="flex w-full justify-between max-w-4xl">
          <p></p>
          <p>Number of Subjects : {data?.data?.subjects?.length}</p>
        </div>
        <div className="w-full text-4xl my-5 flex max-w-4xl">
          <p className="w-full">Subjects</p>
          <button
            onClick={modalOpen}
            className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-lg text-sm flex-none"
          >
            Add Subject
          </button>
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
                <td></td>
              </tr>
            </thead>
            <tbody>
              {data?.data?.subjects?.map((subject) => {
                return (
                  <tr
                    onClick={() => handleSubjectClick(subject._id)}
                    id={subject._id}
                    key={subject._id}
                    className="border-b bg-gray-700 border-gray-700 hover:cursor-pointer hover:bg-gray-500"
                  >
                    <td scope="row" className="py-4 px-6 whitespace-nowrap">
                      {subject.subjectName}
                    </td>
                    <td className="py-4 px-6">
                      {subject.course.courseName +
                        " - " +
                        subject.course.yearLevel}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {subject.course.students.length}
                    </td>
                    <td className="text-center flex justify-center items-center py-1 space-x-2">
                      <svg
                        onClick={(e) => {
                          handleEditSubject(e, subject);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-full text-green-600 hover:bg-gray-700 rounded-full p-1.5 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      <svg
                        onClick={(e) => {
                          handleDeleteSubject(e, subject);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-full text-red-600 hover:bg-gray-700 rounded-full p-1.5 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        modalVisible={modalVisible}
        modalClose={modalClose}
        fullscreen={false}
      >
        <div className="m-4 space-y-4 p-10 flex flex-col">
          <p className="text-5xl mb-2">Add Subject</p>
          <form onSubmit={handleSubjectSave} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="subjectName">Subject Name</label>
              <input
                onChange={handleOnChange}
                value={subjectData.subjectName}
                className="bg-gray-600 py-2 px-4 rounded-md"
                type="text"
                name="subjectName"
                id="subjectName"
                placeholder="Enter Subject Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="course">Course</label>
              <select
                onChange={handleOnChange}
                value={subjectData.course}
                className="bg-gray-600 text-gray-200 py-2 px-3 rounded-md mb-3"
                name="course"
                id="course"
                required
              >
                <option value="" className="text-gray-400 p-2 text-lg" disabled>
                  Select Course
                </option>
                {data?.data?.courses?.map((course) => {
                  return (
                    <option
                      value={course._id}
                      key={course._id}
                      className="text-gray-200 p-2 text-lg"
                    >
                      {course.courseName + " - " + course.yearLevel}
                    </option>
                  );
                })}
                {/* <option value="1" className='text-gray-200 p-2 text-lg'>BSIT - IV</option>
                            <option value="2" className='text-gray-200 p-2 text-lg'>BSBA - III</option>
                            <option value="3" className='text-gray-200 p-2 text-lg'>BSED - I</option>
                            <option value="4" className='text-gray-200 p-2 text-lg'>BSA - II</option> */}
              </select>
            </div>
            <button className="bg-indigo-800 py-2 px-4 active:bg-indigo-900 rounded-md w-full">
              Save
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
