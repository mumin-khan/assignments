import { useState } from "react"
import Card from "./Components/Card"
import CardForm from "./Components/CardForm"

function App() {

  const [cards,setCards] = useState([
    {
      "name":"Mumin",
      "description":"kio",
      "interests":["l"],
      "twitter":"www",
      "linkedin":"www"
    }
  ])
  return (
    <>
    
      <CardForm
 cards={cards} setCards={setCards}/>
      <Card cards={cards}/>
     </>
  )
}

export default App
