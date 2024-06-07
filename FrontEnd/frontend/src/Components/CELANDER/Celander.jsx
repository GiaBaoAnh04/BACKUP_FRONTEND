// import React, { useState, useEffect } from 'react';
// import CelanderTop from './celanderTop';
// import CelanderCLD from './celanderCLD';
// import CelendarStaff from './celanderStaff';
// import AddWorkshift from './AddWorkshift';
// import './Celander.css';
// import CelanderAdd from './celanderCLDAdd';
// import Overlay from "./overlay.js";
// import axios from 'axios';

// const SHIFTADD_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/shift/add';
// const SHIFTWORKADD_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/add';
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzc4NDgwMSwiaWF0IjoxNzE3Nzc0MDAxLCJzY29wZSI6IlNUQUZGIEdFVF9QQVlNRU5UX0lORk9TIElNUE9SVF9XT1JLX0NSRUFURSBJTVBPUlRfV09SS19GSU5EIElNUE9SVF9XT1JLX0RFTEVURSBJTVBPUlRfV09SS19VUERBVEUgVkVSSUZZX09SREVSIEdFVF9DVVNUT01FUl9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgQ1JFQVRFX09SREVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQURNSU4gQURNSU5fTUFOQUdFIn0.t7ecIQwVFvr1JVUP8jwGPNQd7a2cje_N_6q8_GhBCxE';
// const STAFFALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/all';
// const SCHEDULEALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/all';

// function getShiftTimes(shiftwork, date) {
//     const baseDate = new Date(date);
//     let startTime, endTime;

//     switch (shiftwork) {
//         case '1':
//             startTime = new Date(baseDate.setHours(6, 0, 0, 0));
//             endTime = new Date(baseDate.setHours(9, 0, 0, 0));
//             break;
//         case '2':
//             startTime = new Date(baseDate.setHours(9, 0, 0, 0));
//             endTime = new Date(baseDate.setHours(12, 0, 0, 0));
//             break;
//         case '3':
//             startTime = new Date(baseDate.setHours(12, 0, 0, 0));
//             endTime = new Date(baseDate.setHours(15, 0, 0, 0));
//             break;
//         // Add more cases as needed for different shifts
//         default:
//             startTime = baseDate;
//             endTime = baseDate;
//     }

//     return {
//         start_time: startTime.toISOString(),
//         end_time: endTime.toISOString()
//     };
// }

// export default function Celander() {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showAddWorkShift, setShowAddWorkShift] = useState(false);
//     const [showUpdateWorkShift, setShowUpdateWorkShift] = useState(false);
//     const [overlayVisible, setOverlayVisible] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [shiftwork, setShiftWork] = useState('');
//     const [staffwork, setStaffWork] = useState('');
//     const [stafflistdata, setStaffListData] = useState([]);
//     const [searchStaff, setSearchStaff] = useState('');
//     const [staffShiftWork, setStaffShiftWork] = useState(null);
//     const [selectedUpdateDate, setSelectedUpdateDate] = useState(null);
//     const [updateShiftWork, setUpdateShiftWork] = useState('');
//     const [updateStaffWork, setUpdateStaffWork] = useState('');
//     const [workShiftId, setworkShiftId] = useState('');

//     const url = `https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/update/info/${workShiftId}`;

//     const handleSearch = (value) => {
//         setSearchTerm(value);
//     };

//     const handleDateSelect = (date) => {
//         setSelectedDate(date);
//         setSelectedUpdateDate(date)
//     };

//     const openDialog = () => {
//         setShowAddWorkShift(true);
//         setOverlayVisible(true);
//     };

//     const closeDialog = () => {
//         setShowAddWorkShift(false);
//         setOverlayVisible(false);
//     };

//     const openUpdateDialog = () => {
//         setShowUpdateWorkShift(true);
//         setOverlayVisible(true);
//     };

//     const closeUpdateDialog = () => {
//         setShowUpdateWorkShift(false);
//         setOverlayVisible(false);
//     };

//     const handleAddShift = async (event) => {
//         event.preventDefault();

//         const requestData = {
//             staff_id: staffwork,
//             shift_id: shiftwork,
//             hasWorkThisShift: true,
//           //  day: selectedDate
//         };
        
//         const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

//         // Get the shift times based on the selected shiftwork and date
//         const { start_time, end_time } = getShiftTimes(shiftwork, formattedDate);
    
//         const requestShiftData = {
//             start_time: start_time,
//             end_time: end_time,
//             description: null,
//         };

