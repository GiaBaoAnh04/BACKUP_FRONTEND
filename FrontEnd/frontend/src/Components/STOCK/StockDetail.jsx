// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import StockData from '../../Data/StockData';
// import axios from 'axios';

// const stockfinfor = "flex gap-4 font-light text-primary--color whitespace-nowrap";
// const stockInfTitle = "font-medium text-header--lightcolor whitespace-nowrap";


// const STOCKALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/import/all';
// const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxMzMzOSwiaWF0IjoxNzE3NDAyNTM5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgR0VUX01ZX0JPT0tTIEdFVF9NWV9QQVlNRU5UUyBDUkVBVEVfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.LL44jDWSQCY6cktROu_TOb8kw2un-PWfSHyIe8uAXKE';


// export default function StockDetail() {
//     const [stock, setStock] = useState(null);
//     const { id: stockId } = useParams();

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const token = localStorage.getItem('token');

//             if (!token) {
//                 console.error('No token found, please log in.');
//                 return;
//             }

//             try {
//                 const response = await axios.get(STOCKALL_URL, {
//                     headers: {
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 const result = response.data.result;
//                 const foundOrder = result.find(stock => stock.id.toString() === stockId);
//                 setStock(foundOrder);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 if (error.response?.data) {
//                     console.error("Error response:", error.response?.data);
//                 }
//             }
//         };

//         fetchUserData();
//     }, [stockId]);

//     if (!stock) {
//         return <div>Loading...</div>;
//     }

//     const {
//         id,
//         createAt,
//         updateAt,
//         createBy,
//         updateBy,
//         importDetailResponse = [],
//         import_total,
//         import_status
//     } = stock;

//     function ShippingStatus(bookstatus) {
//         switch (bookstatus) {
//             case 0: return "Chờ xác nhận";
//             case 1: return "Đã xác nhận";
//             case 2: return "Đang chuẩn bị hàng";
//             case 3: return "Đang giao";
//             case 4: return "Đã giao hàng";
//             default: return "Trạng thái không xác định";
//         }
//     }

//     return (
//         <div className="w-full h-full">
//             <h4 className='h-8 relative -top-1 flex items-start border-b border-border--color text-header--lightcolor pl-4'>Thông tin đơn hàng</h4>
//             <div className="HDNH_maincontent_body1 flex gap-8 py-4 text-primary--color">
//                 <div className="body1_stocknumber w-32 flex justify-center items-center border-2 rounded-xl border-primary--color">{id}</div>
//                 <div className="body1_des">
//                     <div className={stockfinfor}>
//                         <label for="stockdate" className={stockInfTitle}>Ngày tạo hóa đơn: </label>
//                         <div className="stockdate">{new Date(createAt).toLocaleDateString()}</div>
//                     </div>
//                     <div className={stockfinfor}>
//                         <label for="stockstatus" className={stockInfTitle}>Trạng thái: </label>
//                         <div className="stockstatus">{ShippingStatus(import_status)}</div>
//                     </div>
//                     <div className={stockfinfor}>
//                         <label for="staffnumber" className={stockInfTitle}>Nhân viên tạo: </label>
//                         <div className="staffnumber">{createBy}</div>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className="HDNH_maincontent_body2 pl-4">
//                 <h4 className=" font-medium text-primary--color pb-4 pt-1 ">Thông tin nhà cung cấp</h4>
//                 <div className="body2_des">
//                     <div className={stockfinfor}>
//                         <label for="providername" className={stockInfTitle}>Tên nhà cung cấp: </label>
//                         <div className="providername">{providerName}</div>
//                     </div>
//                     <div className={stockfinfor}>
//                         <label for="providerphonenumber" className={stockInfTitle}>Số điện thoại: </label>
//                         <div className="providerphonenumber">{phoneNumber}</div>
//                     </div>
//                     <div className={stockfinfor}>
//                         <label for="provideraddress" className={stockInfTitle}>Địa chỉ: </label>
//                         <div className="provideraddress">{address}</div>
//                     </div>
//                 </div>
//             </div> */}

