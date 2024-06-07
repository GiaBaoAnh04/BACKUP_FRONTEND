import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { IoSearchOutline } from "react-icons/io5";
import PaginationButtons from './PaginationButtons';
import axios from 'axios';


const BOOKALL_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/book/all';

export default function BookList() {

  const [searchBook, setSearchBook] = useState('');
  const [bookListData, setBookListData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage); // Set token from local storage

    const fetchUserData = async () => {
        if (!token) {
            console.error('No token found, please log in.');
            return;
        }
        try {
            const response = await axios.get(BOOKALL_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = response.data.result;
            setBookListData(result);
            console.log(result);
        } catch (error) {
            console.error('Error fetching user data:', error);
            if (error.response?.data) {
                console.error("Error response:", error.response.data);
            }
        }
    };

    fetchUserData();
}, [token]);

const handleSearchBook = (event) => {
    const value = event.target.value;
    setSearchBook(value);
};

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const totalPages = Math.ceil(bookListData.length / itemsPerPage);
    
  return (
    <div className='w-full h-full'>
    <div className="list-chat-search relative flex w-full border-b h-16 -top-0 border-border--lightcolor">
      <div className='w-2/5 relative flex items-center'>
        <input 
          type="text" 
          value={searchBook} 
          placeholder="Tìm kiếm sách" 
          className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" 
          onChange={handleSearchBook} 
        />
        <span className='text-xl absolute right-3 text-primary--color '><IoSearchOutline/></span>
      </div>

      <div className='font-medium text-lg text-primary--color border-b w-full h-8'></div>
      {/*  list */}
        <BookCard data={bookListData.slice(startIndex, endIndex)} currentPage={currentPage} />
        <div className='font-medium text-lg text-primary--color border-b w-full'></div>
        <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}


