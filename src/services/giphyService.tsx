import { AxiosRequestConfig } from "axios";
import api from "./apiService";

interface IGiphyImage {
  url: string;
}

export interface IGiphyResult {
  title: string;
  image: IGiphyImage;
}

const getFromGiphyApi = (giphySearch: string) => {
  const options: AxiosRequestConfig = {
    params: {
      api_key: "pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa",
      q: giphySearch,
    },
  };

  return api.get("/search", options);
};

export const searchGiphyApi = async (giphySearch: string) => {
  const { data: giphyResult } = await getFromGiphyApi(giphySearch);

  if (giphyResult) {
    const searchResult: IGiphyResult[] = giphyResult.data.map(
      (giphyRes: any) => ({
        title: giphyRes.title,
        image: {
          url: giphyRes.images.original.url,
        },
      })
    );

    return searchResult;
  }

  return [];
};
