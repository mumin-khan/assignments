/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const Card = ({cards}) => {
    console.log(cards[0].name)
  return (
    <>
    <div style={{"display":"flex","flex-direction":"row","flex-wrap":"wrap","justify-content":"center"}}>
    {cards.map((card,index)=>
    {
      return  <div key={index} 
      style={{"width":"33%","flex-direction": "column","display": "flex","border": "2px solid #333","padding":" 10px","margin":"10px"
      }}>
            <p>{card.name}</p>
            <p>{card.description}</p>
            <h3>Interests</h3>
            {card.interests.map((interest,index)=>
            {
               return <p key={index}>{interest}</p>
            })}

            <div style={{
                "display":"flex",
                "flex-direction":"row",
                "width":"30%"
            }}>
            <button style={{backgroundColor:"#1a56b8",color:"white"}} onClick={()=> window.open(card.linkedin, '_blank') }>Linkedin</button>
            <button style={{backgroundColor:"#1a56b8",color:"white"}} onClick={()=> window.open(card.twitter, '_blank') }>Twitter</button>
            </div>
        </div>
    })}
    </div>
    </>
  )
}

export default Card