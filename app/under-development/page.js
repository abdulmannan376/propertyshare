"use client"
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { updateNavbarLogo, updateNavbarTextColor, updateNotificationIconColor } from '../redux/features/navbarSlice';

const Page = () => {

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateNavbarTextColor({
        textColor: "text-[#116A7B]",
        hoverTextColor: "text-[#116A7B]",
      })
    );
    dispatch(updateNavbarLogo("/logo-bbh.png"));
    dispatch(updateNotificationIconColor("text-[#116A7B]"))
  }, []);
  return (
    <>
    {/* <div className="w-full h-20 bg-white"></div> */}
    <div className='h-screen flex items-center justify-center'>
        <h1 className='text-5xl font-semibold text-[#116A7B] text-center'>Under Development</h1>
    </div>
    </>
  )
}

export default Page