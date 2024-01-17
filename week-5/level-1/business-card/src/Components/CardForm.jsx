import { useState } from "react"
// eslint-disable-next-line react/prop-types
const CardForm = ({cards,setCards}) => {
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [interests,setInterests]=useState([])
    const [twitter,setTwitter]=useState("")
    const [linkedin,setLinkedin]=useState("")
    const handleSubmit = ()=>
    {
      
        const card = 
        {
            name,
            description,
            "interests":interests.split(','),
            twitter,
            linkedin

        }
        console.log(card)
        setCards([...cards,card])
    }
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
        Name:<input value={name} name="name" onChange={(event)=> setName(event.target.value)}></input>
        Description:<input value={description} onChange={(event)=> setDescription(event.target.value)}></input>
        Interests: <input value={interests} onChange={(event)=> setInterests(event.target.value)}></input>
        Twitter Url: <input value={twitter} onChange={(event)=> setTwitter(event.target.value)}></input>
        Linkedin Url: <input value={linkedin} onChange={(event)=> setLinkedin(event.target.value)}></input>
        <button onClick={handleSubmit}>Submit </button>
    </div>
  )
}

export default CardForm