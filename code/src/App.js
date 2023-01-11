import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
const getLocalItems=()=>{
  let list =localStorage.getItem('lists')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}
const App = () => {
const [cinput,setinput]=useState('')
const [cadd,uadd]=useState(getLocalItems('lists'))
const [toggle,togglesu]=useState(true)
const [edit,uedit]=useState()

 const inputitm=(event)=>
 {
     setinput(event.target.value)
 }
const add=()=>{
  if(!cinput){
    alert('enter first')
  }
  else if(cinput && !toggle){
     uadd(  
      cadd.map((elem)=>{
         if(elem.id===edit){
          return {...elem, name : cinput}
         
         } 
         return elem
       })
       )
       setinput('')
       togglesu(true)

  }
  else{
  const alldata={id:new Date().getTime().toString(),name:cinput }
     uadd((olditems)=>{
      return [...olditems,alldata]
     })
     setinput('')}
}

const deleteitem=(index)=>{
  
   uadd((olditems)=>{
    return olditems.filter((elm)=>{
      return index!==elm.id
    })
   })
}
const edititem=(id)=>{
   let newedititem=cadd.find((elem)=>{
    return elem.id===id
   })
   setinput(newedititem.name)
   uedit(id)
   togglesu(false)

}

  return (
    <>
    <div className='main'>
     <div > 
      {toggle ? (<AddIcon className='add' onClick={add} />)
      :(<EditIcon className='add' onClick={add} />)}
       <input onChange={inputitm} type="text"  value={cinput} placeholder='Add Item' 
       className='input' name="input"  />
       
     </div>
     <div className='d'>
     {
      
      cadd.map((elem)=>{
        return(
         
          <div className=' dnc' key={elem.id}> {elem.name} 
        <div>
         <div className='m'>
         <EditIcon  className='edit' onClick={()=>{edititem(elem.id)}} />
          <DeleteIcon className='dlt' onClick={()=>{deleteitem(elem.id)}} /> </div>
        </div>
      </div>)
      })
      
     }                 
     </div>
     </div>
    </>
  )
}

export default App
