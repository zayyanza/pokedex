import type { Pokemon } from "@/utils/types";
import { Card } from "./ui/card"

interface PokemonCardProps {
  data: Pokemon;
}

const PokemonCard = ({data}: PokemonCardProps) => {
    // for images
    const urlParts = data.url.split("/");
    const pokeId = urlParts [urlParts.length - 2];
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`;
    return (
        <>
            <Card className="cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-yellow-300/20">
                <img  className= "h-48" src={imgUrl} alt="Pokemon imagef" />
                <h2 className="text-center font-bold">{data.name[0].toUpperCase() + data.name.slice(1)}</h2>
            </Card>
        </>
    )
}

export default PokemonCard