//             <div className="HDNH_maincontent_body3">
//                 <h4 className="pl-4 font-medium text-primary--color pb-6 pt-6 ">Sản phẩm đã mua</h4>
//                 <div className="body3_container">
//                     <div className="body3_container_content flex w-full  text-header--lightcolor font-medium">
//                         <span className="span1 w-1/4 flex justify-start pl-4">Sản phẩm</span>
//                         <span className="span2 w-1/4 flex justify-center">Đơn giá</span>
//                         <span className="span3 w-1/5 flex justify-center">Số lượng</span>
//                         <span className="span4 w-1/4 flex justify-center">Tổng</span>
//                     </div>
//                     <div className="body3_container_content_detail py-4 flex flex-col overflow-auto h-44  gap-4 text-primary--color">
//                         {importDetailResponse.map((item, index) => (
//                             <div className="HDNH_item flex w-full " key={index}>
//                                 <div className="item_HDNH item_infor  sm:w-1/4  flex gap-8 items-center justify-start ">
//                                     {/* <div className="h-10 w-12 sm:h-10 sm:w-8  rounded-md bg-sky-500 bg-cover bg-no-repeat bg-center "
//                                         style={{ backgroundImage: `url(${item.avatar})` }}></div> */}
//                                     <div className="item_name pl-4">{item.title}</div>
//                                 </div>
//                                 <div className="item_HDNH item_price w-1/4 flex justify-center">{item.import_cost}</div>
//                                 <div className="item_HDNH item_amount w-1/5 flex justify-center">{item.quantity}</div>
//                                 <div className="item_HDNH item_total w-1/4 flex justify-center">{item.total_cost}</div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="HDNH_maincontent_footer pr-12 sm:pr-32 pt-10 flex flex-col gap-4  text-primary--color">
//                         <div className="HDNH_maincontent_footer_total flex justify-between">
//                             <span className={stockInfTitle}>Tổng tiền hàng</span>
//                             <div className="HDNH_total">{import_total}</div>
//                         </div>
//                         {/* <div className="HDNH_maincontent_footer_discount flex justify-between">
//                             <span className={stockInfTitle}>Giảm giá</span>
//                             <div className="HDNH_discount ">{discount}</div>
//                         </div> */}
//                         {/* <div className="HDNH_maincontent_footer_finaltotal flex justify-between">
//                             <span className=' text-primary--color font-bold'>Tổng thanh toán</span>
//                             <div className="HDNH_finaltotal  text-primary--color font-bold">{totalPrice - discount}</div>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StockData from '../../Data/StockData';
import axios from 'axios';

const stockfinfor = "flex gap-4 font-light text-primary--color whitespace-nowrap";
const stockInfTitle = "font-medium text-header--lightcolor whitespace-nowrap";


const STOCKALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/import/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzY3MTk2NywiaWF0IjoxNzE3NjYxMTY3LCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQ0FOQ0xFX09SREVSIENSRUFURV9PUkRFUiBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgSU1QT1JUX1dPUktfRklORCBHRVRfQ1VTVE9NRVJfSU5GT1MgR0VUX1BBWU1FTlRfSU5GT1MgSU1QT1JUX1dPUktfREVMRVRFIElNUE9SVF9XT1JLX1VQREFURSBWRVJJRllfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.BeebnrEP8FI7pbjJ4fOSesqGorO2QZTR0TnYz85TWNM';


