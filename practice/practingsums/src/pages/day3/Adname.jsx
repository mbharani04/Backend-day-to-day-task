import { useState } from "react"


const Adname = () => {

    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [savedata, setSavedata] = useState([])
const handleName =(e)=>{

setName(e.target.value)
}

const handleEmail =(e)=>{

  setEmail(e.target.value)  
}

const handlePhone =(e)=>{
setPhone(e.target.value)
    
}

const handleClick = ()=>{

    const user = {
    name: name,
    email: email,
    phone: phone,
  };
  setSavedata([...savedata, user]);
  setName("");
  setEmail("");
  setPhone("");
}
  return (
   <>

 <div className="min-h-screen bg-gray-100 flex justify-center items-center">
  <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">

    <h1 className="text-2xl font-bold text-center mb-6">
      User Registration
    </h1>

    <div className="grid gap-4">

      <div>
        <label htmlFor="name" className="block mb-1 font-semibold">
          Enter your Name
        </label>
        <input
          id="name"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleName}
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-1 font-semibold">
          Enter your Email
        </label>
        <input
          id="email"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmail}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-1 font-semibold">
          Enter your Mobile
        </label>
        <input
          id="phone"
          className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          placeholder="Enter your mobile"
          value={phone}
          onChange={handlePhone}
        />
      </div>

      <button 
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
        ADD
      </button>

      <div className="overflow-x-auto mt-6">
        <table className="w-full border border-gray-300 border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border p-2">USERNAME</th>
              <th className="border p-2">USER EMAIL</th>
              <th className="border p-2">USER MOBILE</th>
            </tr>
          </thead>

          <tbody>
           
             {savedata.map((e,i)=>(
 <tr key={i}>
<td>{e.name}</td>  
<td>{e.email}</td>
<td>{e.phone}</td>
 </tr>
 ))}
           
     </tbody>
        </table>
      </div>

    </div>

  </div>
</div>
   
   
   </>
  )
}

export default Adname