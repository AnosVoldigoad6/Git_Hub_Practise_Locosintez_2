import axios from 'axios';
import React, { useEffect, useState } from 'react'





// MUI

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'; 
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import BtnEdit from '@mui/material/Button';



// Add user and Edit user

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Home = () => {



  const Api = "http://localhost:3000/data"

  // Functions Get data

  const [data, setData] = useState([])

  async function getData(){
    try {
      const {data} = await axios.get(Api)
      setData(data)
    } catch (error) {
      console.error(error);
    }
  }




  // Functions Add user

  const [imgAdd, setImgAdd] = useState("")
  const [nameAdd, setNameAdd] = useState("")
  const [emailAdd, setEmailAdd] = useState("")
  const [cityAdd, setCityAdd] = useState("")
  const [phoneAdd, setPhoneAdd] = useState("")
  const [statusAdd, setStatusAdd] = useState(null)
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpen = () => {
    setOpenAdd(true);
  };
  const handleClose = () => {
    setOpenAdd(false);
  };


  async function addUser(){

    if (!imgAdd || !nameAdd || !cityAdd || !phoneAdd || statusAdd === null) {
      alert("All fields are required, including status");
      return; 
    }

    const user = {
      id: Date.now().toString(),
      img: imgAdd,
      name: nameAdd,
      email: emailAdd,
      city: cityAdd,
      phone: phoneAdd,
      stattus: statusAdd ? true : false
    }
    try {
      const {data} = await axios.post(Api, user)
      getData()
      setImgAdd("")
      setNameAdd("")
      setEmailAdd("")
      setCityAdd("")
      setCityAdd(null)
      setPhoneAdd("")
      setOpenAdd(false)
    } catch (error) {
      console.error(error);
    }
  }
  

  // Functions Delete user

  async function deleteUser(id) {
    try {
      await axios.delete(`${Api}/${id}`);
      getData();
    } catch (error) {
      console.error(error);  
    }
}



  // Functions Edit user

  const [imgEdit, setImgEdit] = useState("")
  const [nameEdit, setNameEdit] = useState("")
  const [emailEdit, setEmailEdit] = useState("")
  const [cityEdit, setCityEdit] = useState("")
  const [phoneEdit, setPhoneEdit] = useState("")
  const [statusEdit, setStatusEdit] = useState(null)
  const [idx, setIdx] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };


  async function editUser(){
    if (!imgEdit ||!nameEdit ||!cityEdit ||!phoneEdit || statusEdit === null) {
      alert("All fields are required, including status");
      return; 
    }
    
    const user = {
      id:idx,
      img: imgEdit,
      name: nameEdit,
      email: emailEdit,
      city: cityEdit,
      phone: phoneEdit,
      status: statusEdit ? true : false
    } 

    try {
      const {data} = await axios.put(`${Api}/${idx}`, user)
      getData()
      handleCloseEdit()
    } catch (error) {
      console.error(error);
      
    }
  }


  // isComplited user

  async function isComplit(user) {
    try {
      const updatedUser = { ...user, status: !user.status };
      await axios.put(`${Api}/${user.id}`, updatedUser);
      
      setData((prevData) =>
        prevData.map((el) => (el.id === user.id ? updatedUser : el))
      );
    } catch (error) {
      console.error(error);
    }
  }
  


  // Select Status and Select City

  const [selectStatus, setSelectStatus] = useState("All");

  async function SelectStatus(){
    try {

      const {data} = await axios.get(Api)
      if(selectStatus==="All"){
        setData(data);
      } else{
        const isActive = selectStatus === 'true';
        const filteredData = data.filter(user => user.status === isActive);
        setData(filteredData);
      }
    } catch (error) {
      console.error("Error during status filter:", error);

    }
  }


  const [selectCity, setSelectCity] = useState("All");

  async function SelectCity() {
    if (selectCity == "All") {
      getData();
    } else {
      try {
        const { data } = await axios.get(`${Api}?city=${selectCity}`)
        setData(data);
      } catch (error) {
        console.log(error);
        
      }
    }
  }


  useEffect(()=>{
    getData()
  }, [])

  useEffect(()=>{
    SelectStatus()
  }, [selectStatus])
  
  useEffect(()=>{
    SelectCity()
  }, [selectCity])
  

  return (
  <>
  
    <section className='w-[90%] m-auto mt-[50px] flex items-center justify-between '>

      <div className='w-[35%] flex justify-between items-center'>

      <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectStatus}
                label="Status"
                onChange={(e)=>setSelectStatus(e.target.value)}
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value={"true"}>Active</MenuItem>
                <MenuItem value={"false"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>



          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCity}
                label="City"
                onChange={(e)=>setSelectCity(e.target.value)}
              >
                <MenuItem value="All">All City</MenuItem>
                <MenuItem value="Kanoha">Kanoha</MenuItem>
                <MenuItem value="Delzogeid">Delzogeid</MenuItem>
                <MenuItem value="Tokyo">Tokyo</MenuItem>
                <MenuItem value="Napolli">Napolli</MenuItem>
                <MenuItem value="Morio">Morio</MenuItem>

              </Select>
            </FormControl>
          </Box>

      </div>

      <Button onClick={handleClickOpen} sx={{ height: "45px" }} variant="contained">Add User</Button>


        
    </section>

    
    <table className='w-[85%] m-auto mt-[100px] '>

      <thead>

        <tr className="h-[60px] border-b-[1px]  border-[#ccc]">

