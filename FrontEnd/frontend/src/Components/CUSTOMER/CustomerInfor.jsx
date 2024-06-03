// import React from 'react'
// const customerinfdisplay = 'staffinfor flex gap-4 text-primary--color pb-4 '

// export default function CustomerInfor ({customer}) {
//   return (
//     <div className="setting-content  flex w- h-full pl-4 gap-10 justify-center items-center ">
//     <img src={customer.avatar} alt="avatar" className='w-2/5 h-3/4 '/>
//     <div className="content-staffinf flex-1 w-full h-3/4 flex flex-col pt-10">
//         <div className={customerinfdisplay}>
//             <span className='text-header--lightcolor whitespace-nowrap'>Họ và tên: </span>
//             <div className="staffname">{customer.name}</div>
//         </div>
//         <div className={customerinfdisplay}>
//             <span className='text-header--lightcolor whitespace-nowrap'>Giới tính: </span>
//             <div className="staffgender">{customer.gender}</div>
//         </div>
//         <div className={customerinfdisplay}>
//             <span className='text-header--lightcolor whitespace-nowrap'>Ngày sinh: </span>
//             <div claclassNamess="staffdof">{customer.birthDate}</div>
//         </div>
//         <div className={customerinfdisplay}>
//             <span className='text-header--lightcolor whitespace-nowrap'>Số điện thoại: </span>
//             <div className="staffphonenb">{customer.phoneNumber}</div>
//         </div>
//         <div className={customerinfdisplay}>
//             <span className='w-fit text-header--lightcolor whitespace-nowrap'>Địa chỉ: </span>
//             <div className="staffaddress">{customer.address}</div>
//         </div>
//     </div>
// </div>
//   )
// }

// import React from 'react';
// import cusData from '../../Data/CustomerListData'

// import { useParams } from 'react-router-dom';

// export default function CustomerInfor() {
//     const { cusid } = useParams();
//     const customer = cusData.find(customer => customer.CusId === cusid);
//     const { CusId, CusName, Gender, DayOfBirth, PhoneNumber, Email, address, avatar } = customer;

//   return (
//     <div className="setting-content flex w-full h-full pl-4 gap-10 justify-center items-center">
//       <img src={avatar} alt="avatar" className="w-2/5 h-3/4" />
//       <div className="content-staffinf flex-1 w-full h-3/4 flex flex-col pt-10">
//         <div className="staffinfor flex gap-4 text-primary--color pb-4">
//           <span className='text-header--lightcolor whitespace-nowrap'>Họ và tên: </span>
//           <div className="staffname">{CusName}</div>
//         </div>
//         <div className="staffinfor flex gap-4 text-primary--color pb-4">
//           <span className='text-header--lightcolor whitespace-nowrap'>Giới tính: </span>
//           <div className="staffgender">{Gender}</div>
//         </div>
//         <div className="staffinfor flex gap-4 text-primary--color pb-4">
//           <span className='text-header--lightcolor whitespace-nowrap'>Ngày sinh: </span>
//           <div className="staffdof">{DayOfBirth}</div>
//         </div>
//         <div className="staffinfor flex gap-4 text-primary--color pb-4">
//           <span className='text-header--lightcolor whitespace-nowrap'>Số điện thoại: </span>
//           <div className="staffphonenb">{PhoneNumber}</div>
//         </div>
//         <div className="staffinfor flex gap-4 text-primary--color pb-4">
//           <span className='w-fit text-header--lightcolor whitespace-nowrap'>Địa chỉ: </span>
//           <div className="staffaddress">{address}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomerListData from '../../Data/CustomerListData';
import axios from 'axios';


const CUSTOMERALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/customer/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNjk5OTQ1NiwiaWF0IjoxNzE2OTk1ODU2LCJzY29wZSI6IkFETUlOIEFETUlOX01BTkFHRSBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgR0VUX1BBWU1FTlRfSU5GT1MgR0VUX0NVU1RPTUVSX0lORk9TIElNUE9SVF9XT1JLX0ZJTkQgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0RFTEVURSBWRVJJRllfT1JERVIgQ1VTVE9NRVIgR0VUX01ZX1BBWU1FTlRTIENSRUFURV9PUkRFUiBHRVRfTVlfQk9PS1MgQ0FOQ0xFX09SREVSIn0.oIhzzNqAlBonnLVyIAPMkRCuyjHW2_QAsXWu-venkSE';


export default function CustomerInfor() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    const [customerlistdata, setCustomerListData] = useState([]);

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

    useEffect(() => {
        if (customerlistdata.length > 0) {
            const foundCustomer = customerlistdata.find(customer => customer.id === parseInt(id, 10));
            setCustomer(foundCustomer);
        }
    }, [id, customerlistdata]);

    if (!customer) {
        return <div>Loading...</div>;
    }

    const {
        fullname,
        gender,
        birthday,
        phonenumber,
        email,
        address,
        avatar
    } = customer;

    return (
        <div className="setting-content flex lg:flex-row flex-col w-full h-full pl-4 gap-10 justify-center items-center pt-10 ">
            <img  src={`data:image/jpeg;base64,${avatar}` || 'https://via.placeholder.com/150'} 
        alt="avatar"  className="w-2/5  lg:h-3/4 lg:w-2/5 h-2/5 md:w-1/6" />
            <div className="content-staffinf flex-1 w-full h-3/4 flex flex-col pt-10">
                <div className="staffinfor flex gap-4 text-primary--color pb-4">
                    <span className='text-header--lightcolor whitespace-nowrap'>Họ và tên: </span>
                    <div className="staffname">{fullname}</div>
                </div>
                <div className="staffinfor flex gap-4 text-primary--color pb-4">
                    <span className='text-header--lightcolor whitespace-nowrap'>Giới tính: </span>
                    <div className="staffgender">{gender?"Nữ":"Nam"}</div>
                </div>
                <div className="staffinfor flex gap-4 text-primary--color pb-4">
                    <span className='text-header--lightcolor whitespace-nowrap'>Ngày sinh: </span>
                    <div className="staffdof">{new Date(birthday).toLocaleDateString()}</div>
                </div>
                <div className="staffinfor flex gap-4 text-primary--color pb-4">
                    <span className='text-header--lightcolor whitespace-nowrap'>Số điện thoại: </span>
                    <div className="staffphonenb">{phonenumber}</div>
                </div>
                <div className="staffinfor flex gap-4 text-primary--color pb-4">
                    <span className='w-fit text-header--lightcolor whitespace-nowrap whitespace-nowrap'>Địa chỉ: </span>
                    <div className="staffaddress">{address}</div>
                </div>
            </div>
        </div>
    );
}
