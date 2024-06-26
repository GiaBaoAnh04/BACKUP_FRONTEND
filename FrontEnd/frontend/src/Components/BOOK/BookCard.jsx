import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BOOK_API_URL = 'https://bookstorewebdeploy-production.up.railway.app/BookStore/book';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uYXV0aGVudGljYXRpb24iLCJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNjk5OTQ1NiwiaWF0IjoxNzE2OTk1ODU2LCJzY29wZSI6IkFETUlOIEFETUlOX01BTkFHRSBTVEFGRiBJTVBPUlRfV09SS19DUkVBVEUgR0VUX1BBWU1FTlRfSU5GT1MgR0VUX0NVU1RPTUVSX0lORk9TIElNUE9SVF9XT1JLX0ZJTkQgSU1QT1JUX1dPUktfVVBEQVRFIElNUE9SVF9XT1JLX0RFTEVURSBWRVJJRllfT1JERVIgQ1VTVE9NRVIgR0VUX01ZX1BBWU1FTlRTIENSRUFURV9PUkRFUiBHRVRfTVlfQk9PS1MgQ0FOQ0xFX09SREVSIn0.oIhzzNqAlBonnLVyIAPMkRCuyjHW2_QAsXWu-venkSE';

const BookCard = ({ data, currentPage }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(BOOK_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const result = response.data.result;
        setImages(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookData();
  }, [token]);

  const maxItemsPerPage = 8;

  const startIndex = currentPage * maxItemsPerPage;
  const endIndex = startIndex + maxItemsPerPage;

  const handleClick = (book, index) => {
    setSelectedBook(book);
    setSelectedBookIndex(index);
    navigate(`/book/all/${book.id}`);
  };

  return (
    <div className='mb-10'>
      <div className='p-4 h-4/5 overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center'>
        {data.slice(0, showAll ? data.length : maxItemsPerPage).map((book, index) => (
          <div className="group" key={book.id}>
            <div className='relative justify-center items-center flex-col gap-4 bg-background--lightcolor rounded-lg py-10'>
              {images.find((image) => image.bookId === book.id) ? (
                <img
                  src={images.find((image) => image.bookId === book.id).url}
                  alt={book.title}
                  className='[h-180px] w-[260px] object-cover rounded-md'
                />
              ) : (
                <img
                  src={'data:image/jpeg;base64,' + book.galleryManage[0].thumbnail}
                  alt={book.title}
                  className='[h-180px] w-[260px] object-cover rounded-md'
                />
              )}
              {/* hover button */}
              <div className=' hidden group-hover:flex absolute h-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200'>
                <button
                  onClick={() => handleClick(book, index)}
                  className=' bg-primary--color py-2 px-4 rounded text-white--color'
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div className='leading-7'>
              <h2 className=' font-medium text-pretty text-center mt-2'>{book.title}</h2>
              <h2 className='font-bold text-right mr-8'>${book.price}đ</h2>
            </div>
</div>
        ))}
      </div>
      <div className="book-detail">
        <div className="overlay" onClick={() => setSelectedBook(null)} />
        <div className="detail-container">
          {selectedBook && (
            <div>
              {images.find((image) => image.bookId === selectedBook.id)? (
                <img src={images.find((image) => image.bookId === selectedBook.id).url} alt={selectedBook.title} className='w-full mb-4' />
              ) : (
                <img src={'data:image/jpeg;base64,' + selectedBook.galleryManage[0].thumbnail} alt={selectedBook.title} className='w-full mb-4' />
              )}
              <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
              <p>{selectedBook.description}</p>
              <p>Giá: {selectedBook.price}đ</p>
              <button
                onClick={() => setSelectedBook(null)}
                className='bg-primary--color py-2 px-4 rounded text-white--color'
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;