import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchMultipleItems } from "../../lib/fetch";
import { Films, Person, ResponseMultiple, Starships } from "../../lib/utils/types";
import React from "react";
import Modal from "./Modal";
import _ from 'lodash';
import CharactersListItem from "../molecules/CharacterListItem";


// delay between calls of load more calls. So there no not neccesary calls
const THROTTLE_TIME = 400;

function CharactersList() {
  // setup for infinite scroll + React query
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

  // states of modal
  const [selectedCharacters, setSelectedCharacters] = useState<Person | null>(null);
  const [films, setFilms] = useState<Films[]>([]);
  const [starships, setStarships] = useState<Starships[]>([]);


  //function to open modal
  const openModal = async (character: Person) => {
    setSelectedCharacters(character);


    // on modal open, fetch all films where character was, and all spacecrafts that character piloted in those films
    const filmsData = await fetchMultipleItems<Films>(`${process.env.REACT_APP_BASE_URL}films/?characters__in=${character.films.join()}`);
    const starshipsData = await fetchMultipleItems<Starships>(`${process.env.REACT_APP_BASE_URL}starships/?pilots__in=${character.id}`);

    setFilms(filmsData.results as Films[]);
    setStarships(starshipsData.results as Starships[]);
  };

  // function to close modal, and empty the state.
  const closeModal = () => {
    setSelectedCharacters(null);
    setFilms([]);
    setStarships([]);
  };

  useEffect(() => {
    //function to make another call, if there is next page
    const loadMore = () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    };
    //function on event listener. If user scrolled near page end  load more characters.
    const onScroll = _.throttle(() => {
       if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
         loadMore();
       }
    }, THROTTLE_TIME);

    // adding event listener if dependencies array values changed
    window.addEventListener('scroll', onScroll);
    // remove event listener, when dependencies array changed again
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage]);

  // show loading, if data not fetched yet
  if (isLoading) {
    return <div>Loading...</div>;
  }

  //show error, if data not fetched
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
            <CharactersListItem character={item} click={openModal}/>
          ))}
        </React.Fragment>
      ))}
    </div>
    {/*only if character is selected modal window is visible*/}
    {selectedCharacters && (
        <Modal 
          character={selectedCharacters} 
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

export default CharactersList;