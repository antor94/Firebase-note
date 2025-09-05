import React, { use, useEffect, useState } from 'react';
import { IoColorPaletteOutline } from "react-icons/io5";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { useSelector } from 'react-redux';


  const CreateNote = ({noteData}) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [noteColor, setNoteColor] = useState('bg-[#2D2F31]');
  const [textColor, setTextColor] = useState('text-white');




  const currentUser = useSelector((state)=>state.myRedux.value)

    const db = getDatabase();

  const handleAdd = () => {

  set(push(ref(db, 'allNotes/' )), {
    noteId:currentUser.uid,
    noteHead:title,
    noteContent:content,
    noteColor:noteColor,
    textColor:textColor

  });


    // ------------ remove data
    // remove(ref(db , ('alu/')))
 
  };


  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (value.trim() !== '') {
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
    }
  };

  //---------------- Close button
  const handleClose = () => {
    setShowTextarea(false);
    setTitle('');
    setContent('');
    setShowColorOptions(false);
    setNoteColor('bg-[#2D2F31]');
    setTextColor('text-white');
  };


const handelColor = (color)=>{
  setNoteColor(color)
}


console.log(noteColor)

  useEffect(()=>{
    setTitle(noteData?.notes?.noteHead)
    setContent(noteData?.notes?.noteContent)

  },[noteData])



  const handleUpdate = ()=>{
    update(ref(db , 'allNotes/' + noteData.key) , {
   noteHead:title,
    noteContent:content,
    noteColor:noteColor,
    textColor:textColor
    })
        setTitle('');
    setContent('');
  }


  return (
    <>
      {/*----------------- Background */}


      <div  onClick={handleAdd}  className={`bg-[#202124] flex justify-center items-center p-6 font-sans text-white text-center`} >
        {/* Main Note Div */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-[500px] p-4 rounded-md cursor-text transition-all ${noteColor} duration-300 ${textColor}`}
         
        >
          <div className="flex flex-col items-start space-y-3">
            {/*-------------- Input */}
            <input  type="text"  placeholder="Title."  value={title}  onChange={handleTitleChange}  className={`bg-transparent w-full placeholder-gray-400 outline-none ${textColor}`}  onClick={() => setShowTextarea(true)} />

            {/* Textarea and Buttons */}
            {showTextarea && (
              <>
                <textarea
                  placeholder="Write more details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`bg-transparent w-full placeholder-gray-400 outline-none resize-none h-24 ${textColor}`}
                />

                <div className="flex justify-between items-center w-full mt-2">

                  <div className='flex items-center gap-[10px]'>
                    <button onClick={()=>handelColor('bg-[#2D2F31]')}  className='w-[20px] h-[20px] border rounded-full bg-[#2D2F31]'></button>
                    <button onClick={()=>handelColor('bg-[#F28B82]')}  className='w-[20px] h-[20px] border rounded-full bg-[#F28B82]'></button>
                    <button onClick={()=>handelColor('bg-[#FDCFE8]')}  className='w-[20px] h-[20px] border rounded-full bg-[#FDCFE8]'></button>
                    <button  onClick={()=>handelColor('bg-red-500')} className='w-[20px] h-[20px] border rounded-full bg-red-400'></button>
                      <input
    type="color" value={noteColor} 
    className='w-[40px] h-[30px]  rounded-full'
    onChange={(e) => setNoteColor(e.target.value)}
  />


                  </div>

    
                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="text-sm text-white hover:text-red-300 px-3 py-1 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
  
    </>
  );
};

export default CreateNote;