//         try {
//             const response = await axios.post(SHIFTADD_URL, requestShiftData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log('Shift added:', response.data);
//             // Reset form fields
//             setStaffWork('');
//             setShiftWork('');
//             setSelectedDate(null);
//             closeDialog();
//         } catch (error) {
//             console.error('Error adding shift:', error);
//             if (error.response?.data) {
//                 console.error("Error response:", error.response.data);
//             }
//         }

//         try {
//             const response = await axios.post(SHIFTWORKADD_URL, requestData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log('Shift added:', response.data);
//             // Reset form fields
//             setStaffWork('');
//             setShiftWork('');
//             setSelectedDate(null);
//             closeDialog();
//         } catch (error) {
//             console.error('Error adding shift:', error);
//             if (error.response?.data) {
//                 console.error("Error response:", error.response.data);
//             }
//         }
//     };

//     useEffect(() => {
//         localStorage.setItem('token', token);
    
//         const fetchUserData = async () => {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 console.error('No token found, please log in.');
//                 return;
//             }

//             try {
//                 const response = await axios.get(STAFFALL_URL, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const result = response.data.result;
//                 setStaffListData(result);
//                 console.log(result);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 if (error.response?.data) {
//                     console.error("Error response:", error.response.data);
//                 }
//             }
//         };

//         fetchUserData();
//     }, []);


//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 console.error('No token found, please log in.');
//                 return;
//             }

//             try {
//                 const response = await axios.get(STAFFALL_URL, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const result = response.data.result;
//                 setStaffListData(result);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 if (error.response?.data) {
//                     console.error("Error response:", error.response.data);
//                 }
//             }
//         };

//         fetchUserData();
//     }, []);

//     useEffect(() => {
//         const fetchShiftData = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 console.error('No token found, please log in.');
//                 return;
//             }

//             try {
//                 const response = await axios.get(SCHEDULEALL_URL, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 const result = response.data.result;
//                 const foundShift = result.find(shift => shift.shift.id === parseInt(workShiftId, 10));
//                 if (foundShift) {
//                     setStaffShiftWork(foundShift);
//                     setSelectedDate(new Date(foundShift.shift.start_time));
//                     setShiftWork(foundShift.shift.id);
//                     setStaffWork(foundShift.fullname);
//                 }
//             } catch (error) {
//                 console.error('Error fetching shift data:', error);
//                 if (error.response?.data) {
//                     console.error("Error response:", error.response?.data);
//                 }
//             }
//         };

//         fetchShiftData();
//     }, [workShiftId]);

//     if (!workShiftId) {
//         return <div>Loading...</div>;
//     }

//     const handleUpdateShift = async (event) => {
//         event.preventDefault();

//         const token = localStorage.getItem('token');
//         if (!token) {
//             console.error('No token found, please log in.');
//             return;
//         }

//         const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
//         const { start_time, end_time } = getShiftTimes(updateShiftWork, formattedDate);

//         const requestShiftData = {
//             start_time: start_time,
//             end_time: end_time,
//             description: null
//         };

//         try {
//             const response = await axios.patch(url, requestShiftData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log('Shift updated:', response.data);

//         } catch (error) {
//             console.error('Error updating shift:', error);
//             if (error.response?.data) {
//                 console.error("Error response:", error.response.data);
//             }
//         }
//     };

//     return (
//         <div className='w-full h-full overflow-hidden '>
//             <div className='flex flex-col w-full h-full lg:overflow-hidden overflow-y-auto '>
//                 <CelanderTop onSearch={handleSearch} triggerAddWorkShift={openDialog} triggerUpdateWorkShift={openUpdateDialog} />
//                 <div className='flex lg:flex-row lg:flex-1 h-full flex-col  text-xs '>
//                     <div className='lg:flex-1 lg:flex lg:items-center'>
//                         <CelanderCLD />
//                     </div>
//                     <div className='lg:flex-1 h-auto mt-4 px-3'>
//                         <CelendarStaff searchTerm={searchTerm} />
//                     </div>
//                 </div>
//             </div>

