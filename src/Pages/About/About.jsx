import React, { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';

const api = "http://localhost:3000/data"



const About = () => {
  const openDialog = useRef(null);
  const openEditDialog = useRef(null);

  const [ data , setData ] = useState ( [] )

  const [ inpAddName , setInpAddName ] = useState ( '' )
  const [ inpAddImg , setInpAddImg ] = useState ( '' )
  const [ inpAddEmail , setInpAddEmail ] = useState ( '' )
  const [ inpAddPhone , setInpAddPhone ] = useState ( '' )
  const [ inpAddCity , setInpAddCity ] = useState ( '' )
  
  const [ inpEditName , setInpEditName ] = useState ( '' )
  const [ inpEditImg , setInpEditImg ] = useState ( '' )
  const [ inpEditEmail , setInpEditEmail ] = useState ( '' )
  const [ inpEditPhone , setInpEditPhone ] = useState ( '' )
  const [ inpEditCity , setInpEditCity ] = useState ( '' )


  async function getApi () {
    try {
      const { data } = await axios.get ( api )
      setData ( data )
    } catch (error) {
      console.error(error);
    }
  }

  // async function ChangeUser ( id ) { 
  //   inpEditName = elem.name , inpEditImg = elem.img , inpEditEmail = elem.email, inpEditCity = elem.city , inpEditPhone = elem.phone
  // }

  async function AddNewUser () {
    try {
      const { data } = await axios . post ( api, {
        img : inpAddImg,
        name : inpAddName,
        email : inpAddEmail,
        city : inpAddCity,
        phone : inpAddPhone,
        status : false 
      })
      getApi(data)
      openDialog.current.close()
    } catch (error) {
      console.error(error);
      
    }
  }



  useEffect (() => {
    getApi()
  }, [])
  return (
    <>
    <div className="flex items-center justify-around py-10">
      
      {/* Button to open dialog */}
      <button 
        onClick={() => openDialog.current.showModal()} 
        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white font-semibold rounded-lg shadow-xl shadow-[#0000004c] transition"
      >
        + Add New User
      </button>

      {/* Search input */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-5 py-2 text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-lg shadow-md outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:shadow-xl"
        />
        <Search className="text-gray-600 ml-[-35px]" size={20} />
      </div>

      {/* Dialog box */}
      <dialog ref={openDialog} className="p-6 bg-white w-[40%] rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New User</h2>

        <input value={inpAddImg} onChange={(event) => setInpAddImg (event.target.value)} type="text" className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input value={inpAddName} onChange={(event)=>setInpAddName(event.target.value)} type="text" placeholder="Full Name" className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input value={inpAddEmail} onChange={(event) => setInpAddEmail ( event.target.value )} type="email" placeholder="Email" className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input value={inpAddCity} onChange={(event) => setInpAddCity ( event.target.value )} type="text" placeholder="City" className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
        <input value={inpAddPhone} onChange={(event) => setInpAddPhone ( event.target.value )} type="phone" placeholder="Phone Number" className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />

        <div className="flex justify-end">
          <button 
            onClick={() => openDialog.current.close()} 
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
          <button onClick={()=> AddNewUser ()} className="px-4 py-2 ml-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Submit
          </button>
        </div>
      </dialog>
      
    </div>
    <div className='flex flex-wrap gap-[5%]  px-[10%]'>
      
    {data.map((elem) => (
  <div key={elem.id} className="hover:translate-y-2 duration-150 ease-in cursor-pointer m-auto mb-[5%] flex w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
   
    <img src={elem.img} alt={elem.name + "'s Avatar"} className="w-[60%] h-72 object-cover" />
    
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800">{elem.name}</h2>
      <p className="text-gray-500 text-sm">{elem.email}</p>
      <p className="text-gray-700 mt-2">
        <span className="font-medium">City:</span> {elem.city}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Phone:</span> {elem.phone}
      </p>
      <button onClick={()=> openEditDialog.current.showModal() } className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-semibold shadow-md hover:opacity-90 transition">
              Rename
      </button>


<dialog ref={openEditDialog} className="p-6 bg-white w-[40%] rounded-lg shadow-xl border border-gray-300">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User</h2>

  <div className="space-y-4">
    <input type="text" value={inpEditImg} onChange={()=> setInpEditImg(event.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500" />
    <input type="text" value={inpEditName} onChange={()=> setInpEditName(event.target.value)} placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500" />
    <input type="email" value={inpEditEmail} onChange={()=> setInpAddEmail(event.target.value)} placeholder="Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500" />
    <input type="text" value={inpEditCity} onChange={()=> setInpEditCity(event.target.value)} placeholder="City" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500" />
    <input type="number" value={inpEditPhone} onChange={()=> setInpEditPhone(event.target.value)} placeholder="Phone Number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500" />
  </div>

  <div className="flex justify-end space-x-4 mt-6">
    <button 
      onClick={() => openEditDialog.current.close()} 
      className="px-5 py-2 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
    >
      Cancel
    </button>

    <button 
    onClick={()=> ChangeUser ( elem . id )  }
      className="px-5 py-2 bg-gradient-to-r from-blue-800 to-blue-500 text-white font-medium rounded-lg hover:from-blue-900 hover:to-blue-600 transition shadow-lg"
    >
      Save Changes
    </button>
  </div>
</dialog>
    </div>
  </div>
))}

</div>



    </>
  );
};

export default About;
