import { useMemo, useState } from "react"
import Theme from "./Theme"


const TwentyTwo = () => {

    const [search , setSearch] = useState("")

    const arrayOfObject =[{
        productId: 1,
        productName : "laptop",
        productPrice : "50,000"
},
{
        productId: 2,
        productName : "Mobile",
        productPrice : "35,000"
},
{
        productId: 3,
        productName : "washing machine",
        productPrice : "10,000"
},
{
        productId:4,
        productName : "ac",
        productPrice : "14,000"
},
{
        productId:5,
        productName : "mac",
        productPrice : "54,000"
}

]

const handleChange =(e)=>{

  setSearch(e.target.value)
}

const filteringproducts = useMemo(()=>{

  return arrayOfObject.filter((el)=>el.productName.toLowerCase().includes(search.toLocaleLowerCase()))
},[search]);

  return (
   <>
   <div>

    <div>
    <input type="text" 
    placeholder="Search here..."
    value={search}
    className="bg-white text-black"
    onChange={handleChange}/>
</div>

<br />
<br />

{filteringproducts.map((e)=>(
    <div key = {e.productId}>
        <h1>{e.productName}</h1>
        <p>Rs. {e.productPrice}</p>

    </div>

))}


<div>
  <br />
  <br />
</div>

<Theme/>



   </div>
   
   </>
  )
}

export default TwentyTwo