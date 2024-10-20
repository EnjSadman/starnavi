import { Films, Person, ResponseMultiple, Starships } from "./utils/types";

// This function used to fetch data from server

export const fetchMultipleItems = async <T extends Person | Starships | Films>(url: string): Promise<ResponseMultiple> => {
  // Make a request
  const response = await fetch(url);

  // If response is error, throwed Error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // If everythin okay return json of data that we get
  const data: ResponseMultiple = await response.json();
  return data;
};