//             {showAddWorkShift && (
//                 <AddWorkshift trigger={setShowAddWorkShift} setTrigger={setShowAddWorkShift} onDateSelect={handleDateSelect}>
//                     <Overlay isOpen={overlayVisible} onClose={closeDialog}>
//                         <form onSubmit={handleAddShift}>
//                             <div className="pb-2 top-0 text-lg border-b h-10">
//                                 <h2 className="">Phân chia công việc</h2>
//                             </div>
//                             <div className="flex flex-col gap-4 text-xs">
//                                 <div className="flex flex-col h-full">
//                                     <div className='flex gap-10 items-center mt-5 h-1/4'>
//                                         <span className="">Chọn ngày</span>
//                                         <label className='border-2 flex justify-center items-center h-8 md:w-60  w-40 border-border--color rounded-md md:px-2'>
//                                             {selectedDate ? selectedDate.toDateString() : ''}
//                                         </label>
//                                     </div>
//                                     <div className='flex items-center justify-center mt-4 h-3/6'>
//                                         <CelanderAdd onDateSelect={handleDateSelect}/>
//                                     </div>
//                                 </div>
//                                 <div className='flex flex-col h-40'>
//                                     <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
//                                         <span>Chọn ca </span>
//                                         <input 
//                                             type="text" 
//                                             value={shiftwork} 
//                                             onChange={(e) => setShiftWork(e.target.value)}
//                                             name='shift' 
//                                             className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0  w-40" 
//                                         />
//                                     </div>
//                                     <div className="flex mt-2 gap-6 items-center">
//                                         <span>Chọn nhân viên </span>
//                                         <select
//                                             value={staffwork}
//                                             onChange={(e) => setStaffWork(e.target.value)}
//                                             name='staff'
//                                             className="border-2 h-7 border-border--color rounded-md px-2 w-40"
//                                             >
//                                             <option value="">Chọn nhân viên</option>
//                                             {stafflistdata.map((staff, index) => (
//                                                 <option key={index} value={staff.id}>
//                                                     {staff.fullname} - NV{staff.id}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="choose-workshift_footer flex mt-4 justify-center">
//                                         <button 
//                                            onClick={handleAddShift}
//                                             className="border w-32 h-8 rounded-md bg-primary--color text-white--color"
//                                         >
//                                             Tạo việc
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </Overlay>
//                 </AddWorkshift>
//             )}

//             {showUpdateWorkShift && (
//                 <AddWorkshift trigger={setShowUpdateWorkShift} setTrigger={setShowUpdateWorkShift} onDateSelect={handleDateSelect}>
//                     <Overlay isOpen={overlayVisible} onClose={closeDialog}>
//                         <form onSubmit={handleUpdateShift}>
//                             <div className="pb-2 top-0 text-lg border-b h-10">
//                                 <h2 className="">Phân chia công việc</h2>
//                             </div>
//                             <div className="flex flex-col gap-4 text-xs">
//                                 <div className="flex flex-col h-full">
//                                     <div className='flex gap-10 items-center mt-5 h-1/4'>
//                                         <span className="">Chọn ngày</span>
//                                         <label className='border-2 flex justify-center items-center h-8 md:w-60 w-40 border-border--color rounded-md md:px-2'>
//                                             {selectedUpdateDate ? selectedUpdateDate.toDateString() : ''}
//                                         </label>
//                                     </div>
//                                     <div className='flex items-center justify-center mt-4 h-3/6'>
//                                         <CelanderAdd onDateSelect={handleDateSelect} />
//                                     </div>
//                                 </div>
//                                 <div className='flex flex-col h-40'>
//                                     <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
//                                         <span>Chọn ca ban đầu</span>
//                                         <select
//                                             value={workShiftId}
//                                             onChange={(e) => setworkShiftId(e.target.value)}
//                                             name='staff'
//                                             className="border-2 h-7 border-border--color rounded-md px-2 w-40"
//                                         >
//                                             <option value="">Chọn nhân viên</option>
//                                             {staffShiftWork.map((staff, index) => (
//                                                 <option key={index} value={staff.shift.id}>
//                                                     {staff.fullname} - NV{staff.id}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
//                                         <span>Chọn ca mới</span>
//                                         <input
//                                             type="text"
//                                             value={updateShiftWork}
//                                             onChange={(e) => setUpdateShiftWork(e.target.value)}
//                                             name='shift'
//                                             className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0 w-40"
//                                         />
                                       
//                                     </div>
//                                     <div className="flex mt-2 gap-6 items-center">
//                                         <span>Chọn nhân viên </span>
//                                         <select
//                                             value={updateStaffWork}
//                                             onChange={(e) => setUpdateStaffWork(e.target.value)}
//                                             name='staff'
//                                             className="border-2 h-7 border-border--color rounded-md px-2 w-40"
//                                         >
//                                             <option value="">Chọn nhân viên</option>
//                                             {staffListData.map((staff, index) => (
//                                                 <option key={index} value={staff.id}>
//                                                     {staff.fullname} - NV{staff.id}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="choose-workshift_footer flex mt-4 justify-center">
//                                         <button
//                                             type="submit"
//                                             className="border w-32 h-8 rounded-md bg-primary--color text-white--color"
//                                         >
//                                             Cập nhật
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </Overlay>
//                 </AddWorkshift>
//             )}
//         </div>
//     );
// }


