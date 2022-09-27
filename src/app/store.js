import { configureStore } from '@reduxjs/toolkit'
import courseReducer from '../features/course/courseSlice'
import subjectReducer from '../features/subject/subjectSlice'
import authReducer from '../features/auth/authSlice'
export const store = configureStore({
    reducer: {
        course: courseReducer,
        subject: subjectReducer,
        auth: authReducer,
    },
})