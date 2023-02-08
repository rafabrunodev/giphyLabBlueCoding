import { useContext } from "react";
import styled from "styled-components";

import { GiphyResultContext } from "../../App";

interface IGiphyListResults{
    handleSelectGiphy: any
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
  padding: 10px;
  margin: 0 auto;
`;

const GiphyImg = styled.img`
  width: 100%;
  padding: 10px;
  cursor: pointer;
`;

export const GiphyListResults: React.FC<IGiphyListResults> = ({handleSelectGiphy}) => {
  const giphyListResult: any = useContext(GiphyResultContext);

  return (
    <Container>
      {giphyListResult.map((giphy: any, index: number) => (
        <GiphyImg
          onClick={() => handleSelectGiphy(index)}
          src={giphy.image.url}
        />
      ))}
    </Container>
  );
};