import React, { useState, useEffect } from 'react';
import CelanderTop from './celanderTop';
import CelanderCLD from './celanderCLD';
import CelendarStaff from './celanderStaff';
import AddWorkshift from './AddWorkshift';
import UpdateWorkshift from './AddWorkshift';
import './Celander.css';
import CelanderAdd from './celanderCLDAdd';
import Overlay from "./overlay.js";
import axios from 'axios';



const Celander = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddWorkShift, setShowAddWorkShift] = useState(false);
    const [showUpdateWorkShift, setShowUpdateWorkShift] = useState(false);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [shiftwork, setShiftWork] = useState('');
    const [staffwork, setStaffWork] = useState('');
    const [staffListData, setStaffListData] = useState([]);
    const [shift_id, setShift_id] = useState('');
    const [staff_id, setStaff_id] = useState('');
    const [workShiftId, setworkShiftId] = useState('');
    const [selectedShifts, setSelectedShifts] = useState([]);


    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzc4NDgwMSwiaWF0IjoxNzE3Nzc0MDAxLCJzY29wZSI6IlNUQUZGIEdFVF9QQVlNRU5UX0lORk9TIElNUE9SVF9XT1JLX0NSRUFURSBJTVBPUlRfV09SS19GSU5EIElNUE9SVF9XT1JLX0RFTEVURSBJTVBPUlRfV09SS19VUERBVEUgVkVSSUZZX09SREVSIEdFVF9DVVNUT01FUl9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgQ1JFQVRFX09SREVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQURNSU4gQURNSU5fTUFOQUdFIn0.t7ecIQwVFvr1JVUP8jwGPNQd7a2cje_N_6q8_GhBCxE';
    const SHIFTADD_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/shift/add';
    const SHIFTWORKADD_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/add';
    const STAFFALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/all';
    const SCHEDULEALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/all';
    const url = `https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/update/${staff_id}&${shift_id}`;


    const [shiftlistdata, setShiftListData] = useState([]);


    useEffect (() =>{
        localStorage.setItem('token', token);

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(SCHEDULEALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setShiftListData(result);
                console.log(result);
            }catch(error){
                console.error('Error fetching user data:', error);
                if(error.response?.data){
                    console.error("Error response:", error.response?.data)
                }
            }
        };
        fetchUserData();
    },[])

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(STAFFALL_URL, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = response.data.result;
                setStaffListData(result);
            } catch (error) {
                console.error('Error fetching user data:', error.response?.data || error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchShiftData = async () => {
            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(SCHEDULEALL_URL, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = response.data.result;
                const foundShift = result.find(shift => shift.shift.id === parseInt(workShiftId, 10));
                if (foundShift) {
                    setSelectedDate(new Date(foundShift.shift.start_time));
                    setShiftWork(foundShift.shift.id);
                    setStaffWork(foundShift.fullname);
                }
            } catch (error) {
                console.error('Error fetching shift data:', error.response?.data || error);
            }
        };

        if (workShiftId) {
            fetchShiftData();
        }
    }, [workShiftId]);

    const handleSearch = (value) => setSearchTerm(value);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    
    const openDialog = () => {
        setShowAddWorkShift(true);
        setShowUpdateWorkShift(false);
        setOverlayVisible(true);
    };

    const closeDialog = () => {
        setShowAddWorkShift(false);
        
        setOverlayVisible(false);
    };

    const openUpdateDialog = () => {
        setShowUpdateWorkShift(true);
        setShowAddWorkShift(false);
        setOverlayVisible(true);
    };

    const closeUpdateDialog = () => {
        setShowUpdateWorkShift(false);
        setOverlayVisible(false);
    };

    const getShiftTimes = (shiftwork, date) => {
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
    };

    const handleAddShift = async (event) => {
        event.preventDefault();

        const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
        const { start_time, end_time } = getShiftTimes(shiftwork, formattedDate);

        const requestShiftData = {
            start_time,
            end_time,
            description: null
        };

        const requestData = {
            staff_id: staffwork,
            shift_id: shiftwork,
            hasWorkThisShift: true
        };

        try {
            const shiftResponse = await axios.post(SHIFTADD_URL, requestShiftData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shift added:', shiftResponse.data);

            const shiftworkResponse = await axios.post(SHIFTWORKADD_URL, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shiftwork added:', shiftworkResponse.data);

            // Reset form fields
            setStaffWork('');
            setShiftWork('');
            setSelectedDate(null);
            closeDialog();
        } catch (error) {
            console.error('Error adding shift:', error.response?.data || error);
        }
    };

    const handleUpdateShift = async (event) => {
        event.preventDefault();
        
        const requestShiftData = {
        
            staff_id: shiftwork,
            shift_id: staffwork,
            hasWorkThisShift: true
        };

        try {
            const response = await axios.patch(url, requestShiftData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Shift updated:', response.data);
            closeUpdateDialog();
        } catch (error) {
            console.error('Error updating shift:', error.response?.data || error);
        }
    };

    const handleWorkShiftChange = (index, value) => {
        setSelectedShifts(prevShifts => {
          const updatedShifts = [...prevShifts];
          updatedShifts[index] = value;
          return updatedShifts;
        });
      };

    return (
        <div className='w-full h-full overflow-hidden'>
            <div className='flex flex-col w-full h-full lg:overflow-hidden overflow-y-auto'>
                <CelanderTop onSearch={handleSearch} triggerAddWorkShift={openDialog} triggerUpdateWorkShift={openUpdateDialog} />
            
                <div className='flex lg:flex-row lg:flex-1 h-full flex-col text-xs'>
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
                                        <label className='border-2 flex justify-center items-center h-8 md:w-60 w-40 border-border--color rounded-md md:px-2'>
                                            {selectedDate ? selectedDate.toDateString() : ''}
                                        </label>
                                    </div>
                                    <div className='flex items-center justify-center mt-4 h-3/6'>
                                        <CelanderAdd onDateSelect={handleDateSelect} />
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
                                            className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0 w-40"
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
                                            {staffListData.map((staff, index) => (
                                                <option key={index} value={staff.id}>
                                                    {staff.fullname} - NV{staff.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="choose-workshift_footer flex mt-4 justify-center">
                                        <button
                                            type="submit"
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

            {showUpdateWorkShift && (
                <UpdateWorkshift trigger={setShowUpdateWorkShift} setTrigger={setShowUpdateWorkShift} onDateSelect={handleDateSelect}>
                    <Overlay isOpen={overlayVisible} onClose={closeDialog}>
                        <form onSubmit={handleUpdateShift}>
                            <div className="pb-2 top-0 text-lg border-b h-10">
                                <h2 className="">Phân chia công việc</h2>
                            </div>
                            <div className="flex flex-col gap-4 text-xs">
                                <div className="flex flex-col h-full">
                                    <div className='flex gap-10 items-center mt-5 h-1/4'>
                                        <span className="">Chọn ngày</span>
                                        <label className='border-2 flex justify-center items-center h-8 md:w-60 w-40 border-border--color rounded-md md:px-2' value={selectedDate}>
                                            {/* {selectedDate ? selectedDate.toDateString() : ''} */}
                                        </label>
                                    </div>
                                    <div className='flex items-center justify-center mt-4 h-3/6'>
                                        <CelanderAdd onDateSelect={handleDateSelect} />
                                    </div>
                                </div>
                                <div className='flex flex-col h-40'>
                                    <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
                                    {shiftlistdata.map((staff, index) => (
                                            <div key={index} className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
                                            <span>Chọn ca cũ</span>
                                            <select
                                                value={selectedShifts[index] || ''}
                                                onChange={(e) => handleWorkShiftChange(index, e.target.value)}
                                                name='staff'
                                                className="border-2 h-7 border-border--color rounded-md px-2 w-40"
                                            >
                                                <option value="">Chọn nhân viên - Ca</option>
                                                {shiftlistdata.map((shift, innerIndex) => (
                                                <option key={innerIndex} value={`${shift.shift.id}-${shift.staff_id}`}>
                                                    {`${shift.fullname} - NV${shift.shift.id}`}
                                                </option>
                                                ))}
                                            </select>
                                            </div>
                                        ))}
                                        </div>
                                    <div className="choose_shift flex mt-1 md:gap-20 lg:gap-16 gap-16 items-center">
                                        <span>Chọn ca mới</span>
                                        <input
                                            type="text"
                                            value={shiftwork}
                                            onChange={(e) => setShiftWork(e.target.value)}
                                            name='shift'
                                            className="border-2 h-7 border-border--color rounded-md px-2 ml-1 lg:ml-1 md:ml-0 w-40"
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
                                            {staffListData.map((staff, index) => (
                                                <option key={index} value={staff.staff_id} onChange={(e) => setStaff_id(e.target.value)}>
                                                    {staff.fullname} - NV{staff.staff_id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="choose-workshift_footer flex mt-4 justify-center">
                                        <button
                                            type="submit"
                                            className="border w-32 h-8 rounded-md bg-primary--color text-white--color"
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Overlay>
                </UpdateWorkshift>
            )}
        </div>
    );
};

export default Celander;
