import { getDatabase, onValue, ref, remove } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { TiDelete } from 'react-icons/ti'
import { useSelector } from 'react-redux';
import { data } from 'react-router';

const Bin = () => {

  const db = getDatabase();
    const currentUser = useSelector((state) => state.myRedux.value);

    const [deleteNotes , setDeleteNotes] = useState([])

    useEffect(()=>{
        onValue(ref(db,'removeNote/') , (dbData)=>{
            let arr = []
            dbData.forEach((item)=>{
                if(item.val().noteId == currentUser.uid ){
                    arr.push({data:item.val() , key:item.key})
                }
            })
            setDeleteNotes(arr)
        })
    },[])








  return (
    <>


    <div className='bg-[#202124] min-h-screen'>

    
    
   <button className='py-1 px-5 bg-white text-lg font-sans text-gray-600 border border-[#455na] '>Delete All</button>
   {
    deleteNotes.map((item)=>(
                 <div key={item.key}   className={` bg-[${item.data.noteColor}] relative w-[500px] p-4 rounded-lg `}>
                <h2 className="text-[24px] font-sans font-medium text-[#fff]">{item.data.noteHead}</h2>
                <p className="text-[18px] font-normal font-sans text-[#ddd]">{item.data.noteContent}</p>
                <button  className=' absolute top-[10px] right-[20px]'><TiDelete className='text-[32px] text-amber-200 hover:text-[red] duration-[.3s] ' /></button>
              </div>

    ))
   }
    
            
    </div>
    
    
    </>
  )
}

export default Bin