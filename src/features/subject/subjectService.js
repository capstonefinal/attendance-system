import axios from "../../../axiosConfig";

const getSubjects = async () => {
    const data = await axios.get('subjects')
        .then((res) => {
            return res.data
        })
    return data
}
const getSubject = async (data) => {
    const res = await axios.get(`subjects/${data.subjectId}`)
        .then((res) => {
            return res.data
        })
    return res

}
const addSubject = async (data) => {
    await axios.post('subjects', data).then(res=>console.log(res))
    
    return await getSubjects()
}
const scanID = async (data) => {
    const res = await axios.post('attendance/', data)
    // await axios.post('attendance/', data, config(token))
    // res.data && console.log(res.data);
    let subjects = await getSubjects()
    subjects = {...subjects, message: res.data.message}
    return subjects
}
const deleteSubject= async(data)=>{
    // return console.log(data);
    const res = await axios.delete('subjects/',{data:{subjectId:data._id}}).then(res=>console.log(res.data))
    return res
}

const subjectService = {
    getSubjects,
    getSubject,
    addSubject,
    scanID,
    deleteSubject
}

export default subjectService