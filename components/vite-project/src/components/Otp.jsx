import { useState, useRef } from "react"
import './Otp.css'
const Otp = () => {
  const [inp,setInp] = useState(Array(4).fill(""))
  const inpRef = useRef([])

  const handleKeyPress =(event,index)=>
  {
    if(event.key === 'Backspace')
    {
      if(!inp[index] && index-1>=0)
      {
        inpRef.current[index-1].focus()
      }
    }
  }
  const handleInput = (event,index)=>
  {
    if(event.target.value.length > 1)
    {
      return
    }
    const arr = [...inp]
    arr[index]=event.target.value
    setInp(arr)
    console.log(inpRef)

    if (event.target.value && index+1 < 4)
    {
      console.log(event)
      inpRef.current[index+1].focus()
    }
    else if (event.target.value && index+1 === 4)
    {
      console.log("Done")
    }


  }
  return (
    <div className="overlay"style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
  
    {inp.map((val,ind)=>
    {
      return <input ref={(reference)=>inpRef.current[ind] = reference} key ={ind} value = {val} onInput={(event)=> handleInput(event,ind)}
      onKeyDown={(event)=>handleKeyPress(event,ind)} style={{height:"5%",width:"5%",borderRadius:"2px",margin:"2px"}} type="number"   ></input>

    })
    }
    
      </div>
  )
}

export default Otp