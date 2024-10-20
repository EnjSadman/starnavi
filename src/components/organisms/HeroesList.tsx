import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchMultipleItems } from "../../lib/fetch";
import { Films, Person, ResponseMultiple, Starships } from "../../lib/utils/types";
import React from "react";
import Modal from "./Modal";
import HeroesListItem from "../molecules/HeroesListItem";
import _ from 'lodash'

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
    const starshipsData = await fetchMultipleItems<Starships>(`${process.env.REACT_APP_BASE_URL}starships/?pilots__in=${person.id}`);

    setFilms(filmsData.results as Films[]);
    setStarships(starshipsData.results as Starships[]);
  };

  const closeModal = () => {
    setSelectedPerson(null);
    setFilms([]);
    setStarships([]);
  };

  useEffect(() => {
    const onScroll = _.throttle(() => {
       if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
         loadMore();
       }
    }, 400);

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [loadMore, hasNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : "An error occurred"}</div>;
  }
 
  return (
    <div>
    <h1>Items List</h1>
    <div>
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {(page.results as Person[]).map((item) => (
            <HeroesListItem person={item} click={openModal}/>
          ))}
        </React.Fragment>
      ))}
    </div>
    {selectedPerson && (
        <Modal 
          person={selectedPerson} 
          films={films} 
          starships={starships} 
          onClose={closeModal} 
        />
      )}
    {isFetchingNextPage && <div>Loading more...</div>}

    {!hasNextPage && <div>No more results</div>}
  </div>
  )
}

export default HeroesList;