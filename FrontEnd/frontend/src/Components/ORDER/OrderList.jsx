import React from 'react'
import OrderListData from "../../Data/bookData" 
import {Link} from 'react-router-dom'
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import axios from 'axios';
import { format } from 'date-fns';

const ORDERALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/order/all';
const UPDATESTATUS_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/order/update-status/';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzc1NTUxMywiaWF0IjoxNzE3NzQ0NzEzLCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBDUkVBVEVfT1JERVIgR0VUX01ZX1BBWU1FTlRTIENBTkNMRV9PUkRFUiBBRE1JTiBBRE1JTl9NQU5BR0UgU1RBRkYgR0VUX1BBWU1FTlRfSU5GT1MgSU1QT1JUX1dPUktfQ1JFQVRFIElNUE9SVF9XT1JLX0ZJTkQgSU1QT1JUX1dPUktfREVMRVRFIFZFUklGWV9PUkRFUiBJTVBPUlRfV09SS19VUERBVEUgR0VUX0NVU1RPTUVSX0lORk9TIn0.KZDLpKMCftzew0K3W6JEtmBHT0MAw2v4kVzATPRGiio';



export default function OrderList() {
    const[searchStock, getSearchStock] = useState('');
    const [orderlistdata, setOrderListData] = useState([]);
    const [selectstatus, setSelectStatus] = useState('');
    const [selectid, setSelectId] = useState(null);

    const handleSearchStock = (event) => {
        const value = event.target.value;
        getSearchStock(value);
    }

    useEffect (() =>{
        localStorage.setItem('token', token);

        const fetchUserData = async () =>{
            const token = localStorage.getItem('token');

            if(!token){
                console.error('No token found, please log in.');
                return
            }

            try{
                const response = await axios.get(ORDERALL_URL,{
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                setOrderListData(result);
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


   
    const filteredData = orderlistdata.filter((item) =>
    item.customerId.toString().toLowerCase().includes(searchStock.toLowerCase())||
    item.id.toString().toLowerCase().includes(searchStock.toLowerCase()) ||
    item.fullname.toLowerCase().includes(searchStock.toLowerCase()) || 
    item.phonenumber.toLowerCase().includes(searchStock.toLowerCase()) || 
    item.status_trans.toString().includes(searchStock))

    function ShippingStatus(ordstatus){
        let status = "";
        if(ordstatus===0){
            status="Chờ xác nhận"
        }
        if(ordstatus===1){
            status="Đã xác nhận"
        }
        if(ordstatus===2){
            status="Đang chuẩn bị hàng"
        }
        if(ordstatus===3){
            status="Đang giao"
        }
        if(ordstatus===4){
            status="Đã giao hàng"
        }
        return status
    }

    function TextColor(orderstatus){
        let color=""
        if(orderstatus===0){
            color="text-status--0"
        }
        if(orderstatus===1){
            color="text-status--1-3"
        }
        if(orderstatus===2){
            color="text-status--1-3"
        }
        if(orderstatus===3){
            color="text-status--1-3"
        }
        if(orderstatus===4){
            color="text-status--4"
        }
        return color

    }

    const handleUpdateStatus = async (event,id) => {
        event.preventDefault();
        const url = `${UPDATESTATUS_URL}${id}?status=${selectstatus}`;
        // Get the shift times based on the selected shiftwork and date
    
        console.log(url)

        try {
            const response = await axios.patch(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Status changed:', response.data);
            // Reset form fields

        } catch (error) {
            console.error('Error change status:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }

        
    };

  return (
    <div className='w-full h-full'>
         <div className="list-chat-search relative flex items-center gap-10  w-full border-b h-16 -top-0  border-border--lightcolor">
         <div className='w-2/5 relative flex items-center'>
            <input type="text" value={searchStock} placeholder="Tìm kiếm" className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" onChange={handleSearchStock}/>
            <span className='text-xl absolute right-3 text-primary--color '><IoSearchOutline/></span>
         </div>
        
            
        </div>


        <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-auto rounded-lg shadow md:overflow-hidden">
                <div className="overflow-x-auto md:overflow-hidden md:w-full sm:w-[96%]">
                    <table className="min-w-full">
                        <thead className="bg-header--lightcolor text-primary--color whitespace-nowrap">
                            <tr>
                                <th className='w-1/7 text-center py-2'>Mã hóa đơn</th>
                                <th className='w-1/5 text-center py-2'>Mã khách hàng</th>
                                <th className='w-1/5 text-center py-2'>Tên khách hàng</th>
                                <th className='w-1/5 text-center py-2'>Ngày hóa đơn</th>
                                <th className='w-1/5 text-center py-2'>Tổng tiền</th>
                                <th className='w-1/3 text-center py-2'>Trạng thái</th>
                                <th className='w-1/3 text-center py-2'>Xác nhận</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white whitespace-nowrap">
                            {filteredData.map((item) => (
                                <tr key={item.id} value={selectid} className="hover:bg-backgrond--color">
                                <td className="w-1/7 text-center py-2">
                                    <Link to={`/HoaDon/${item.id}`} className="hover:underline">{item.id}</Link>
                                </td>
                                <td className="w-1/5 text-center py-2">{item.customerId}</td>
                                <td className="w-1/5 text-center py-2">{item.fullname}</td>
                                <td className="w-1/5 text-center py-2">
                                    {item.createAt ? new Date(item.createAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="w-1/5 text-center py-2">{item.total_price} vnd</td>
                                <td className={classNames("w-1/3 text-center py-2", TextColor(item.status_trans))}>
                                    {ShippingStatus(item.status_trans)}
                                </td>
                                <td className="w-1/3 text-center py-2">
                                        <select
                                            value={selectstatus}
                                            onChange={(e) => {setSelectStatus(e.target.value);
                                            setSelectId(item.id);}}
                                            name='staff'
                                            className="border-2 h-7 border-border--color rounded-md px-2 w-28"
                                            >
                                            <option value="">Trạng thái</option>
                                                <option value={0}>
                                                   Chờ xác nhận
                                                </option>
                                                <option value={1}>
                                                   Đã xác nhận 
                                                </option>
                                                <option value={2}>
                                                   Đang chuẩn bị hàng
                                                </option>
                                                <option value={3}>
                                                   Đang giao
                                                </option>
                                                <option value={4}>
                                                   Đã giao
                                                </option>
                                        </select>
                                        <button onClick={(event) => handleUpdateStatus(event, item.id)} className="px-1 ml-2 w-fit text-white--color bg-primary--color rounded-md">
                                            Xác nhận
                                        </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
    </div>
  )
}