<th className=" text-[20px] text-start px-[10px] border-r-[1px] border-[#ccc] ">Full Name</th>
<th className=" text-[20px] border-r-[1px] border-[#ccc] ">City</th>
<th className=" text-[20px] border-r-[1px] border-[#ccc] ">Status</th>
<th className=" text-[20px] border-r-[1px] border-[#ccc] ">Phone Number</th>
<th className=" text-[20px] ">Action</th>

        </tr>

      </thead>


      <tbody>
        {data.map((el)=>{
          return(
            <tr key={el.id} className="h-[95px] border-b-[1px] border-[#ccc]">

              <td className='border-r-[1px] border-[#ccc]'>
              <div className="flex items-center">
                    <div className="flex justify-center items-center ">
                      <img
                        src={el.avatar}
                        className="w-[70px] h-[70px] rounded-[50%] ml-[20px]"
                      />
                    </div>
                    <div className="ml-[15px]">
                      <h1 className="text-[17px] font-bold">{el.name}</h1>
                      <p className="text-[14px] font-medium text-[#8d8d8d]">{el.email}</p>
                    </div>
                  </div>
              </td>


              <td className="text-center border-r-[1px] border-[#ccc] text-[16px] font-semibold">{el.city}</td>

              <td className='text-center border-r-[1px] border-[#ccc]'>
              {el.status ? (
                    <span className="text-[green] font-semibold text-[16px]">Active</span>
                  ) : (
                    <span className="text-[#ff0000] font-semibold text-[16px]">Inactive</span>
                  )}

              </td>

              <td className="text-[15px] text-center font-semibold border-r-[1px] border-[#ccc]">{el.phone}</td>


              <td className="text-center">

            <Checkbox checked={el.status} onClick={()=>isComplit(el)} />


              {/* delet btn */}
            <IconButton aria-label="delete">
             <DeleteIcon onClick={()=>deleteUser(el.id)} style={{ color: "red" }} />
             </IconButton>


            {/* Edit btn */}

            <IconButton>
          <BorderColorIcon onClick={() => {
         handleClickOpenEdit();
         setImgEdit(el.avatar);
         setNameEdit(el.name);
         setEmailEdit(el.email);  
         setCityEdit(el.city);
         setStatusEdit(el.status);
         setPhoneEdit(el.phone);
        setIdx(el.id);  
  }} />
</IconButton>


            </td>

            </tr>
          )
        })}
      </tbody>
    </table>




