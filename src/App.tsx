
import { useEffect, useState } from 'react'
import Feed from './components/feed'
import Header from './components/header'
import type { Pokemon, PokemonResponse } from './utils/types';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './components/ui/pagination';
import LoadingScreen from './components/pages/loadingScreen';


function App() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offSet, setOffSet] = useState<number>(() => {
    const storedOffSet: string | null = sessionStorage.getItem("offset");
    return storedOffSet ? parseInt(storedOffSet, 10) : 0;
  });
  const [page, setPage] = useState<number>(() => {
    const storedPage: string | null = sessionStorage.getItem("page");
    return storedPage ? parseInt(storedPage, 10) : 1;
  });

  const [loading, setLoading] = useState(true);
  const totalPages: number = 87;

  function handlePage(newPage: number) {
    
    const newOffset = (newPage - 1) * 15;
    setOffSet(newOffset);
    setPage(newPage);
 
    sessionStorage.setItem("offset", newOffset.toString());
    sessionStorage.setItem("page", newPage.toString());
  }


  function handlePreviousPage() {
    if(page === 1) {
      return;
    }
    handlePage(page - 1);
  }

  function getPaginationNumbers() {
    const pages: (number | "ellipsis")[] = []

    pages.push(1)

    if (page > 3) pages.push("ellipsis")

      
    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) {
        if (!pages.includes(i)) {
          pages.push(i)
        }
      }
    }

    if (page < totalPages - 2) pages.push("ellipsis")

    pages.push(totalPages)

    return pages;
  }

  
  useEffect(() => {
    async function fetchPokemon() {
      const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=15&offset=${offSet}`;

      const res = await fetch(API_URL);
      const data: PokemonResponse = await res.json();

      setPokemons(data.results);
      setTimeout(() => {
        setLoading(false);
      }, 500)
    };

    fetchPokemon();
  }, [offSet])


  useEffect(() => {
    setLoading(true);
  }, [offSet])
 
  return (
    
    <>
    
      {loading && <LoadingScreen/>}
      {!loading && (<><Header></Header>
      <Feed pokemons={pokemons}></Feed>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePreviousPage()} />
          </PaginationItem>

          {getPaginationNumbers().map((p, i) => p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${p}`}>
              <PaginationLink
                href="#"
                isActive={page === p}
                onClick={(e) => {
                  e.preventDefault();
                  handlePage(p as number);
                } }
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
          )}

          <PaginationItem>
            <PaginationNext onClick={() => handlePage(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination></>)}
    </>
  )
}

export default App
