import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookData from '../../Data/bookData';
import axios from 'axios';

const stockfinfor = "flex gap-4 font-light  text-primary--color whitespace-nowrap";
const stockInfTitle = "font-medium text-header--lightcolor whitespace-nowrap";


const ORDERALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/order/all';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNzQxMzMzOSwiaWF0IjoxNzE3NDAyNTM5LCJzY29wZSI6IlNUQUZGIElNUE9SVF9XT1JLX0ZJTkQgVkVSSUZZX09SREVSIElNUE9SVF9XT1JLX0RFTEVURSBHRVRfQ1VTVE9NRVJfSU5GT1MgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0NSRUFURSBHRVRfUEFZTUVOVF9JTkZPUyBDVVNUT01FUiBDQU5DTEVfT1JERVIgR0VUX01ZX0JPT0tTIEdFVF9NWV9QQVlNRU5UUyBDUkVBVEVfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.LL44jDWSQCY6cktROu_TOb8kw2un-PWfSHyIe8uAXKE';

export default function OrderDetail() {
    const [order, setOrder] = useState(null);
    const { id: orderId } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found, please log in.');
                return;
            }

            try {
                const response = await axios.get(ORDERALL_URL, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = response.data.result;
                const foundOrder = result.find(order => order.id.toString() === orderId);
                setOrder(foundOrder);
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response?.data) {
                    console.error("Error response:", error.response?.data);
                }
            }
        };

        fetchUserData();
    }, [orderId]);

    if (!order) {
        return <div>Loading...</div>;
    }

    const {
        id,
        customerId,
        fullname,
        order_note,
        price,
        total_dis,
        status_trans,
        total_price,
        address,
        phonenumber,
        method_payment,
        createAt,
        createBy,
        orderDetailResponse = []
    } = order;

    function ShippingStatus(bookstatus) {
        switch (bookstatus) {
            case 0: return "Chờ xác nhận";
            case 1: return "Đã xác nhận";
            case 2: return "Đang chuẩn bị hàng";
            case 3: return "Đang giao";
            case 4: return "Đã giao hàng";
            default: return "Trạng thái không xác định";
        }
    }

    
  return (
    <div className='w-full h-full'>
        <h4 className='h-8 relative -top-1 flex items-start border-b border-border--color text-header--lightcolor pl-4'>Thông tin đơn hàng</h4>
        <div className="HDNH_maincontent_body1 flex gap-8 py-4 text-primary--color">
            <div className="body1_stocknumber w-32 flex justify-center items-center border-2 rounded-xl border-primary--color">HD{id}</div>
            <div className="body1_des">
                <div className={stockfinfor}>
                    <label for="stockdate" className={stockInfTitle}>Ngày tạo hóa đơn: </label>
                    <div className="stockdate">{new Date(createAt).toLocaleDateString()}</div>
                </div>
                <div className={stockfinfor}>
                    <label for="stockstatus" className={stockInfTitle}>Trạng thái: </label>
                    <div className="stockstatus">{ShippingStatus(status_trans)}</div>
                </div>
                <div className={stockfinfor}>
                    <label for="staffnumber" className={stockInfTitle}>Người cập nhật: </label>
                    <div className="staffnumber">{createBy}</div>
                </div>
            </div>
        </div>

        <div className="HDNH_maincontent_body2 pl-4">
            <h4 className=" font-medium text-primary--color pb-4 pt-1 ">Thông tin người nhận</h4>
            <div className="body2_des">
                <div className={stockfinfor}>
                    <label for="providername" className={stockInfTitle}>Tên người nhận: </label>
                    <div className="providername">{fullname}</div>
                </div>
                <div className={stockfinfor}>
                    <label for="providerphonenumber" className={stockInfTitle}>Số điện thoại: </label>
                    <div className="providerphonenumber">{phonenumber}</div>
                </div>
                <div className={stockfinfor}>
                    <label for="provideraddress" className={stockInfTitle}>Địa chỉ: </label>
                    <div className="provideraddress">{address}</div>
                </div>
            </div>
        </div>

        <div className="HDNH_maincontent_body3">
            <h4 className="pl-4 font-medium text-primary--color pb-6 pt-6">Sản phẩm đã mua</h4>
            <div className="body3_container">
                <table className="table-auto w-full text-header--lightcolor font-medium">
                    <thead>
                        <tr>
                            <th className="w-1/4">Sản phẩm</th>
                            <th className="w-1/4">Đơn giá</th>
                            <th className="w-1/5">Số lượng</th>
                            <th className="w-1/5">Giảm giá</th>
                            <th className="w-1/4">Tổng</th>
                        </tr>
                    </thead>
                    <tbody className="text-primary--color">
                        {orderDetailResponse.map((item, index) => (
                            <tr key={index} className="HDNH_item">
                                <td className="item_name text-start">{item.title}</td>
                                <td className="item_price text-start">{item.price}</td>
                                <td className="item_amount text-start">{item.quantity}</td>
                                <td className="item_discount text-start">{item.discount}</td>
                                <td className="item_total text-start">{item.price * item.quantity - item.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="HDNH_maincontent_footer pr-12 sm:pr-32 pt-10 flex flex-col gap-4 text-primary--color">
                    <div className="HDNH_maincontent_footer_total flex justify-between">
                        <span className="stockInfTitle">Tổng tiền hàng</span>
                        <div className="HDNH_total">{price}</div>
                    </div>
                    <div className="HDNH_maincontent_footer_discount flex justify-between">
                        <span className="stockInfTitle">Giảm giá</span>
                        <div className="HDNH_discount">{total_dis}</div>
                    </div>
                    <div className="HDNH_maincontent_footer_finaltotal flex justify-between">
                        <span className='text-primary--color font-bold'>Tổng thanh toán</span>
                        <div className="HDNH_finaltotal text-primary--color font-bold">{total_price}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )


}


