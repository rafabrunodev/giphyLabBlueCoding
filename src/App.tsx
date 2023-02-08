import { useState, useEffect, createContext } from "react";
import "./App.css";

import styled from "styled-components";
import { IGiphyResult, searchGiphyApi } from "./services/giphyService";
import InputSearch from "./components/InputSearch";
import GiphyListResults from "./components/GiphyListResults";
import GiphyModal from "./components/GiphyModal";

export const GiphyResultContext = createContext<IGiphyResult[]>([]);

function App() {
  const [giphySearch, setGiphySearch] = useState<string>("");
  const [giphyIndexToModal, setGiphyIndexToModal] = useState<number | null>(
    null
  );
  const [giphyResultList, setGiphyResultList] = useState<IGiphyResult[]>([]);

  const Title = styled.h1`
    font-size: 50px;
  `;

  useEffect(() => {
    const getGiphyToTest = async () => {
      const searchResult: IGiphyResult[] = await searchGiphyApi(giphySearch);

      setGiphyResultList(searchResult);
    };

    getGiphyToTest();
  }, [giphySearch]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      setGiphySearch(event.target.value);
    }
  };

  return (
    <div className="App">
      <Title>Giphy + Blue coding</Title>

      <InputSearch onKeyDown={handleKeyDown} />

      <GiphyResultContext.Provider value={giphyResultList}>
        <GiphyListResults handleSelectGiphy={setGiphyIndexToModal} />
        {giphyIndexToModal && <GiphyModal index={giphyIndexToModal} />}
      </GiphyResultContext.Provider>
    </div>
  );
}

export default App;
