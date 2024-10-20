import { Films, Person, ResponseMultiple, Starships } from "./utils/types";

export const fetchMultipleItems = async <T extends Person | Starships | Films>(url: string): Promise<ResponseMultiple> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ResponseMultiple = await response.json();
  return data;
};

