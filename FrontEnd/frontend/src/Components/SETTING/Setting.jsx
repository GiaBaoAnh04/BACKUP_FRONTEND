// import React, { useEffect, useState } from 'react'
// import SettingBody from './SettingBody'
// import userData from '../../Data/userData'
// import axios from 'axios';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SettingBody from './SettingBody';

const BASE_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/staff/myinfo';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNjk2NzEzOCwiaWF0IjoxNzE2OTYzNTM4LCJzY29wZSI6IkNVU1RPTUVSIEdFVF9NWV9CT09LUyBHRVRfTVlfUEFZTUVOVFMgQ1JFQVRFX09SREVSIENBTkNMRV9PUkRFUiBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgSU1QT1JUX1dPUktfVVBEQVRFIEdFVF9DVVNUT01FUl9JTkZPUyBHRVRfUEFZTUVOVF9JTkZPUyBJTVBPUlRfV09SS19ERUxFVEUgSU1QT1JUX1dPUktfRklORCBWRVJJRllfT1JERVIgQURNSU4gQURNSU5fTUFOQUdFIn0.p1Uei916i8x1JGnXsfJ7oqAH6LYwwZ35f0vi6B0_Gq0';

export default function Setting() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lưu token vào localStorage
    localStorage.setItem('token', token);

    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage.

      if (!token) {
        console.error('No token found, please log in.');
        return;
      }

      try {
        const response = await axios.get(BASE_URL, {
          headers: {
            'Authorization': `Bearer ${token}` // Thêm token vào header của request.
          }
        });
        const result = response.data.result
        setUser(result);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error);
        if(error.response.data){
          console.error("Error response:", error.response.data)
        }
      }
    };

    fetchUserData(); // Gọi hàm fetch dữ liệu khi component được mount.
  }, []); // Mảng phụ thuộc rỗng nghĩa là chỉ chạy một lần khi component được mount.

  if (!user) return <div>Loading...</div>; // Hiển thị "Loading..." khi dữ liệu chưa được fetch xong.

  return (
    <div>
    {user ? <SettingBody user={user} /> : <p>Loading...</p>}
  </div>
  );
}