
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CusHistoryOrderData from '../../Data/JSON_DATA/cusHistoryOrder.json';
import { Link } from 'react-router-dom';

export default function CusHistoryOrder() {
    const { customerId } = useParams();
    const [customerOrders, setCustomerOrders] = useState([]);

    useEffect(() => {
        const orders = CusHistoryOrderData.filter((order) => order.CusId === customerId);
        setCustomerOrders(orders);
    }, [customerId]);

    const getShippingStatus = (status) => {
        switch (status) {
            case 0:
                return "Chờ xác nhận";
            case 1:
                return "Đã xác nhận";
            case 2:
                return "Đang chuẩn bị hàng";
            case 3:
                return "Đang giao";
            case 4:
                return "Đã giao hàng";
            default:
                return "Không xác định";
        }
    };

    return (
        <div className="KH_maincontent_footer_content w-full h-full text-primary--color overflow-hidden">
            <div className="KH_maincontent_footer_content_tittle flex py-4 w-full">
                <span className='w-1/5 justify-center flex'>Mã hóa đơn</span>
                <span className='w-1/3 justify-center flex'>Ngày hóa đơn</span>
                <span className=' w-1/5 justify-center flex'>Tổng tiền</span>
                <span className='w-1/3 justify-center flex'>Trạng thái</span>
            </div>
            <div className="KH_maincontent_footer_content_detail h-32 overflow-auto">
                {customerOrders.map((order) => (
                    <Link to={`/HoaDon/${order.OrderId}`} key={order.ordernumber} className="KH_content_detail_item flex w-full py-1 hover:bg-backgrond--color hover:no-underline">
                        <div className="item_KH item_ordernumber w-1/5 flex justify-center">{order.OrderId}</div>
                        <div className="item_KH item_datenumber w-1/3 justify-center flex">{order.datenumber}</div>
                        <div className="item_KH item_total w-1/5 justify-center flex">{order.total} vnd</div>
                        <div className="item_KH item_status w-1/3 justify-center flex">{getShippingStatus(order.status)}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}



