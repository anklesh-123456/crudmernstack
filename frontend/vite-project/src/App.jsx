import React, { Fragment } from 'react';
import axios from "axios";
import { useState,useEffect } from 'react';


const App = () => {
  const [name, setname] = useState("")
  const [age, setage] = useState("")
  const [list, setlist] = useState([])

  const postdata =async()=>{
    const result = await axios.post("https://mernstackcrudapp-6uuk.onrender.com/post",{name:name,age:age});
    // console.log(result.data)
    setlist([...list,{_id:result.data._id,name:name, age:age}])
  }

  const updatedata =async(id)=>{
    const newname = prompt("enter new name")
    const newage = prompt("enter new age")
    const data = await axios.put(`https://mernstackcrudapp-6uuk.onrender.com/${id}`,{name:newname,age:newage});
    // console.log(data)
   setlist(list.map((val)=>{
    return val._id==id ? {_id:id,name:newname,age:newage}:val;
   }))
  }
  const deletedata =async(id)=>{
    const data = await axios.delete(`https://mernstackcrudapp-6uuk.onrender.com/${id}`,{name:name,age:age});
    setlist(list.filter((val)=>{
      return val._id!=id;
    }))
    // console.log(data)
  }

  useEffect(()=>{
    const getdata =async()=>{
      const result = await axios.get("https://mernstackcrudapp-6uuk.onrender.com/get");
      // console.log(result.data);
      setlist(result.data)
    }
    getdata();
  },[])

  return (
    <div className=' bg-cyan-300 w-full h-[100vh]'>
    
    <div className=' flex flex-col items-center justify-center gap-4'>
      <div className=' mt-10 bg-blue-600 flex-col flex gap-3  justify-center rounded-md p-5'>
        <input type="text" className='w-[17rem] rounded-md' placeholder='Enter Name' onChange={(e)=>setname(e.target.value)}/>
        <input type="number" className='w-[17rem] rounded-md' placeholder='Enter Age' onChange={(e)=>setage(e.target.value)}/>
        <button type='submit' className=' bg-black rounded-md font-bold w-[17rem] text-white hover:bg-cyan-400 p-1' onClick={postdata}>Submit</button>
        
      </div>
     

      {
        list.map((val)=>(
          <div  className=' flex justify-between gap-2  bg-blue-600 text-white p-2 w-[19.5rem] rounded-md'>
            <h1 className='font-semibold'>{val.name}</h1>
            <h2 className='font-semibold'>{val.age}</h2>
            <button  className=' bg-black rounded-md font-bold w-[5rem] text-white hover:bg-cyan-400 p-1' onClick={()=>updatedata(val._id)}>Update</button>
            <button  className=' bg-black rounded-md font-bold w-[5rem] text-white hover:bg-cyan-400 p-1' onClick={()=>deletedata(val._id)}>Delete</button>
          </div>
        ) )
      }

</div>
</div>

  )
    }

export default App;