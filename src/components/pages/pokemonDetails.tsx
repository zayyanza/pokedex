import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "./loadingScreen";
import { pokemonTypeColors } from "@/utils/typeColors";
import Stats from "../stats";

interface PokemonResponse {
    name: string;
    types: {
        type: {
            name: string
        }
    }[]
    sprites: {
        back_default: string,
        front_default: string,
        back_shiny: string,
        front_shiny: string,
        other: {
            home: {
                front_default: string
            }
        }
    }

}



const PokemonDetails = () => {
    const {pokemon} = useParams();
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonResponse | null>(null);
    const [stats, setStats] = useState({
        height: 0,
        weight: 0,
        hp: 0,
        exp: 0,
        attack: 0,
        defence: 0,
        splAttack: 0,
        splDefence: 0,
        speed: 0,
    });
  
    useEffect(() => {
        const API_URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        async function fetchPokemon() {
            setLoading(true)
            const res = await fetch(API_URL);
            const data = await res.json();

            setSelectedPokemon(data);
            setStats({
                height: parseFloat((data.height / 3.048).toFixed(1)),
                weight: parseFloat((data.weight / 10).toFixed(1)),
                exp: data.base_experience,
                hp: data.stats[0].base_stat,
                attack: data.stats [1].base_stat,
                defence: data.stats [2].base_stat,
                splAttack: data.stats[3].base_stat,
                splDefence: data.stats [4].base_stat,
                speed: data.stats [5].base_stat,
            })
            setLoading(false);
        }
        fetchPokemon();
    }, [pokemon])

    
    return (
        <>
            {loading ? <LoadingScreen/> :
            <div className="flex flex-col items-center">
                <h2 className="text-5xl font-bold tracking-tight text-gray-900 m-4">{selectedPokemon?.name[0].toUpperCase() + selectedPokemon?.name.slice(1)}</h2>
                <div className="flex gap-6 ">
                    {selectedPokemon?.types.map((type) => (
                        <div 
                        className="p-2 rounded-xl"
                        style={{backgroundColor: pokemonTypeColors[type.type.name].background, color: pokemonTypeColors[type.type.name].color}}
                        >
                            {type.type.name[0].toUpperCase() + type.type.name.slice(1)}
                        </div>
                        
                    ))}
                </div>
                <img className="h-100" src={selectedPokemon?.sprites.other.home.front_default} />
                <div className="flex gap-6 justify-center h-50">
                    <img src={selectedPokemon?.sprites.back_default} />
                    <img src={selectedPokemon?.sprites.back_shiny} />
                    <img src={selectedPokemon?.sprites.front_default} />
                    <img src={selectedPokemon?.sprites.front_shiny} />
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 m-4">Stats</h2>
                <Stats stats={stats}></Stats>
            </div>}
        </>
    )
}

export default PokemonDetails;