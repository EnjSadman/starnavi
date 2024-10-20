import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchMultipleItems, fetchSingleItem } from "../../lib/fetch";
import { Films, Person, ResponseMultiple, Starships } from "../../lib/utils/types";
import React from "react";
import Modal from "./Modal";

function HeroesList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    } = useInfiniteQuery<ResponseMultiple>({
    queryKey: ['people'],
    queryFn: ({ pageParam = `${process.env.REACT_APP_BASE_URL}people/` }) => fetchMultipleItems<Person>(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || null,
  });

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<Films[]>([]);
  const [starships, setStarships] = useState<Starships[]>([]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const openModal = async (person: Person) => {
    setSelectedPerson(person);

    const filmsData = await fetchMultipleItems<Films>(`${process.env.REACT_APP_BASE_URL}films/?characters__in=${person.films.join()}`);
    const starshipsData = await fetchMultipleItems<Films>(`${process.env.REACT_APP_BASE_URL}starships/?pilots__in=${person.id}`);

    setFilms(filmsData.results as Films[]);
    setStarships(starshipsData.results as Starships[]);
  };

  const closeModal = () => {
    setSelectedPerson(null);
    setFilms([]);
    setStarships([]);
  };

  useEffect(() => {
    const onClick = () => {
      loadMore();
      // if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        // loadMore();
      // }
    };

    window.addEventListener('scroll', onClick);
    return () => window.removeEventListener('scroll', onClick);
  }, [loadMore, hasNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;
  }

  console.log(data, hasNextPage)
 
  return (
    <div>
    <h1>Items List</h1>
    <ul>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {(page.results as Person[]).map((item) => (
            <button
            className="text-blue-500 hover:underline"
            onClick={() => openModal(item)}
          >
            {item.name}
          </button>
          ))}
        </React.Fragment>
      ))}
    </ul>
    {selectedPerson && (
        <Modal 
          person={selectedPerson} 
          films={films} 
          starships={starships} 
          onClose={closeModal} 
        />
      )}
    <button onClick={() => {
      loadMore();
    }}>
      load more
    </button>
    {isFetchingNextPage && <div>Loading more...</div>}

    {!hasNextPage && <div>No more results</div>}
  </div>
  )
}

export default HeroesList;