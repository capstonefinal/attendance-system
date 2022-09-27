import { useState } from 'react';
import Modal from '../components/Modal';

export default function Profile() {
    const [modalVisible, setModalVisible] = useState(false)
    return <>
        <div className="overflow-clip w-full items-center justify-center flex flex-col">
            <p className="w-full text-6xl mb-20 text-center">Profile</p>
        </div>
        <Modal modalVisible={modalVisible} modalClose={() => setModalVisible(false)}>
            Subject child
        </Modal>
    </>
}