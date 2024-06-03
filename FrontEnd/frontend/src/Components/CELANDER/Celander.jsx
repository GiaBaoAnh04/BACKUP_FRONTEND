// // Celander.js
// import React, { useState } from 'react';
// import CelanderTop from '../celanderTop'; // Điều chỉnh đường dẫn import nếu cần
// import CelanderCLD from './celanderCLD'; // Điều chỉnh đường dẫn import nếu cần
// import CelendarStaff from './celanderStaff'; // Điều chỉnh đường dẫn import nếu cần
// import AddWorkshift from './AddWorkshift'; // Đúng tên tệp nếu cần
// import './Celander.css';
// import CelanderAdd from './celanderCLDAdd';

// export default function Celander() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showAddWorkShift, setShowAddWorkShift] = useState(false); // State để điều khiển hiển thị AddWorkshift
//     const [selectedDate, setSelectedDate] = useState(null);

//     const handleSearch = (value) => {
//         setSearchTerm(value); // Cập nhật từ khóa tìm kiếm
//     };

//     // Hàm xử lý khi ngày được chọn trong CelanderAdd
//     const handleDateSelect = (date) => {
//         setSelectedDate(date); // Cập nhật ngày đã chọn
//     };

//     return (
//         <div className='w-full h-full overflow-hidden'>
//             <div className='flex flex-col w-full h-full overflow-hidden'>
//                 <CelanderTop onSearch={handleSearch} triggerAddWorkShift={setShowAddWorkShift} />
//                 <div className='flex flex-1 h-full'>
//                     <div className='flex-1 flex items-center'>
//                         <CelanderCLD />
//                     </div>
//                     <div className='flex-1 h-auto mt-4'>
//                         <CelendarStaff searchTerm={searchTerm} />
//                     </div>
//                 </div>
//             </div>
//             <div className='fixed top-0 right-0 w-2/5 h-full rounded-xl  pt-0 text-primary--color'>
//                 {showAddWorkShift && ( // Hiển thị component AddWorkshift nếu showAddWorkShift là true
//                     <AddWorkshift trigger={setShowAddWorkShift} setTrigger={setShowAddWorkShift} onDateSelect={handleDateSelect}>
//                         <div className="pb-1 text-lg border-b">
//                             <h2 className="">Phân chia công việc</h2>
//                         </div>
//                         <div className="flex flex-col gap-4">
//                             <div className="flex flex-col">
//                                 <div className='flex gap-16 items-center mt-5'>
//                                     <span className="">Chọn ngày</span>
//                                     {/* Hiển thị ngày được chọn từ CelanderAdd */}
//                                     <label className='border-2 flex justify-center items-center h-8 w-60 border-border--color rounded-md px-2'>{selectedDate ? selectedDate.toDateString() : ''}</label>
//                                 </div>
//                                 <div className='flex items-center justify-center mt-4'>
//                                     <CelanderAdd onDateSelect={handleDateSelect} />
//                                 </div>
//                             </div>
//                             <div className='flex flex-col h-40'>
//                                 <div className="choose_shift flex mt-1 gap-20 items-center">
//                                     <span>Chọn ca </span>
//                                     <input type="text" className="border-2 h-7 border-border--color rounded-md px-2" />
                                    
//                                 </div>
//                                 <div className="flex mt-2 gap-6 items-center">
//                                     <span>Chọn nhân viên </span>
//                                     <input type="text" className="border-2 h-7 border-border--color rounded-md px-2" />
                                    
//                                 </div>
//                                 <div className="choose-workshift_footer flex mt-4 justify-center">
//                                     <button className="border w-32 h-8 rounded-md bg-primary--color text-white--color">Tạo việc</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </AddWorkshift>
//                 )}
//             </div>
//         </div>
//     );
// }

// Celander.js


import React, { useState, useEffect } from 'react';
import CelanderTop from './celanderTop';
import CelanderCLD from './celanderCLD';
import CelendarStaff from './celanderStaff';
import AddWorkshift from './AddWorkshift';
import './Celander.css';
import CelanderAdd from './celanderCLDAdd';
import Overlay from "./overlay.js";
import axios from 'axios';

const SHIFTADD_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/shift/add';
const SHIFTWORKADD_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/add';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzA2Nzk3MSwiaWF0IjoxNzE3MDU3MTcxLCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfUEFZTUVOVF9JTkZPUyBWRVJJRllfT1JERVIgR0VUX0NVU1RPTUVSX0lORk9TIElNUE9SVF9XT1JLX0NSRUFURSBDVVNUT01FUiBHRVRfTVlfUEFZTUVOVFMgQ1JFQVRFX09SREVSIENBTkNMRV9PUkRFUiBHRVRfTVlfQk9PS1MgQURNSU4gQURNSU5fTUFOQUdFIn0.IXk6zmUlSfYrmcZuMW2zeulUbSAcSjHHDRvMx6KgkFs';
const STAFFALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/all';