export default function StockDetail() {
    const [stock, setStock] = useState(null);
    const { id: stockId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(STOCKALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                const foundOrder = result.find(stock => stock.id.toString() === stockId);
                setStock(foundOrder);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };

        fetchUserData();
    }, [stockId]);

    if (!stock) {
        return <div>Loading...</div>;
    }

    const {
        id,
        createAt,
        updateAt,
        createBy,
        updateBy,
        importDetailResponse = [],
        import_total,
        import_status
    } = stock;

    function ShippingStatus(bookstatus) {
    
        if(bookstatus){
            return "Đã xác nhận";
        }
        else{
            return "Chờ xác nhận";
        }
    }

    return (
        <div className="w-full h-full">
            <h4 className='h-8 relative -top-1 flex items-start border-b border-border--color text-header--lightcolor pl-4'>Thông tin đơn hàng</h4>
            <div className="HDNH_maincontent_body1 flex gap-8 py-4 text-primary--color">
                <div className="body1_stocknumber w-32 flex justify-center items-center border-2 rounded-xl border-primary--color">{id}</div>
                <div className="body1_des">
                    <div className={stockfinfor}>
                        <label for="stockdate" className={stockInfTitle}>Ngày tạo hóa đơn: </label>
                        <div className="stockdate">{new Date(createAt).toLocaleDateString()}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label for="stockstatus" className={stockInfTitle}>Trạng thái: </label>
                        <div className="stockstatus">{ShippingStatus(import_status)}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label for="staffnumber" className={stockInfTitle}>Nhân viên tạo: </label>
                        <div className="staffnumber">{createBy}</div>
                    </div>
                </div>
            </div>

            {/* <div className="HDNH_maincontent_body2 pl-4">
                <h4 className=" font-medium text-primary--color pb-4 pt-1 ">Thông tin nhà cung cấp</h4>
                <div className="body2_des">
                    <div className={stockfinfor}>
                        <label for="providername" className={stockInfTitle}>Tên nhà cung cấp: </label>
                        <div className="providername">{providerName}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label for="providerphonenumber" className={stockInfTitle}>Số điện thoại: </label>
                        <div className="providerphonenumber">{phoneNumber}</div>
                    </div>
                    <div className={stockfinfor}>
                        <label for="provideraddress" className={stockInfTitle}>Địa chỉ: </label>
                        <div className="provideraddress">{address}</div>
                    </div>
                </div>
            </div> */}

            <div className="HDNH_maincontent_body3">
                <h4 className="pl-4 font-medium text-primary--color pb-6 pt-6 ">Sản phẩm đã mua</h4>
                <div className="body3_container">
                    

                    <table className="table-auto w-full text-header--lightcolor font-medium">
                        <thead>
                            <tr>
                                <th className="w-1/3  text-start">Sản phẩm</th>
                                <th className="w-1/4  text-start">Đơn giá</th>
                                <th className="w-1/5  text-start">Số lượng</th>
                                <th className="w-1/4  text-start">Tổng</th>
                            </tr>
                        </thead>
                        <tbody className="text-primary--color">
                            {importDetailResponse.map((item, index) => (
                                <tr key={index} className="HDNH_item">
                                    <td className="item_name text-start">{item.title}</td>
                                    <td className="item_name text-start">{item.import_cost}</td>
                                    <td className="item_price text-start">{item.quantity}</td>
                                    <td className="item_amount text-start">{item.total_cost}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>

                    <div className="HDNH_maincontent_footer pr-12 sm:pr-32 pt-10 flex flex-col gap-4  text-primary--color">
                        <div className="HDNH_maincontent_footer_total flex justify-between">
                            <span className={stockInfTitle}>Tổng tiền hàng</span>
                            <div className="HDNH_total">{import_total}</div>
                        </div>
                        {/* <div className="HDNH_maincontent_footer_discount flex justify-between">
                            <span className={stockInfTitle}>Giảm giá</span>
                            <div className="HDNH_discount ">{discount}</div>
                        </div> */}
                        {/* <div className="HDNH_maincontent_footer_finaltotal flex justify-between">
                            <span className=' text-primary--color font-bold'>Tổng thanh toán</span>
                            <div className="HDNH_finaltotal  text-primary--color font-bold">{totalPrice - discount}</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
