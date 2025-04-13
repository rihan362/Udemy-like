// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { assets } from '../../assets/assets';
// import { useClerk,useUser,UserButton } from '@clerk/clerk-react';
// import { AppContext } from '../../context/AppContext';

// const Navbar = () => {
//     const isCourseListPage=location.pathname.includes('/course-list')
//     const {openSignIn}=useClerk();
//     const {user}=useUser();
//     const {navigate,isEducator}=useContext(AppContext);
//   return (
//     <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white':'bg-cyan-100/70'}`}>  
//         <img onClick={()=>navigate('/')} src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer'/>
//         <div className='hidden md:flex items-center gap-5 text-gray-500'>
//             <div className='flex items-center gap-5'>
//               { user && 
//               <>
//               <button onClick={()=>{useNavigate('/educator')}}>{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>
//             |<Link to='/my-enrollments'>My Enrollments</Link>

//               </>
//               }
//                </div>

//             {user?<UserButton/>:

//               <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>}
//          </div>

//          <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
//          <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
//          { user && 
//               <>
//               <button onClick={()=>{useNavigate('/educator')}}>{isEducator? 'Educator Dashboard' : 'Become Educator'}</button>

//             |<Link to='/my-enrollments'>My Enrollments</Link>

//               </>
//           }
//          </div>

//          {user?<UserButton/>:

// <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'><img src={assets.user_icon}/></button>
// }       </div>
//     </div>

  
    
  
//   )
// }

// export default Navbar


// // import React from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { assets } from '../../assets/assets';

// // const Navbar = () => {
// //     const location = useLocation();
// //     const isCourseListPage = location.pathname.includes('/course-list');
    
// //     return (
// //         <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>  
// //             <img src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer'/>
// //             <div className='hidden md:flex items-center gap-5 text-gray-500'>
// //                 <button className='hover:text-gray-700'>Become an educator</button>
// //                 <Link to='/my-enrollments' className='hover:text-gray-700'>My Enrollments</Link>
// //                 <button className='bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700'>Create Account</button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Navbar;

import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isCourseListPage = location.pathname.includes('/course-list');
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const { isEducator } = useContext(AppContext);

    return (
        <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>  
            <img 
                onClick={() => navigate('/')} 
                src={assets.logo} 
                alt='Logo' 
                className='w-28 lg:w-32 cursor-pointer'
            />
            
            <div className='hidden md:flex items-center gap-5 text-gray-500'>
                <div className='flex items-center gap-5'>
                    {user && 
                        <>
                            <button 
                                onClick={() => navigate('/educator')}
                                className="hover:text-gray-700"
                            >
                                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
                            </button>
                            <span>|</span>
                            <Link 
                                to='/my-enrollments' 
                                className="hover:text-gray-700"
                            >
                                My Enrollments
                            </Link>
                        </>
                    }
                </div>

                {user ? (
                    <UserButton />
                ) : (
                    <button 
                        onClick={() => openSignIn()} 
                        className='bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700'
                    >
                        Create Account
                    </button>
                )}
            </div>

            <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
                <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
                    {user && 
                        <>
                            <button 
                                onClick={() => navigate('/educator')}
                                className="hover:text-gray-700"
                            >
                                {isEducator ? 'Dashboard' : 'Educator'}
                            </button>
                            <span>|</span>
                            <Link 
                                to='/my-enrollments' 
                                className="hover:text-gray-700"
                            >
                                Enrollments
                            </Link>
                        </>
                    }
                </div>

                {user ? (
                    <UserButton />
                ) : (
                    <button 
                        onClick={() => openSignIn()} 
                        className='bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700'
                    >
                        <img src={assets.user_icon} alt="User" className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;