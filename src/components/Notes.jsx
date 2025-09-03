import React, { useEffect, useState } from 'react';
import { IoColorPaletteOutline } from "react-icons/io5";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';


  const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showTextarea, setShowTextarea] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [noteColor, setNoteColor] = useState('#2D2F31');
  const [textColor, setTextColor] = useState('text-white');
  
  const [noteHead , setNodHead] = useState()

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
    setNoteColor('#2D2F31');
    setTextColor('text-white');
  };

  //---------------- Color 
  const colors = [
    '#2D2F31',
    '#F28B82',
    '#FBBC04',
    '#FFF475',
    '#CCFF90',
    '#A7FFEB',
    '#CBF0F8',
    '#AECBFA',
    '#D7AEFB',
    '#FDCFE8',
  ];

  const handleColorSelect = (color) => {
    setNoteColor(color);

    if (color === '#2D2F31') {
      setTextColor('text-white');
    } else {
      setTextColor('text-black');
    }
  };

  return (
    <>
      {/*----------------- Background */}
      <div  onClick={()=>handleAdd()}  className="bg-[#202124] flex justify-center items-center p-6 font-sans text-white text-center" >
        {/* Main Note Div */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-[500px] p-4 rounded-md cursor-text transition-all duration-300 ${textColor}`}
          style={{ backgroundColor: noteColor }}
        >
          <div className="flex flex-col items-start space-y-3">
            {/* Input */}
            <input
              type="text"
              placeholder="Title."
              value={title}
              onChange={handleTitleChange}
              className={`bg-transparent w-full placeholder-gray-400 outline-none ${textColor}`}
              onClick={() => setShowTextarea(true)}
            />

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
                  {/* Color Picker Toggle */}
                  <div>
                    <div className="flex justify-between items-center w-full mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowColorOptions(!showColorOptions);
                        }}
                        className="text-base text-white px-3 py-1 rounded-md "
                      >
                        <IoColorPaletteOutline />
                      </button>
                    </div>

                    {/* Color Picker */}
                    {showColorOptions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {colors.map((color) => (
                          <div
                            key={color}
                            className="w-6 h-6 rounded-full cursor-pointer border border-white"
                            style={{ backgroundColor: color }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleColorSelect(color);
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
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
