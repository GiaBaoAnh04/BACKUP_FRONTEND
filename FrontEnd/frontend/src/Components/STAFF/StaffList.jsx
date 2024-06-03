// import React, { useState, useEffect } from 'react';
// import { IoSearchOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const STAFFALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/all';
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNjk2NzEzOCwiaWF0IjoxNzE2OTYzNTM4LCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQ1JFQVRFX09SREVSIENBTkNMRV9PUkRFUiBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgSU1QT1JUX1dPUktfVVBEQVRFIEdFVF9DVVNUT01FUl9JTkZPUyBHRVRfUEFZTUVOVF9JTkZPUyBJTVBPUlRfV09SS19ERUxFVEUgSU1QT1JUX1dPUktfRklORCBWRVJJRllfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.p1Uei916i8x1JGnXsfJ7oqAH6LYwwZ35f0vi6B0_Gq0';

// export default function StaffList() {
//     const [stafflistdata, setStaffListData] = useState([]);
//     const [searchStaff, setSearchStaff] = useState('');

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

//     const handleSearchStaff = (event) => {
//         const value = event.target.value;
//         setSearchStaff(value);
//     };

//     const filteredData = stafflistdata.filter((item) =>
//         item.StaffId.toLowerCase().includes(searchStaff.toLowerCase()) ||
//         item.Gender.toLowerCase().includes(searchStaff.toLowerCase()) ||
//         item.StaffName.toLowerCase().includes(searchStaff.toLowerCase()) ||
//         item.DayOfBirth.toLowerCase().includes(searchStaff.toLowerCase()) ||
//         item.Email.toLowerCase().includes(searchStaff.toLowerCase()) ||
//         item.PhoneNumber.toLowerCase().includes(searchStaff.toLowerCase())
//     );

//     return (
//         <div className='w-full h-full'>
//             <div className="list-chat-search relative flex w-full border-b h-16 -top-0 border-border--lightcolor">
//                 <div className='w-2/5 relative flex items-center'>
//                     <input 
//                         type="text" 
//                         value={searchStaff} 
//                         placeholder="Tìm kiếm" 
//                         className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" 
//                         onChange={handleSearchStaff} 
//                     />
//                     <span className='text-xl absolute right-3 text-primary--color '><IoSearchOutline/></span>
//                 </div>
//             </div>

//             <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-hidden">
//                 <div className="overflow-auto md:overflow-hidden md:full w-96 ml-3 sm:w-[96%]">
//                     <table className="w-full">
//                         <thead className="text-primary--color">
//                             <tr>
//                                 <th className='w-1/5 text-center'>Mã nhân viên</th>
//                                 <th className='w-1/3 text-center'>Tên nhân viên</th>
//                                 <th className='w-2/12 text-center'>Giới tính</th>
//                                 <th className='w-1/3 text-center'>Ngày sinh</th>
//                                 <th className='w-1/5 text-center'>Email</th>
//                                 <th className='w-1/3 text-center'>Số điện thoại</th>
//                             </tr>
//                         </thead>
//                         <tbody className="KH_maincontent_footer_content_detail divide-y">
//                             {filteredData.map((item) => (
//                                 <tr key={item.StaffId} className="hover:bg-backgrond--color hover:no-underline shadow py-2">
//                                     <td className="w-1/5 text-center">
//                                         <Link to={`/NhanVien/${item.StaffId}`} className="hover:underline">{item.StaffId}</Link>
//                                     </td>
//                                     <td className="w-1/3 text-center">{item.StaffName}</td>
//                                     <td className="w-2/12 text-center">{item.Gender}</td>
//                                     <td className="w-1/3 text-center">{item.DayOfBirth}</td>
//                                     <td className="w-1/5 text-center">{item.Email}</td>
//                                     <td className="w-1/3 text-center">{item.PhoneNumber}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';

const STAFFALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNjk5OTQ1NiwiaWF0IjoxNzE2OTk1ODU2LCJzY29wZSI6IkFETUlOIEFETUlOX01BTkFHRSBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgR0VUX1BBWU1FTlRfSU5GT1MgR0VUX0NVU1RPTUVSX0lORk9TIElNUE9SVF9XT1JLX0ZJTkQgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0RFTEVURSBWRVJJRllfT1JERVIgQ1VTVE9NRVIgR0VUX01ZX1BBWU1FTlRTIENSRUFURV9PUkRFUiBHRVRfTVlfQk9PS1MgQ0FOQ0xFX09SREVSIn0.oIhzzNqAlBonnLVyIAPMkRCuyjHW2_QAsXWu-venkSE';


export default function StaffList() {
    const [stafflistdata, setStaffListData] = useState([]);
    const [searchStaff, setSearchStaff] = useState('');

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

    const handleSearchStaff = (event) => {
        const value = event.target.value;
        setSearchStaff(value);
    };

    const filteredData = stafflistdata.filter((item) =>
        item.id.toString().toLowerCase().includes(searchStaff.toLowerCase()) ||
        (item.gender ? 'male' : 'female').toLowerCase().includes(searchStaff.toLowerCase()) ||
        item.fullname.toLowerCase().includes(searchStaff.toLowerCase()) ||
        item.birthday.toLowerCase().includes(searchStaff.toLowerCase()) ||
        item.phonenumber.toLowerCase().includes(searchStaff.toLowerCase())
    );

    return (
        <div className='w-full h-full'>
            <div className="list-chat-search relative flex w-full border-b h-16 -top-0 border-border--lightcolor">
                <div className='w-2/5 relative flex items-center'>
                    <input 
                        type="text" 
                        value={searchStaff} 
                        placeholder="Tìm kiếm" 
                        className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" 
                        onChange={handleSearchStaff} 
                    />
                    <span className='text-xl absolute right-3 text-primary--color '><IoSearchOutline/></span>
                </div>
            </div>

            <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-hidden">
                <div className="overflow-auto md:overflow-hidden md:full w-96 ml-3 sm:w-[96%] lg:w-full lg:ml-0">
                    <table className="w-full">
                        <thead className="text-primary--color whitespace-nowrap">
                            <tr>
                                <th className='w-1/6 text-center'>Mã nhân viên</th>
                                <th className='w-1/5 text-center'>Tên nhân viên</th>
                                <th className='w-1/6 text-center'>Giới tính</th>
                                <th className='w-1/6 text-center'>Ngày sinh</th>
                                <th className='w-1/6 text-center'>Số điện thoại</th>
                                <th className='w-1/6 text-center'>Lương</th>
                                <th className='w-1/6 text-center'>Chức vụ</th>

                            </tr>
                        </thead>
                        <tbody className="KH_maincontent_footer_content_detail divide-y">
                            {filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-backgrond--color hover:no-underline shadow py-2 whitespace-nowrap">
                                    <td className="w-1/12 text-center">
                                        <Link to={`/NhanVien/${item.id}`} className="hover:underline">{item.id}</Link>
                                    </td>
                                    <td className="w-1/5 text-center">{item.fullname}</td>
                                    <td className="w-1/12 text-center">{item.gender ? 'Nam' : 'Nữ'}</td>
                                    <td className="w-1/6 text-center">{new Date(item.birthday).toLocaleDateString()}</td>
                                    <td className="w-1/6 text-center">{item.phonenumber}</td>
                                    <td className="w-1/6 text-center">{item.salary}</td>
                                    <td className="w-1/6 text-center">{item.id == 1 ?  "Admin":"Nhân viên"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
