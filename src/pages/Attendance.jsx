import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import { getSubjects, scanID } from "../features/subject/subjectSlice";
import moment from "moment";
import authService from "../features/auth/authService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import subjectService from "../features/subject/subjectService";
import axios from "../../axiosConfig";

export default function Attendance() {
  const [modalVisible, setModalVisible] = useState(false);
  const [studentId, setStudentId] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const focusDiv = useRef();
  const { subjects } = useSelector((state) => state.subject);
  const [attendanceType, setAttendanceType] = useState("Time-in");
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentSubjectStudents, setCurrentSubjectStudents] = useState(null);
  const [caption, setCaption] = useState("Please scan your ID");

  const attendanceStudents = useQuery(["attendanceStudents"], async () => {
    return await axios.get("attendance/").then((res) => {
      // console.log(res.data);
      return res.data;
    });
  });
  const scanIdMutation = useMutation(
    (x) => {
      // console.table({
      //   studentId: x,
      //   attendanceType: attendanceType,
      //   courseId: currentSubject?.course._id,
      //   subject: currentSubject?._id,
      // });
      return subjectService.scanID({
        studentId: x,
        attendanceType: attendanceType,
        courseId: currentSubject?.course._id,
        subject: currentSubject?._id,
      });
    },
    {
      onSuccess: (data, variables, context) => {
        // Boom baby!
        setCaption(
          data.message.includes("Cannot")
            ? "Student ID not found"
            : data.message
        );
        // setTimerInterval(0);
        setTimerInterval(1000);
        queryClient.invalidateQueries(["attendanceStudents"]);
        // console.log("mutation success");
      },
    }
  );
  const onChange = (e) => {
    setStudentId(e.target.value);
  };
  const modalClose = () => {
    setCurrentSubjectStudents(null);
    setModalVisible(false);
  };
  const modalOpen = (attendanceType, subject) => {
    setAttendanceType(attendanceType);
    //set current subject
    setCurrentSubjectStudents(subject.course.students);
    setCurrentSubject(subject);
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch(getSubjects());
  }, []);

  // const onEnter = (e) => {
  //   if (e.key === "Enter" && e.target.value) {
  //     ////////////////////
  //     //dispatch insert to attendance
  //     ////////////////////
  //     dispatch(
  //       scanID({ studentId: e.target.value, attendanceType: attendanceType })
  //     );
  //     // toast.success(e.target.value)
  //     setCaption(e.target.value);
  //     setStudentId("");
  //     setTimeout(() => {
  //       setCaption("Please scan your ID");
  //     }, 1000);
  //   }
  // };

  const getCurrentSubject = (id) => {
    const currentSubject = subjects.filter((subject) => {
      return subject._id == id;
    })[0];
    console.log(currentSubject);
    modalOpen();
  };
  // const [currentSubjectId, setCurrentSubjectId] = useState(null);
  const date = Date();

  useEffect(() => {
    let x = "";
    const keyDownHandler = (event) => {
      //   x && console.log("User pressed: ", event.key);
      if (event.key === "Enter" && x != "") {
        event.preventDefault();
        // x && toast(x)
        // setCaption(x);
        scanIdMutation.mutate(x);
        // let d = new Date();
        // console.log(d.getFullYear());
        x = "";
      } else if (event.key === "Escape") {
        x = "";
      } else {
        if (!isNaN(parseInt(event.key))) {
          x = x + event.key;
        }
        console.log(x);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setCaption("Please scan your ID");
      setTimerInterval(0);
    }, timerInterval);
  }, [caption]);
  const [timerInterval, setTimerInterval] = useState(0);
  return (
    <>
      <div className="overflow-clip w-full items-center flex flex-col p-5 max-w-3xl mx-auto">
        <p className="w-full text-4xl mb-5">Attendance</p>
        {/* {
                !subjects ? null : subjects.map((subject)=>{
                    return (
                        <div key={subject._id} className="text-xl py-4 px-6 w-full max-w-3xl items-center justify-between flex bg-slate-700 rounded-xl shadow-lg mb-4">
                            <div className='flex'>
                                <p>{ subject.subjectName }</p>
                                <p>{ subject.course.courseName + " - " + subject.course.yearLevel }</p>
                            </div>
                            <div className='flex space-x-3 text-white'>
                                <button className='bg-emerald-800 hover:bg-emerald-900 hover:bg-opacity-60 py-2 px-6 rounded-xl bg-opacity-60'>Time-in</button>
                                <button className='bg-red-800 hover:bg-red-900 hover:bg-opacity-60 py-2 px-6 rounded-xl bg-opacity-60'>Time-out</button>
                            </div>
                        </div>
                    )
                })
            } */}
        <table className="w-full text-sm text-left text-gray-200 max-w-3xl">
          <thead className="text-gray-200 bg-slate-600 h-12">
            <tr>
              <td scope="col" className="py-3 px-6">
                Subject
              </td>
              <td scope="col" className="py-3 px-6">
                Class
              </td>
              <td scope="col" className="py-3 px-6 text-center"></td>
            </tr>
          </thead>
          <tbody>
            {subjects &&
              subjects.map((subject) => {
                return (
                  <tr
                    key={subject._id}
                    className="border-b bg-slate-700 border-slate-700"
                  >
                    <td scope="row" className="py-4 px-6 whitespace-nowrap">
                      {subject.subjectName}
                    </td>
                    <td className="py-4 px-6">
                      {subject.course.courseName +
                        " - " +
                        subject.course.yearLevel}
                    </td>
                    <td className="py-4 px-6 text-center flex space-x-3 justify-end">
                      <button
                        onClick={() => modalOpen("Time-in", subject)}
                        attendance_type="Time-in"
                        className="bg-emerald-800 hover:bg-emerald-900 hover:bg-opacity-60 py-2 px-6 rounded-xl bg-opacity-60"
                      >
                        Time-in
                      </button>
                      <button
                        onClick={() => modalOpen("Time-out", subject)}
                        attendance_type="Time-out"
                        className="bg-red-800 hover:bg-red-900 hover:bg-opacity-60 py-2 px-6 rounded-xl bg-opacity-60"
                      >
                        Time-out
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {modalVisible && (
        <Modal
          modalVisible={modalVisible}
          modalClose={modalClose}
          fullscreen={true}
        >
          <div className="space-y-6 p-10 flex flex-col h-screen w-full overflow-auto">
            <div className="flex justify-between w-full max-w-3xl mx-auto opacity-70">
              <p className={`text-3xl text-center`}>
                {currentSubject && currentSubject.subjectName}
              </p>
              <p
                className={`text-3xl text-center font-bold tracking-widest ${
                  attendanceType === "Time-in"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {attendanceType}
              </p>
            </div>
            <p className="text-5xl text-center py-20">{caption}</p>
            {/* <p className='text-5xl text-center py-20'>Please scan your ID</p> */}

            <div className="h-full w-full bg-slate-600 max-w-3xl mx-auto mb-10 overflow-auto">
              <table className="w-full text-sm text-left text-gray-200 max-w-3xl mx-auto">
                <thead className="text-gray-200 bg-slate-600 h-12 sticky top-0">
                  <tr>
                    <td scope="col" className="py-3 px-6">
                      Name
                    </td>
                    <td scope="col" className="py-3 px-6">
                      ID Number
                    </td>
                    <td scope="col" className="py-3 px-6 text-center">
                      {attendanceType}
                    </td>
                    <td scope="col" className="py-3 px-6 text-center"></td>
                  </tr>
                </thead>
                <tbody className="py-10">
                  {
                    //list of timed in/out students

                    attendanceStudents?.data
                      ?.filter((fstudent) => {
                        if (attendanceType === "Time-in") {
                          // console.log(fstudent.student);

                          return (
                            !fstudent.timeOut &&
                            fstudent.subject._id == currentSubject._id
                          );
                        }
                        return (
                          fstudent.timeOut &&
                          fstudent.subject._id == currentSubject._id
                        );
                      })
                      .map((student) => {
                        const studentDetails =
                          currentSubject?.course?.students.filter(
                            (x) => x._id == student.student
                          )[0];
                        const attendanceTime =
                          attendanceType === "Time-in"
                            ? student.timeIn
                            : student.timeOut;
                        return (
                          <tr
                            key={student._id}
                            className="border-b bg-slate-700 border-slate-700"
                          >
                            <td
                              scope="row"
                              className="py-4 px-6 whitespace-nowrap"
                            >
                              {studentDetails.studentName}
                              {/* {student.studentName} */}
                            </td>
                            <td className="py-4 px-6">
                              {studentDetails.studentId}
                            </td>
                            {/* <td className="py-4 px-6">{student.studentId}</td> */}
                            <td className="py-4 px-6 text-center">
                              {/* {moment(student.timeIn).startOf("hour").fromNow()}
                            <hr /> */}
                              {moment(attendanceTime).format("LT")}
                            </td>
                            <td className="py-4 px-6 text-center">
                              {moment(attendanceTime).fromNow()}
                            </td>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </table>
            </div>
            {/* <input
              // className='bg-black text white text-center active:ring-transparent focus:outline-0 caret-transparent'
              className="bg-transparent text-center active:ring-transparent focus:outline-0 caret-transparent text-transparent h-0"
              id="stundentId"
              name="studentId"
              type="text"
              ref={focusDiv}
              value={studentId}
              // onKeyPress={(e) => onEnter(e)}
              onChange={onChange}
              autoFocus
              onBlur={() => focusDiv.current.focus()}
              autoComplete="off"
            /> */}
          </div>
        </Modal>
      )}
    </>
  );
}
