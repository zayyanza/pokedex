import {  useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    return (
        <>
        <div className="flex justify-between bg-gray-50 p-5">
            <h1 className="text-3xl font-bold tracking-tight font-serif">Pokedex</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (query) {
                    navigate(`/${query.toLowerCase()}`)
                    }
                }}
            className="flex gap-3">
                <Input className="w-48 bg-white" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}></Input>
                <Button type="submit">Search</Button>
            </form>
    </div>
        </>
    )
}

export default Header;