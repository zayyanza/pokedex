import type { Pokemon } from "@/utils/types";
import PokemonCard from "./pokemonCard";
import { Link } from "react-router-dom";


interface FeedProps {
  pokemons: Pokemon[];
}



const Feed = ({pokemons}: FeedProps) => {
    return (
        <> 
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 p-8">
                {pokemons.map((pokemon) => (
                    <Link to={`/${pokemon.name}`} key={pokemon.name}>
                        <PokemonCard data={pokemon} ></PokemonCard>
                    </Link>
                    
                ))}
            </div>
            
        </>
    )
}

export default Feed;