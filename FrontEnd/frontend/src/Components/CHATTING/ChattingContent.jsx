import React, { Fragment} from 'react'
import { Transition, Menu } from '@headlessui/react';
import { IoSearchOutline } from "react-icons/io5";
import messData from '../../Data/messData';
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { useState } from 'react';

export default function ChattingContent({messdata,user}) { 
    
    const[searchMess, getSearchMess] = useState('');
    
    const Avatar = ({ avaSRC }) => {
        return (
            <div className="userava img w-10 h-10 rounded-full ">
                <img src={avaSRC} alt="" style={{ borderRadius: '50%' }}/> 
            </div>
        );
    }

    const handleSearchMess = (event) => {
        const value = event.target.value;
        getSearchMess(value);
    }

    const filteredData = messdata.filter((item) =>
    item.name.toLowerCase().includes(searchMess.toLowerCase()));

   

  return (
    <div className="maincontent flex h-full w-full overflow-hidden gap-8">
                    <div className="maincontent_left sm:flex sm:flex-col sm:gap-4 sm:w-2/5 w-16 gap-4 flex flex-col">
                        <div className="list-chat-search relative flex items-center w-full">
                            <input type="text" value={searchMess} placeholder="Tìm kiếm" className="search-input border text-primary--color border-border--lightcolor h-11 w-full rounded-lg relative pl-4 pr-10" onChange={handleSearchMess}/>
                            <span className='text-xl absolute right-3 '><IoSearchOutline/></span>
                        </div>
                        <div className="list-chat flex flex-col overflow-y-auto">
                            <div className="list-chat-history flex flex-col overflow-y-auto ">

                                <ul className="contacts ">
                                    <li className="active_listchat ">
                                        {filteredData.map((mess)=>(
                                            <div className="contacts_item flex sm:gap-3 sm:w-full h-20 sm:items-center hover:bg-backgroud--lightcolor  hover:no-underline cursor-pointer w-11 ">
                                            <Avatar avaSRC={mess.avatar}/>
                                            <div className="sm:contacts_item_content sm:unread sm:flex-1 sm:flex sm:flex-col whitespace-nowrap overflow-hidden hidden ">
                                                <span className="user_inf font-medium">{mess.name}</span>
                                                <span className='text-xs'>{mess.address}</span>
                                            </div>
                                            <div className='sm:w-20 sm:flex sm:flex-col sm:justify-center sm:items-center sm:gap-1 hidden '>
                                                <div className="numbermess unread  bg-primary--color w-4 h-4 rounded-full ">
                                                    <div className="numbermessnow flex justify-center items-center text-xs text-white--color">{mess.numbermess}</div>
                                                </div>
                                                <div className='w-full text-sm flex items-center justify-center'>{mess.timeoff} phut</div>
                                            </div>
                                            
                                        </div>
                                        ))}
            
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="maincontent_right md:w-3/5 h-full flex flex-col overflow-hidden gap-4 w-80">
                        <div className="chatbox-header flex justify-between pr-4 pb-8 items-center">
                            <div className='flex gap-4'>
                                <Avatar avaSRC={user.avatar}/>
                                    <div className="chatbox-userinf flex flex-col">
                                        <span className="user_inf">Oohsehun</span>
                                        <span>+84 12345678</span>
                                    </div>
                            </div>
                            
                            <Menu as="div" className="relative  ">
                                <div>
                                    <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                                        <span id="action_menu_btn"><CiMenuKebab/></span>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-0.5 bg-white--color ring-1 ring-black ring-opacity-5 focus:outline-none text-primary--color text-xs">
                                    <Menu.Item>
                                        <div className="flex px-4 py-2 flex gap-4  hover:bg-backgroud--lightcolor  hover:no-underline cursor-pointer">
                                            <span><FaPlus/></span>
                                            <span>Thêm vào nhóm</span>
                                        </div>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <div className="flex px-4 py-2 flex gap-4  hover:bg-backgroud--lightcolor  hover:no-underline cursor-pointer">
                                            <span><FaBan/></span>
                                            <span>Chặn</span>
                                        </div>
                                    </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                       </div>
                       <div className="chatbox-body w-full h-5/6 overflow-auto">
                            <div className="body-content">
                                <div className="message_user_mess flex gap-4">
                                    <Avatar avaSRC={user.avatar}/>
                                    <div className="mess-content flex flex-col gap-1 ">
                                        <p className=' bg-border--color text-primary--color rounded-r-3xl rounded-b-3xl p-2'>Xin chao</p>
									    <span className="msg_time text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>

                                    </div>
                            
                                </div>
    
                                <div className="message_admin_mess flex w-full justify-end pr-4 py-2">
                                    <div className="mess-content flex flex-col w-2/4 gap-1">
                                        <span className=' bg-primary--color text-white--color rounded-l-3xl rounded-b-3xl p-2'>Cam on ban da quan tam den cua hang sach cua chung toi
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus velit autem modi consequatur, at explicabo dicta,
                                        maiores nobis maxime exercitationem quam totam nesciunt nemo quidem magnam voluptas, dolor impedit!</span>
									    <span className="msg_time_send text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>
                                    
                                    </div>
                                </div>

                                <div className="message_user_mess flex gap-4">
                                    <Avatar avaSRC={user.avatar}/>
                                    <div className="mess-content flex flex-col gap-1 ">
                                        <p className=' bg-border--color text-primary--color rounded-r-3xl rounded-b-3xl p-2'>Xin chao</p>
									    <span className="msg_time text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>

                                    </div>
                            
                                </div>
    
                                <div className="message_admin_mess flex w-full justify-end pr-4 py-2">
                                    <div className="mess-content flex flex-col w-2/4 gap-1">
                                        <span className=' bg-primary--color text-white--color rounded-l-3xl rounded-b-3xl p-2'>Cam on ban da quan tam den cua hang sach cua chung toi
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum possimus velit autem modi consequatur, at explicabo dicta,
                                        maiores nobis maxime exercitationem quam totam nesciunt nemo quidem magnam voluptas, dolor impedit!</span>
									    <span className="msg_time_send text-xs  text-header--lightcolor pl-1">9:07 AM, Today</span>
                                    
                                    </div>
                                </div>
                            </div>
                              
                       </div>
                       <div className="chatbox-footer w-fulljustify-center items-center flex text-primary--color">
                            <div className="input-group-text flex-1 flex items-center justify-end relative">
                                <textarea type="text" placeholder="" className="search-input w-full h-12 relative border  border-border--lightcolor pl-2 pr-16 pt-3  rounded-lg"/>
                                <span className='absolute right-4 text-lg cursor-pointer'><FaMicrophone/></span>
                                <span className='absolute right-10 text-lg cursor-pointer'><IoIosAttach/></span>
                            </div>
                            <div className="input-group-send w-10">
                                <span className='text-3xl cursor-pointer'><IoIosSend/></span>
                            </div>
                       </div>
                    </div> 
                </div>  
  )
}
