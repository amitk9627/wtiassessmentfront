import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [project, setProject] = useState("");
  const [data, setData] = useState([]);
  const [updatedNo, setUpdateNo] = useState("");
  const [edit, setEdit] = useState(false);
  const[delId,setDelId]=useState("");
  useEffect(() => {
    axios.get('https://wti.onrender.com/list')
      .then((res) => setData(res.data.products))
      .catch(e => console.log("error in Api" + e));
  }, [data])

  const createItem = () => {
    const body = {
      name: name,
      last_name: lastName,
      email: email,
      mobileno: mobileNo,
      project: project
    }
    axios.post("https://wti.onrender.com/create", body, { headers: {} })
      .then(res => {
        console.log(res);
        setEmail("");
        setName("");
        setMobileNo("");
        setProject("");
        setLastName("");
      }).catch(e => console.log(e))
  }

  const handleDelete = (id) => {
    axios.delete(`https://wti.onrender.com/delete/${id}`, { headers: {} })
      .then((res) => console.log(res.data))
      .catch(e => console.log("error in Api" + e));
  }
  const handleEdit=(id)=>{
    console.log(id)
    setEdit(!edit);
    update(id);
  }
  const update = (id) => {
    if(updatedNo){
    axios.post(`https://wti.onrender.com/delete/${id}`, {mobileno: updatedNo }, { headers: {} })
      .then((res) => console.log(res.data))
      .catch(e => console.log("error in Api" + e));
    }
  }
  return (
    <div className="h-screen w-screen ">
      <div className='p-2'>
        <div className=' w-full bg-black p-4'>
          <p><span className='text-2xl text-white'>Clients Panel</span>
            <span className='text-lg text-gray-600'> clients</span></p>
        </div>
        <div className='w-full flex '>
          <div className='w-[70%]  p-3'>
            <h1 className='text-2xl font-semibold'>Clients</h1>
            {
            edit &&
              <p className='flex gap-5 p-2'>
                <input type="text" onChange={(e) => setUpdateNo(e.target.value)} className='w-96 h-8 rounded border border-gray-500' />
                <button className='text-lg p-2 bg-orange-600 text-white rounded' onClick={()=>update()}>Update Number</button>
              </p>
              }
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-200 opacity-90 flex gap-24 p-2'>
                  <th>Name</th>
                  <th>Last Name</th>
                  <th>email</th>
                  <th>Mobile No.</th>
                  <th>Project</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className=''>
                {
                  data.map((item, i) =>
                    <tr className=' grid grid-cols-6 gap-2 ' key={i}>
                      <td>{item.name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.email}</td>
                      <td > {item.mobileno}</td>
                      <td>{item.project}</td>
                      <td className='flex gap-2 text-blue-500'>
                        <span><button onClick={() => handleEdit(item._id)}>Edit</button></span>
                        <span><button onClick={() => handleDelete((String(item._id)))}>delete</button></span>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>

          </div>

          <div className=' w-[30%] p-3'>

            <h1 className='text-2xl font-semibold'>Create Client</h1>
            <div className='flex flex-col gap-3 pt-3'>
              <div>
                <label className='text-lg '>Name</label>
                <br />
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='w-96 h-8 rounded border border-gray-500' />
              </div>
              <div>
                <label className='text-lg'>Last Name</label><br />
                <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-96 h-8 rounded border border-gray-500' />
              </div>
              <div>
                <label className='text-lg'>Email</label>
                <br />
                <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className='w-96 h-8 rounded border border-gray-500' />
              </div>
              <div>
                <label className='text-lg'>MobileNo</label>
                <br />
                <input type='text' value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} className='w-96 h-8 rounded border border-gray-500' />
              </div>
              <div>
                <label className='text-lg'>Project</label>
                <br />
                <input type='text' value={project} onChange={(e) => setProject(e.target.value)} className='w-96 h-8 rounded border border-gray-500' />
              </div>
              <div>
                <button className='text-white bg-blue-600 p-3 rounded-2xl' onClick={() => createItem()}> Create Client</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
