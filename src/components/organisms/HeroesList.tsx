import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchMultipleItems } from "../../lib/fetch";
import { Person, ResponseMultiple } from "../../lib/utils/types";
import React from "react";

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

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
            <li key={item.id}>{item.name}</li>
          ))}
        </React.Fragment>
      ))}
    </ul>
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