{/* Modal Add */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openAdd}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal Add
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>

            <TextField value={imgAdd} onChange={(e)=>setImgAdd(e.target.value)} id="outlined-basic" style={{width: "400px", marginTop:"20px"}} label="Avatar" variant="outlined" />

          </Typography>
          <Typography gutterBottom>

            <TextField value={nameAdd} onChange={(e)=>setNameAdd(e.target.value)} id="outlined-basic" style={{width: "400px", marginTop:"20px"}} label="Full Name" variant="outlined" />

          </Typography>

          <Typography gutterBottom>

            <TextField value={emailAdd} onChange={(e)=>setEmailAdd(e.target.value)} id="outlined-basic" style={{width: "400px", marginTop:"20px"}} label="Email" variant="outlined" />

          </Typography>

          <Typography gutterBottom>

            <TextField value={phoneAdd} onChange={(e)=>setPhoneAdd(e.target.value)} id="outlined-basic" style={{width: "400px", marginTop:"20px"}} label="Tel" variant="outlined" />

          </Typography>

          <Typography gutterBottom style={{display: "flex", justifyContent: "space-between"}}>

            
            <Box sx={{ minWidth: 180, marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusAdd}
                  label="Status"
                  onChange={(e)=>setStatusAdd(e.target.value)}
                >
                  
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>


            <Box sx={{ minWidth: 180, marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cityAdd}
                  label="City"
                  onChange={(e)=>setCityAdd(e.target.value)}
                >
                 
                  <MenuItem value="Kanoha">Kanoha</MenuItem>
                  <MenuItem value="Delzogeid">Delzogeid</MenuItem>
                  <MenuItem value="Tokyo">Tokyo</MenuItem>
                  <MenuItem value="Napolli">Napolli</MenuItem>
                  <MenuItem value="Morio">Morio</MenuItem>

                </Select>
              </FormControl>
            </Box>


          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>addUser()}>
            Save 
          </Button>
        </DialogActions>
      </BootstrapDialog>

  {/* Modal Edit */}

  <BootstrapDialog
        onClose={handleCloseEdit}
        aria-labelledby="customized-dialog-title"
        open={openEdit}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal Edit
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEdit}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>

            <TextField value={imgEdit} onChange={(e) => setImgEdit(e.target.value)} id="outlined-basic" style={{ width: "400px", marginTop: "20px" }}  variant="outlined" />

          </Typography>

          <Typography gutterBottom>

            <TextField value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} id="outlined-basic" style={{ width: "400px", marginTop: "20px" }}  variant="outlined" />

          </Typography>

          <Typography gutterBottom>

            <TextField value={emailEdit} onChange={(e) => setEmailEdit(e.target.value)} id="outlined-basic" style={{ width: "400px", marginTop: "20px" }}  variant="outlined" />

          </Typography>
          <Typography gutterBottom>

            <TextField value={phoneEdit} onChange={(e) => setPhoneEdit(e.target.value)} id="outlined-basic" style={{ width: "400px", marginTop: "20px" }}  variant="outlined" />

          </Typography>

          <Typography gutterBottom style={{ display: "flex", justifyContent: "space-between" }}>


            <Box sx={{ minWidth: 180, marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={statusEdit}
                  label="Status"
                  onChange={(e) => setStatusEdit(e.target.value)}
                >

                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>


            <Box sx={{ minWidth: 180, marginTop: "20px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cityEdit}
                  label="City"
                  onChange={(e) => setCityEdit(e.target.value)}
                >

                  <MenuItem value="Kanoha">Kanoha</MenuItem>
                  <MenuItem value="Delzogeid">Delzogeid</MenuItem>
                  <MenuItem value="Tokyo">Tokyo</MenuItem>
                  <MenuItem value="Napolli">Napolli</MenuItem>
                  <MenuItem value="Morio">Morio</MenuItem>

                </Select>
              </FormControl>
            </Box>


          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => editUser()}>
            Put
          </Button>
        </DialogActions>
      </BootstrapDialog>

  </> 
  )
}

export default Home