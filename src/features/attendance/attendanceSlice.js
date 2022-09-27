import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import attendanceService from "./subjectService";

const initialState = {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',

    subjects: null,
    subject: null,
}

export const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
            state.subject = null
        },
    },
    extraReducers: (builder) => {
        const qry = [
            getSubjects,
            getSubject,
        ]
        for (const thunk in qry) {
            builder
                .addCase(qry[thunk].pending, (state) => {
                    state.isLoading = true
                    state.isSuccess = false
                    state.subjects = null
                    state.subject = null
                    state.courses = null
                })
                .addCase(qry[thunk].rejected, (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.message = action.payload
                })
        }
        builder
            .addCase(getSubjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.courses = action.payload.courses
                state.subjects = action.payload.subjects
            })
            .addCase(getSubject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.subject = action.payload
            })
    },
})

export const getSubjects = createAsyncThunk('subject/getSubjects', async (data, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await subjectService.getSubjects(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})
export const getSubject = createAsyncThunk('subject/getSubject', async (data, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await subjectService.getSubject(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const { reset } = subjectSlice.actions

export default subjectSlice.reducer