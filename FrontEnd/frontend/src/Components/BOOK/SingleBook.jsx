import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import BookPage from './BookPage';
//import { LayoutContext } from '../../Shared/userLayoutTitle';

export default function SingleBook() {
  const { id } = useParams();
  // const { setTitle } = useContext(LayoutContext);

  // useEffect(() => {
  //   if (setTitle) {
  //     setTitle(`${id}`);
  //   }
  // }, [id, setTitle])

  // Drawer
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);



  return (
    <div style={{ flex: 1 }}>
      {/* <BookPage bookId={id} /> */}
      <div className="row flex-1 float-right mr-2">

      <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerOpen}>Open Editing</button>

      {/* DRAWER */}
      <div className="flex-1">
        <div className="flex">
          <div className=" w-2/5">
            <div
              className={`fixed inset-0 bg-[#33333333] bg-opacity-50 z-50 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
              <div
                style={{ background: 'white' }}
                className={`fixed inset-y-0 right-0 w-2/5 bg-white z-50 rounded-2xl transform transition-transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
              >
                {/* Drawer content */}
              
                <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerClose}>
                  Close Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
);
}



//Drawer Chỉnh sửa thông tin sách (Tận dụng để Thêm sách)
//   return (
//     <div style={{ flex: 1 }}>
//       <StaffDetail/>
//       <div className="row flex-1 float-right mr-2">

//       <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerOpen}>Open Editing</button>

//       {/* DRAWER */}
//       <div className="flex-1">
//         <div className="flex">
//           <div className=" w-2/5">
//             <div
//               className={`fixed inset-0 bg-[#33333333] bg-opacity-50 z-50 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//             />
//               <div
//                 style={{ background: 'white' }}
//                 className={`fixed inset-y-0 right-0 w-2/5 bg-white z-50 rounded-2xl transform transition-transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
//               >
//                   {/* Drawer content */}
//                 <div className="z-10 w-full mt-2 max-md:max-w-full">
//                 <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
//                 <div className=" text-base text-primary--color p-3">Chỉnh sửa thông tin sách</div>
//                 <div className="font-medium text-lg text-primary--color border-b w-full"></div>
                        
//                   <div className="setting-content flex flex-col w-full h-2/3">
//                     <div className=' w-1/3 h-3/4 mt-3'>
//                       <div className='flex flex-row justify-between h-24'>
  //                       <img
  //                           src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff5fb3e4398b2a12b0c4655308105d2cc5a933e58190585a1cefd3a7a4cb3277?apiKey=7b5a6c783f57430d80b4e963675be0fc&"
  //                           alt="avatar"
  //                           className='w-full h-full aspect-square object-cover rounded-xl'
  //                       />
  //                       <img
  //                           src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff5fb3e4398b2a12b0c4655308105d2cc5a933e58190585a1cefd3a7a4cb3277?apiKey=7b5a6c783f57430d80b4e963675be0fc&"
  //                           alt="avatar"
  //                           className='w-full h-full aspect-square object-cover rounded-xl'
  //                       />
//                      </div>
//                     <button className=" border-2 ml-12 mt-5 m-2 text-header--lightcolor font-semibold py-2 px-4 rounded-full" onClick={handleDrawerClose}>
//                         Thêm ảnh
//                     </button>  
//                   </div>
//                   </div>
//                      <div className="content-staffinf ml-9 flex-1 w-full flex-col pt-2">
//                           <div className="m-2 flex gap-1 text-primary--color">
//                               <span className="text-header--lightcolor flex items-center">Mã sách: </span>
//                               <input type="text" className="m-2" value="huynh94" readOnly />
//                           </div>
//                           <div className="m-2 flex gap-1 text-primary--color">
//                               <span className="text-header--lightcolor flex items-center">Tên sách: </span>
//                               <input type="text" className="m-2" value="Little Women" />
//                           </div>
//                           <div className="m-2 flex gap-1 text-primary--color">
//                               <span className="text-header--lightcolor flex items-center">Giá: </span>
//                               <input type="text" className="m-2" value="99.000" />
//                           </div>
//                           
//                         </div>
//                           <div className="m-2 flex gap-1 text-primary--color">
//                               <span className="text-header--lightcolor flex items-center">Tác giả: </span>
//                               <input type="text" className="m-2" value="Louisa May Alcott" />
//                           </div>
//                           <div className="m-2 flex gap-1 text-primary--color">
//                               <span className="text-header--lightcolor flex items-center">Nhà xuất bản: </span>
//                               <input type="text" className="m-2" value="Random House UK" />
//                           </div>
//                           <div className="m-2 flex gap-1 text-primary--color">
//                               <div className="w-20">
//                                   <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
//                               </div>
//                               <textarea
//                                   type="text"
//                                   className="m-2 -mt-1"
//                                   value="Tổ 1, ấp Tân sơn, xã Ngũ Hiệp, huyện Cai Lậy, tỉnh Tiền Giang"
//                               />
//                           </div>
//                       </div>
//                     </div>
//                       {/* JobInforEdit */}
//                       <div className="z-10 w-full mt-2 max-md:max-w-full">
//                           <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
//                           <div className=" text-base text-primary--color p-3">Chỉnh sửa thông tin làm việc</div>
//                           <div className="font-medium text-lg text-primary--color border-b w-full"></div>
                          
//                           <div className="content-jobinfor ml-9 flex-1 w-full flex-col pt-2">
//                               <div className="m-2 flex gap-1 text-primary--color">
//                                 <div className='w-30'>
//                                   <span className="text-header--lightcolor flex items-center">Chức vụ: </span>
//                                 </div>  
//                                   <input type="text" className="m-2 -mt-0" value="Nhân viên" />
//                               </div>
//                               <div className="m-2 flex gap-1 text-primary--color">
//                                 <div className='w-15'>
//                                   <span className="text-header--lightcolor flex items-center">Ngày vào làm: </span>
//                                 </div>  
//                                   <input type="text" className="m-2 -mt-0" value="14/07/2020" />
//                               </div>
//                               <div className="m-2 flex gap-1 text-primary--color">
//                                   <span className="text-header--lightcolor flex items-center">Lương: </span>
//                                   <input type="text" className="m-2" value="10,000,000 vnđ" />
//                               </div>
//                               <div className="m-2 flex gap-1 text-primary--color">
//                                   <span className="text-header--lightcolor flex items-center">Quản lý chi nhánh: </span>
//                                   <input type="text" className="m-2" value="Duong Han" />
//                               </div>
//                           </div>
//                       </div>
//                   </div>
//                 <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerClose}>
//                   Cập nhật thông tin
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div >
//   </div>
    
//   );
// }