function getShiftTimes(shiftwork, date) {
    const baseDate = new Date(date);
    let startTime, endTime;

    switch (shiftwork) {
        case '1':
            startTime = new Date(baseDate.setHours(6, 0, 0, 0));
            endTime = new Date(baseDate.setHours(9, 0, 0, 0));
            break;
        case '2':
            startTime = new Date(baseDate.setHours(9, 0, 0, 0));
            endTime = new Date(baseDate.setHours(12, 0, 0, 0));
            break;
        case '3':
            startTime = new Date(baseDate.setHours(12, 0, 0, 0));
            endTime = new Date(baseDate.setHours(15, 0, 0, 0));
            break;
        // Add more cases as needed for different shifts
        default:
            startTime = baseDate;
            endTime = baseDate;
    }

    return {
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString()
    };
}

export default function Celander() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddWorkShift, setShowAddWorkShift] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [shiftwork, setShiftWork] = useState('');
    const [staffwork, setStaffWork] = useState('');
    const [stafflistdata, setStaffListData] = useState([]);
    const [searchStaff, setSearchStaff] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const openDialog = () => {
        setShowAddWorkShift(true);
        setOverlayVisible(true);
    };

    const closeDialog = () => {
        setShowAddWorkShift(false);
        setOverlayVisible(false);
    };

    const handleAddShift = async (event) => {
        event.preventDefault();

        const requestData = {
            staff_id: staffwork,
            shift_id: shiftwork,
            hasWorkThisShift: true,
          //  day: selectedDate
        };
        
        const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

        // Get the shift times based on the selected shiftwork and date
        const { start_time, end_time } = getShiftTimes(shiftwork, formattedDate);
    
        const requestShiftData = {
            start_time: start_time,
            end_time: end_time,
            description: null,
        };

        try {
            const response = await axios.post(SHIFTADD_URL, requestShiftData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shift added:', response.data);
            // Reset form fields
            setStaffWork('');
            setShiftWork('');
            setSelectedDate(null);
            closeDialog();
        } catch (error) {
            console.error('Error adding shift:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }

        try {
            const response = await axios.post(SHIFTWORKADD_URL, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shift added:', response.data);
            // Reset form fields
            setStaffWork('');
            setShiftWork('');
            setSelectedDate(null);
            closeDialog();
        } catch (error) {
            console.error('Error adding shift:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    useEffect(() => {
        localStorage.setItem('token', token);
    
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(STAFFALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setStaffListData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response.data);
                }
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='w-full h-full overflow-hidden '>
            <div className='flex flex-col w-full h-full lg:overflow-hidden overflow-y-auto '>
                <CelanderTop onSearch={handleSearch} triggerAddWorkShift={openDialog} />
                <div className='flex lg:flex-row lg:flex-1 h-full flex-col  text-xs '>
                    <div className='lg:flex-1 lg:flex lg:items-center'>
                        <CelanderCLD />
                    </div>
                    <div className='lg:flex-1 h-auto mt-4 px-3'>
                        <CelendarStaff searchTerm={searchTerm} />
                    </div>
                </div>
            </div>

            {showAddWorkShift && (
                <AddWorkshift trigger={setShowAddWorkShift} setTrigger={setShowAddWorkShift} onDateSelect={handleDateSelect}>
                    <Overlay isOpen={overlayVisible} onClose={closeDialog}>
                        <form onSubmit={handleAddShift}>
                            <div className="pb-2 top-0 text-lg border-b h-10">
                                <h2 className="">Phân chia công việc</h2>
                            </div>
                            <div className="flex flex-col gap-4 text-xs">
                                <div className="flex flex-col h-full">
                                    <div className='flex gap-10 items-center mt-5 h-1/4'>
                                        <span className="">Chọn ngày</span>
                                        <label className='border-2 flex justify-center items-center h-8 md:w-60  w-40 border-border--color rounded-md md:px-2'>
                                            {selectedDate ? selectedDate.toDateString() : ''}
                                        </label>
                                    </div>
                                    <div className='flex items-center justify-center mt-4 h-3/6'>
                                        <CelanderAdd onDateSelect={handleDateSelect}/>
                                    </div>
                                </div>
                                <div className='flex flex-col h-40'>
                                    <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
                                        <span>Chọn ca </span>
                                        <input 
                                            type="text" 
                                            value={shiftwork} 
                                            onChange={(e) => setShiftWork(e.target.value)}
                                            name='shift' 
                                            className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0  w-40" 
                                        />
                                    </div>
                                    <div className="flex mt-2 gap-6 items-center">
                                        <span>Chọn nhân viên </span>
                                        <select
                                            value={staffwork}
                                            onChange={(e) => setStaffWork(e.target.value)}
                                            name='staff'
                                            className="border-2 h-7 border-border--color rounded-md px-2 w-40"
                                            >
                                            <option value="">Chọn nhân viên</option>
                                            {stafflistdata.map((staff, index) => (
                                                <option key={index} value={staff.id}>
                                                    {staff.fullname} - NV{staff.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="choose-workshift_footer flex mt-4 justify-center">
                                        <button 
                                           onClick={handleAddShift}
                                            className="border w-32 h-8 rounded-md bg-primary--color text-white--color"
                                        >
                                            Tạo việc
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Overlay>
                </AddWorkshift>
            )}
        </div>
    );
}