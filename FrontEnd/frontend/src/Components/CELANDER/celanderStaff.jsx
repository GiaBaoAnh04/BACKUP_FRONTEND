import React, { useState, useEffect } from 'react';
import StaffWorkShift from '../../Data/JSON_DATA/staffWorkshift.json';
import axios from 'axios';



const SHIFTALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/schedule/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzc4NDgwMSwiaWF0IjoxNzE3Nzc0MDAxLCJzY29wZSI6IlNUQUZGIEdFVF9QQVlNRU5UX0lORk9TIElNUE9SVF9XT1JLX0NSRUFURSBJTVBPUlRfV09SS19GSU5EIElNUE9SVF9XT1JLX0RFTEVURSBJTVBPUlRfV09SS19VUERBVEUgVkVSSUZZX09SREVSIEdFVF9DVVNUT01FUl9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgQ1JFQVRFX09SREVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQURNSU4gQURNSU5fTUFOQUdFIn0.t7ecIQwVFvr1JVUP8jwGPNQd7a2cje_N_6q8_GhBCxE';


export default function CalendarMain({ searchTerm }) {
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
                const response = await axios.get(SHIFTALL_URL,{
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

    const filteredData = shiftlistdata.filter((item) =>
        item.shift?.id?.toString().includes(searchTerm.toLowerCase())
        || item.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.shift?.start_time?.includes(searchTerm.toLowerCase())
    );


    return (
        <div className="maincontent_right text-primary--color flex flex-col gap-4">
            <div className="staffcelander_titile p-2">
                <h2 className="sm:text-lg sm:font-medium text-xs">Danh sách lịch làm việc</h2>
            </div>
            <div className="staffcelander_content flex p-2 text-header--lightcolor border-t border-b w-11/12 text-xs sm:font-medium ">
                <div className="w-1/3">Ca</div>
                <div className="w-1/3">Ngày</div>
                <div className="w-1/3">Nhân viên</div>
            </div>
            <div className='overflow-auto h-96  '> {/* Xóa overflow-y-auto */}
                <div className="staffcelander_list overflow-y-auto  "> {/* Thêm overflow-y-auto */}
                    {filteredData.map((item, index) => (
                        <div key={index} className="work_item flex justify-around items-center px-4 pl-2 py-4 font-semibold text-gray-800 text-xs">
                            <div className="shift w-1/5">{item.shift?.id}</div>
                            <div className="daywork w-1/2  flex justify-center">{new Date(item.shift?.start_time).toLocaleDateString()}</div>
                            <div className="staffworkshift_inf w-1/2 flex justify-start items-center space-x-2 pl-4">
                            
                                <div className="staffnumber">{item.fullname}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
