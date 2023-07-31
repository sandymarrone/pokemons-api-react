import { useEffect, useState } from "react"
import './CardsList.css'
import Card from './Card'

function NavBtn(props) {
  return(
    <div>
      <button onClick={() => props.previousUrl !== null && props.setCurrentUrl(props.previousUrl)}>Anterior</button>  
      <button onClick={() => props.nextUrl !== null && props.setCurrentUrl(props.nextUrl)}>Siguiente</button> 
    </div>
  )
}

function CardsList() {
  const [loading, setLoading] = useState(true)
  const [pokemones, setPokemones] = useState([])
  const [previousUrl, setPreviousUrl] = useState(null)
  const [nextUrl, setNextUrl] = useState(null)
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10')

  useEffect(() => {
    setLoading(true)
    const getAllPokemones = async() => {
      const response = await fetch(currentUrl)
      const data = await response.json()
      const { results } = data

      setPreviousUrl(data.previous)
      setNextUrl(data.next)

      const getPokemones = results.map(async(pokemon) => {
        const response = await fetch(pokemon.url)
        const poke = await response.json()
        return{
          id: poke.id,
          name: poke.name,          
          img: poke.sprites.other.dream_world.front_default
        }
      })
      
      setPokemones(await Promise.all(getPokemones))
      setLoading(false)
    }

    getAllPokemones()
  }, [currentUrl])
  

  return (
    <>
      <NavBtn nextUrl={nextUrl} previousUrl={previousUrl} currentUrl={currentUrl} setCurrentUrl={setCurrentUrl} />
      <div className="grid">
        {
          loading ? <p>Loading...</p>
          : pokemones?.map((pokemon) => 
          <Card key={pokemon.id} pokemon={pokemon} />
        )
        }
      </div>
    </>
  )
}

export default CardsList