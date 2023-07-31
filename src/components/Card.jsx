function Card({pokemon}) {
  return (
    <div>
      <img src={pokemon.img} alt={pokemon.name} style={{aspectRatio: 1/1, width: '8rem'}} />
      <h5>{pokemon.name}</h5>
    </div>
  )
}

export default Card