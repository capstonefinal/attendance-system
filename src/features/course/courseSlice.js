import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import courseService from "./courseService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

    courses: null,
    course: null,
}

export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
            state.course = null
        },
    },
    extraReducers: (builder) => {
        const qry = [
            getCourses,
            getCourse,
            addCourse,
            updateCourse,
            deleteCourse,
            addStudent,
            updateStudent,
            deleteStudent,
        ]
        for (const thunk in qry) {
            builder
                .addCase(qry[thunk].pending, (state) => {
                    state.isLoading = true
                    state.isSuccess = false
                })
                .addCase(qry[thunk].rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
            // .addCase(qry[thunk].fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true

            //     // if (qry[thunk] = getCourses || updateCourse) {
            //     //     state.courses = action.payload
            //     // }
            //     // if (qry[thunk] = getCourse) {
            //     //     state.course = action.payload
            //     // }
            //     switch (qry[thunk]) {
            //         case addStudent:
            //             state.course = action.payload
            //             break;
            //         case getCourse:
            //             state.course = action.payload
            //             break;
            //         case getCourses:
            //             state.courses = action.payload
            //         default:
            //             break;
            //     }
            // })
        }
        builder
            .addCase(getCourses.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(addCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(getCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.course = action.payload
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.course = action.payload
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.course = action.payload
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.course = action.payload
            })


            .addCase(getStudents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.students = action.payload
            })
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getCourses.pending, (state) => {
    //             state.isLoading = true
    //         })
    //         .addCase(getCourses.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.courses = action.payload
    //         })
    //         .addCase(getCourses.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.message = action.payload
    //             state.courses = null
    //         })
    //         .addCase(getCourse.pending, (state) => {
    //             state.isLoading = true
    //         })
    //         .addCase(getCourse.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.course = action.payload
    //         })
    //         .addCase(getCourse.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.message = action.payload
    //             state.course = null
    //         })
    //         .addCase(getStudents.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.students = action.payload
    //         })
    //         .addCase(getStudents.pending, (state, action) => {
    //             state.students = null
    //         })
    //         // .addCase(addCourse.pending, (state) => {
    //         //     state.isLoading = true
    //         // })
    //         // .addCase(addCourse.fulfilled, (state, action) => {
    //         //     state.isLoading = false
    //         //     state.isSuccess = true
    //         //     state.courses = action.payload
    //         // })
    //         // .addCase(addCourse.rejected, (state, action) => {
    //         //     state.isLoading = false
    //         //     state.isError = true
    //         //     state.message = action.payload
    //         //     state.courses = null
    //         // })
    //         .addCase(updateCourse.pending, (state) => {
    //             state.isLoading = true
    //         })
    //         .addCase(updateCourse.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.courses = action.payload
    //         })
    //         .addCase(updateCourse.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.message = action.payload
    //             state.courses = null
    //         })
    //         .addCase(addStudent.pending, (state) => {
    //             state.isLoading = true
    //             state.isSuccess = false
    //         })
    //         .addCase(addStudent.fulfilled, (state, action) => {
    //             state.isLoading = false
    //             state.isSuccess = true
    //             state.course = action.payload
    //         })
    //         .addCase(addStudent.rejected, (state, action) => {
    //             state.isLoading = false
    //             state.isError = true
    //             state.message = action.payload
    //             state.courses = null
    //         })
    // }
})

export const getCourses = createAsyncThunk('course/getCourses', async (thunkAPI) => {
    try {
        return await courseService.getCourses()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const getCourse = createAsyncThunk('course/getCourse', async (courseId, thunkAPI) => {
    try {
        return await courseService.getCourse(courseId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const addCourse = createAsyncThunk('course/addCourse', async (courseData, thunkAPI) => {
    try {
        return await (await courseService.addCourse(courseData))
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const updateCourse = createAsyncThunk('course/updateCourse', async (courseData) => {
    try {
        return await courseService.updateCourse(courseData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const deleteCourse = createAsyncThunk('course/deleteCourse', async (courseData) => {
    try {
        return await courseService.deleteCourse(courseData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const addStudent = createAsyncThunk('course/addStudent', async (courseData) => {
    try {
        return await courseService.addStudent(courseData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const updateStudent = createAsyncThunk('course/updateStudent', async (data) => {
    try {
        return await courseService.updateStudent(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const deleteStudent = createAsyncThunk('course/deleteStudent', async (data) => {
    try {
        return await courseService.deleteStudent(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})





export const getStudents = createAsyncThunk('course/getStudents', async (courseId, thunkAPI) => {
    try {
        return await courseService.getStudents(courseId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const { reset } = courseSlice.actions

export default courseSlice.reducer