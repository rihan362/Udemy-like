// import React, { useEffect, useRef, useState } from 'react'
// import uniqid from 'uniqid';
// import Quill from 'quill';
// import { assets } from '../../assets/assets';

// const AddCourse = () => {
//   const quillRef=useRef(null);
//   const editorRef=useRef(null);

//   const [courseTitle,setCourseTitle]=useState(' ');
//   const [coursePrice,setCoursePrice]=useState(0);
//   const [discount,setDiscount]=useState(0);
//   const [image,setImage]=useState(null);
//   const [chapters,setChapters]=useState([]);
//   const[showPopUp,setShowPopUp]=useState(false);
//   const [currentChapterId,setCurrentChapterId]=useState();

//   const [lectureDetails,setLectureDetails]=useState(
//     {
//       lectureTitle:'',
//       lectureDuration:'',
//       lectureUrl:'',
//       isPreviewFree:false,

//     }

//   )

//   const handleChapter=(action,chapterId)=>{
//       if(action==='add')
//       {
//         const title=prompt('Enter chapter name');
//         if(title)
//         {
//           const newChapter={
//             chapterId:uniqid(),
//             chapterTitle:title,
//             chapterContent:[],
//             collapsed:false,
//             chapterOrder:chapter.length>0?chapters.slice(-1)[0].chapterOrder+1:1,
//           }
//           setChapters([...chapters,newChapter])
//         }
//       }else if(action==='remove')
//       {
//         setChapters(chapters.filter((chapter)=>chapter.chapterId!==chapterId));
//       }
//       else if(action==='toggle')
//       {
//         setChapters(
//           chapters.map((chapter)=>
//           chapter.chapterId===chapterId ? {...chapter,collapsed:!chapter.collapsed}:chapter)
//         )
//       }
//   }

//   const handleLecture=(action,chapterId,lectureIndex)=>{
//     if(action==='add')
//     {
//       setCurrentChapterId(chapterId);
//       setShowPopUp(true);
//     }
//     else if(action=='remove')
//     {
//       setChapters(
//         chapters.map((chapter)=>{
//           if(chapter.chapterId===chapterId)
//           {
//             chapter.chapterContent.splice(lectureIndex,1)
//           }
//           return chapter
//         })
//       )
//     }
//   }

//   useEffect(()=>{
//     if(!quillRef.current && editorRef.current){
//       quillRef.current=new Quill(editorRef.current,{
//         theme:'snow',
//       })
//     }
//   },[])
  
//   return ( 
//     <div className='h-screen overflow-scroll flex flex-col items-start 
//     justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
//       <form className='flex flex-col gap-4 max-w-md w-full text-gray-700'>
//         <div className='flex flex-col  gap-1'>
//           <p>Course Title</p>
//           <input onChange={e=>setCourseTitle(e.target.value)} value={courseTitle}
//            type='text' placeholder='Type Here' 
//            className='outline-none md:py-2.5 py-2 px-3 rounded border
//             border-gray-100' required/>
//         </div>
//         <div className='flex flex-col gap-1'>
//            <p>Course Description</p>
//            <div ref={editorRef}></div>
//         </div>
        
//         <div className='flex items-center justify-between flex-wrap'>
//           <div className="flex flex-col gap-1">
//                <p>Course Price</p>
//                <input onChange={e=>setCoursePrice(e.target.value)} value={coursePrice} type='number' placeholder='0'
//                className='outliner-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>

//           </div>
//           <div className='flex md:flex-row flex-col items-center gap-3'>
//             <p>Course Thumbnail</p>
//             <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
//               <img src={assets.file_upload_icon} alt='' className='p-3 bg-blue-500 rounded'/>
//               <input type='file' id='thumbnailImage' onChange={e=>setImage(e.target.files[0])} accept="/image/*" hidden/>
//               <img className='max-h-10' src={image?URL.createObjectURL(image):''} alt=''/>
//             </label>
//           </div>

//           <div className="flex flex-col gap-1">
//             <p>Discount</p>
//             <input onChange={e=>setDiscount(e.target.value)} value={discount} type="number" placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border
//             border-gray-500' required/>
//           </div>
//           <div>
//             {chapters.map((chapter,chapterIndex)=>{
//               <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
//                 <div className='flex justify-between items-center p-4 border-b'>
//                   <div className="flex items-center">
//                     <img onClick={()=>handleChapter('toggle',chapter.chapterId)}
//                      src={assets.dropdown_icon} width={14} alt='' className={`mr-2 cursor-pointer 
//                       transition-all ${chapter.collapsed && "-rotate-90"}`}/>
//                       <span className='font-semibold'>{chapterIndex+1}{chapter.chapterTitle}</span>

//                   </div>
//                   <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
//                    <img onClick={()=>handleChapter('remove',chapter.chapterId)}
//                     src={assets.cross_icon} alt='' className='cursor-pointer'/>
//                   </div>
//                   {!chapter.collapsed && (
//                     <div className='p-4'>
//                       {chapter.chapterContent.map((lecture, lectureIndex) => (
//                         <div key={lectureIndex} className='flex justify-between items-center mb-2 '>
//                           {/* Add your JSX for each lecture here */}
//                           <span>
//                             {lectureIndex+1}{lecture.lectureTitle}-{lecture.lectureDuration}
//                             min -<a href={lecture.lectureUrl} target='_blank' 
//                             className='text-blue-500'>Link</a>
//                             -{lecture.isPreviewFree?'Free Preview':'Paid'}
//                           </span>
//                           <img src={assets.cross_icon} alt='' 
//                           onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)} className='cursor-pointer'/>
//                         </div>
//                       ))}
//                       <div className="inline-flex bg-gray-300 p-2 rounded cursor-pointer mt-2"
//                        onClick={()=>handleLecture('add',chapter.chapterId)}>
//                         +Add Lectures
//                       </div>
//                     </div>
//                   )}

