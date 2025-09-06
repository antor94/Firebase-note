import React, { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, update } from "firebase/database";
import { useSelector } from 'react-redux';

const CreateNote = ({ noteData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);
  const [noteColor, setNoteColor] = useState('#2D2F31'); 
  const [textColor, setTextColor] = useState('text-white');
  const currentUser = useSelector((state) => state.myRedux.value);

  // --------------- update data
  const [isUpdate , setIsUpdate] = useState(false)
  // ------------- firebase db
  const db = getDatabase();

  const handleAdd = () => {
    if(!title || !content) return alert('Not Set Data')
    set(push(ref(db, 'allNotes/')), {
      noteId: currentUser.uid,
      noteHead: title,
      noteContent: content,
      noteColor: noteColor, 
      textColor: textColor
    });
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setShowTextarea(value.trim() !== '');
  };

  const handleClose = () => {
    setShowTextarea(false);
    setTitle('');
    setContent('');
    setNoteColor('#2D2F31'); 
    setTextColor('text-white');
  };

  const handleColorSelect = (color) => {
    setNoteColor(color);
  };

  useEffect(() => {
    if(noteData){
      setIsUpdate(true)
    setTitle(noteData?.notes?.noteHead );
    setContent(noteData?.notes?.noteContent );
    setNoteColor(noteData?.notes?.noteColor || '#2D2F31');
    }else{
    setTitle('');
    setContent('');
    }
  }, [noteData]);

  const handleUpdate = () => {
    update(ref(db, 'allNotes/' + noteData.key), {
      noteHead: title,
      noteContent: content,
      noteColor: noteColor,
      textColor: textColor
    });
    setIsUpdate(false)
    setTitle('');
    setContent('');
  };

  return (

    <>
    <div className="bg-[#202124] flex justify-center items-center p-6 font-sans text-white text-center">
      <div  style={{ backgroundColor: noteColor }}  className={`w-[500px] p-4 rounded-md cursor-text  transition-all duration-300 ${textColor}`} >
        <div className="flex flex-col">
  <div className='flex'>
          <input
            type="text"
            placeholder="Title."
            value={title}
            onChange={handleTitleChange}
            className={`bg-transparent w-full placeholder-gray-400 outline-none ${textColor}`}
            onClick={() => setShowTextarea(true)}
          />
          {
            isUpdate ?
            <button onClick={handleUpdate} className='w-[200px]'>Update Note</button>
:
          <button onClick={handleAdd} className='w-[200px]'>Add Note</button>
          }
        </div>
          {/* -------------- textarea */}

          {showTextarea && (
        <div>
              <textarea
                placeholder="Write more details..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`bg-transparent w-full pt-[20px] placeholder-gray-400 outline-none resize-none h-24 ${textColor}`}  />       
              <div className="flex justify-between items-center w-full mt-2">
                <div className="flex items-center gap-[10px]">
                  {/* Color buttons use hex directly */}
                  <button onClick={() => handleColorSelect('#2D2F31')} className='w-[20px] h-[20px] border rounded-full bg-[#2D2F31]'></button>
                  <button onClick={() => handleColorSelect('#F28B82')} className='w-[20px] h-[20px] border rounded-full bg-[#F28B82]'></button>
                  <button onClick={() => handleColorSelect('#FDCFE8')} className='w-[20px] h-[20px] border rounded-full bg-[#FDCFE8]'></button>
                  <button onClick={() => handleColorSelect('#EF4444')} className='w-[20px] h-[20px] border rounded-full bg-red-400'></button>
                  {/* Color picker */}
                  <input
                    type="color"
                    value={noteColor}
                    className='w-[40px] h-[30px] rounded-full'
                    onChange={(e) => handleColorSelect(e.target.value)}
                  />
                </div>
                {/*----------------- Close Button */}
                <button onClick={() => {handleClose()}}  className="text-sm text-white hover:text-red-300 px-3 py-1 rounded-md" >   Close  </button>
              </div>
        </div>              
          )}
        </div>
      </div>
    </div>
    </>

  );
};

export default CreateNote;
