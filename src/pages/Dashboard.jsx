import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from "../features/auth/authSlice";
import Modal from '../components/Modal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify'

export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalVisible, setModalVisible] = useState(false)
    const { user } = useSelector((state)=>state.auth) 
    useEffect(() => {
        if (!user) {
            navigate('login')
        }
    })
    return <>
        <div className="mx-auto p-5 overflow-x-auto relative sm:rounded-lg w-full max-w-4xl">
            <table className="w-full text-sm text-left text-slate-200">
                <thead className="text-slate-200 bg-slate-50 bg-slate-600">
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
                        <td scope="col" className="py-3 px-6 text-center">
                            Present
                        </td>
                        <td scope="col" className="py-3 px-6 text-center">
                            Absent
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr id='qweqweqwe' className="border-b bg-slate-700 border-slate-700 hover:cursor-pointer hover:bg-slate-500">
                        <td scope="row" className="py-4 px-6 whitespace-nowrap">
                            Web Development Web Development
                        </td>
                        <td className="py-4 px-6">
                            BSIT - IV
                        </td>
                        <td className="py-4 px-6 text-center">
                            34
                        </td>
                        <td className="py-4 px-6 text-center">
                            32
                        </td>
                        <td className="py-4 px-6 text-center">
                            2
                        </td>
                    </tr>
                    <tr id='qweqweqwe' className="border-b bg-slate-700 border-slate-700 hover:cursor-pointer hover:bg-slate-500">
                        <td scope="row" className="py-4 px-6 whitespace-nowrap">
                            Web Development Web Development
                        </td>
                        <td className="py-4 px-6">
                            BSIT - IV
                        </td>
                        <td className="py-4 px-6 text-center">
                            34
                        </td>
                        <td className="py-4 px-6 text-center">
                            32
                        </td>
                        <td className="py-4 px-6 text-center">
                            2
                        </td>
                    </tr>
                    <tr id='qweqweqwe' className="border-b bg-slate-700 border-slate-700 hover:cursor-pointer hover:bg-slate-500">
                        <td scope="row" className="py-4 px-6 whitespace-nowrap">
                            Web Development Web Development
                        </td>
                        <td className="py-4 px-6">
                            BSIT - IV
                        </td>
                        <td className="py-4 px-6 text-center">
                            34
                        </td>
                        <td className="py-4 px-6 text-center">
                            32
                        </td>
                        <td className="py-4 px-6 text-center">
                            2
                        </td>
                    </tr>
                    <tr id='qweqweqwe' className="border-b bg-slate-700 border-slate-700 hover:cursor-pointer hover:bg-slate-500">
                        <td scope="row" className="py-4 px-6 whitespace-nowrap">
                            Web Development Web Development
                        </td>
                        <td className="py-4 px-6">
                            BSIT - IV
                        </td>
                        <td className="py-4 px-6 text-center">
                            34
                        </td>
                        <td className="py-4 px-6 text-center">
                            32
                        </td>
                        <td className="py-4 px-6 text-center">
                            2
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Modal modalVisible={modalVisible} modalClose={()=>setModalVisible(false)}>
            asdasd
        </Modal>
    </>
}