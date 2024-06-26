import React from 'react';
import { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';


const CUSTOMERALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/customer/all';
const token = `eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzc2NDU1OSwiaWF0IjoxNzE3NzUzNzU5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0RFTEVURSBJTVBPUlRfV09SS19GSU5EIFZFUklGWV9PUkRFUiBJTVBPUlRfV09SS19VUERBVEUgSU1QT1JUX1dPUktfQ1JFQVRFIEdFVF9DVVNUT01FUl9JTkZPUyBHRVRfUEFZTUVOVF9JTkZPUyBBRE1JTiBBRE1JTl9NQU5BR0UgQ1VTVE9NRVIgR0VUX01ZX1BBWU1FTlRTIENBTkNMRV9PUkRFUiBDUkVBVEVfT1JERVIgR0VUX01ZX0JPT0tTIn0.vyZD_QlXbyR44o7fuMAbXCd52MHnGEO8FxeVNSIH5DE`;



export default function CustomerList() {
    const [searchCustomer, setSearchCustomer] = useState('');
    const [customerlistdata, setCustomerListData] = useState([]);

    const handleSearchCustomer = (event) => {
        const value = event.target.value;
        setSearchCustomer(value);
    };

    useEffect (() =>{
        localStorage.setItem('token', token);

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(CUSTOMERALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setCustomerListData(result);
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


    const filteredData = customerlistdata.filter((item) =>
       // item.id.toLowerCase().includes(searchCustomer.toLowerCase()) ||
     //   item.gender.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        item.fullname.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        item.birthday.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        item.email.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        item.phonenumber.toLowerCase().includes(searchCustomer.toLowerCase())
    );

    return (
        <div className='w-full h-full'>
            <div className="list-chat-search relative flex w-full border-b h-16 border-border--lightcolor">
                <div className='w-2/5 relative flex items-center'>
                    <input
                        type="text"
                        value={searchCustomer}
                        placeholder="Tìm kiếm"
                        className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg pl-4 pr-10"
                        onChange={handleSearchCustomer}
                    />
                    <span className='text-xl absolute right-3 text-primary--color'>
                        <IoSearchOutline />
                    </span>
                </div>
            </div>
            <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-hidden">
                <div className="overflow-auto md:overflow-hidden md:full w-96 ml-3 sm:w-[96%]">
                    <table className="w-full">
                        <thead className="text-primary--color whitespace-nowrap">
                            <tr>
                                <th className='w-1/5 text-center'>Mã khách hàng</th>
                                <th className='w-1/3 text-center'>Tên khách hàng</th>
                                <th className='w-2/12 text-center'>Giới tính</th>
                                <th className='w-1/3 text-center'>Ngày sinh</th>
                                <th className='w-1/5 text-center'>Email</th>
                                <th className='w-1/3 text-center'>Số điện thoại</th>
                            </tr>
                        </thead>
                        <tbody className="KH_maincontent_footer_content_detail divide-y">
                            {filteredData.map((item) => {
                                const formattedDate = format(new Date(item.birthday), 'dd/MM/yyyy');
                                return(
                                    <tr key={item.id} className="hover:bg-backgrond--color hover:no-underline shadow py-2">
                                    <td className="w-1/5 text-center">
                                    <Link to={`/KhachHang/${item.id}`} className="hover:underline">{item.id}</Link></td>
                                    <td className="w-1/3 text-center">{item.fullname}</td>
                                    <td className="w-2/12 text-center">{item.gender?"Nữ":"Nam"}</td>
                                    <td className="w-1/3 text-center">{formattedDate}</td>
                                    <td className="w-1/5 text-center">{item.email}</td>
                                    <td className="w-1/3 text-center">{item.phonenumber}</td>
                                </tr>
                                )
                                
                            })}
                        </tbody>
                    </table>
                   
        
              </div>
        </div>
        </div>
    );
}