//               </div>
//             })}
//             <div className="flex justify-center items-center bg-blue-100  p-2 rounded-b-lg cursor-pointer " onClick={()=>handleChapter('add')}>
//               +Add Chapter
//             </div>
//             {showPopUp && (
//               <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
//                 <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
//                   <h2 className='text-lg font-semibold mb-4'>Add lecture</h2>
//                   <div className="mb-2">
//                     <p>Duration</p>
//                     <Input type="text" className="mt-1 block w-full border rounded py-1 px-2" 
//                     value={lectureDetails.lectureTitle} 
//                     onChange={(e)=>setLectureDetails({...lectureDetails,
//                       lectureTitle:e.target.value
//                     })} />
//                   </div>

//                   <div className="flex gap-2 my-4">
//                         <p>Is Preview Free?</p>
//                         <input type='checkbox' className='mt-1 scale-125' 
//                         checked={lectureDetails.isPreviewFree} onChange={(e)=>setLectureDetails
//                           ({...lectureDetails,isPreviewFree:e.target.checked})
//                         }/>
//                   </div>

//                   <button type='button' className='w-full
//                    bg-blue-500 text-white px-4 py-2 rounded'>Add</button>
//                    <img onClick={()=>setShowPopUp(false)}
//                     src={assets.cross_icon} className='absolute
//                    top-4 right-4 w-4 cursor-pointer'/>
//                 </div>
//               </div>
//             )}
//           </div>
//           <button type='submit' className='bg-black
//            text-white py-2.5 w-max px-8 rounded my-4 cursor-pointer'>Add</button>

//         </div>


//       </form>

//     </div>
//   )
// }

// export default AddCourse




import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState('');

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter chapter name');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action === 'remove') {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent];
            updatedContent.splice(lectureIndex, 1);
            return { ...chapter, chapterContent: updatedContent };
          }
          return chapter;
        })
      );
    }
  };

  const handleAddLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl) {
      alert('Please fill all lecture details');
      return;
    }

    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          return {
            ...chapter,
            chapterContent: [
              ...chapter.chapterContent,
              {
                ...lectureDetails,
                lectureId: uniqid(),
              },
            ],
          };
        }
        return chapter;
      })
    );

    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
    setShowPopUp(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted', {
      courseTitle,
      coursePrice,
      discount,
      image,
      chapters,
      description: quillRef.current?.root.innerHTML,
    });
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl bg-white rounded-lg shadow-md p-6 space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Title</label>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Enter course title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Course Description</label>
          <div
            ref={editorRef}
            className="h-48 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Price ($)</label>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder="0"
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Course Thumbnail</label>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="p-2 bg-blue-500 rounded-md text-white">
                <img src={assets.file_upload_icon} alt="Upload" className="w-5 h-5" />
              </div>
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
              {image ? (
                <span className="text-sm text-gray-600">{image.name}</span>
              ) : (
                <span className="text-sm text-gray-500">Choose an image</span>
              )}
            </label>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 h-16 object-contain rounded-md"
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Course Chapters</h2>
          {chapters.length === 0 && (
            <p className="text-sm text-gray-500">No chapters added yet</p>
          )}

          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.chapterId}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                <div className="flex items-center">
                  <button
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    className="mr-3 text-gray-500 hover:text-gray-700"
                  >
                    <img
                      src={assets.dropdown_icon}
                      alt="Toggle"
                      className={`w-4 h-4 transition-transform ${chapter.collapsed ? '-rotate-90' : ''}`}
                    />
                  </button>
                  <span className="font-medium">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {chapter.chapterContent.length} lecture
                    {chapter.chapterContent.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => handleChapter('remove', chapter.chapterId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <img src={assets.cross_icon} alt="Remove" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {!chapter.collapsed && (
                <div className="p-4 space-y-3">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lecture.lectureId || lectureIndex}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">
                          {lectureIndex + 1}. {lecture.lectureTitle}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                          <span>{lecture.lectureDuration} min</span>
                          <a
                            href={lecture.lectureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            View Link
                          </a>
                          {lecture.isPreviewFree && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                              Free Preview
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <img src={assets.cross_icon} alt="Remove" className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    className="w-full py-2 text-sm text-blue-500 hover:text-blue-700 border border-dashed border-gray-300 rounded-md hover:border-blue-300 flex items-center justify-center gap-2"
                  >
                    <span>+</span>
                    <span>Add Lecture</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleChapter('add')}
            className="w-full py-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md font-medium flex items-center justify-center gap-2"
          >
            <span>+</span>
            <span>Add Chapter</span>
          </button>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Course
          </button>
        </div>
      </form>

      {showPopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Add New Lecture</h3>
                <button
                  onClick={() => setShowPopUp(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <img src={assets.cross_icon} alt="Close" className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Video URL
                  </label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Available as free preview
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPopUp(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddLecture}
                  className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;