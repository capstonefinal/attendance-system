import axios from "/axiosConfig";
const config = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

const getSubjects = async (token) => {
    const data = await axios.get('subjects', config(token))
        .then((res) => {
            return res.data
        })
    return data
}
const getSubject = async (data, token) => {
    const res = await axios.get(`subjects/${data.subjectId}`, config(token))
        .then((res) => {
            return res.data
        })
    return res

}
const addSubject = async (data, token) => {
    await axios.post('subjects', data, config(token))
    return await getSubjects(token)
}
const scanID = async (data, token) => {
    await axios.post('attendance/', data, config(token))
    return await getSubjects(token)
}

const subjectService = {
    getSubjects,
    getSubject,
    addSubject,
    scanID
}

export default subjectService