import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { GiphyResultContext } from "../../App";
import { IGiphyResult } from "../../services/giphyService";

interface IGiphyModal {
  index: number;
}

const Modal = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background: #01367897;
`;

const Container = styled.div`
  border: 2px solid white;
  border-radius: 5px;
  width: 40%;
  overflow: hidden;
`;

const GiphyTitle = styled.h2`
  padding: 8px 0;
  margin: 0;
`;

const GiphyImg = styled.img`
  width: 100%;
`;

const SliderControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
`;

const SliderControls = styled.a`
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: pink;
  }
`;

export const GiphyModal: React.FC<IGiphyModal> = ({ index }) => {
  const giphyListResult: IGiphyResult[] = useContext(GiphyResultContext);

  const [currentGiphy, setCurrentGiphy] = useState<IGiphyResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(index);

  useEffect(() => {
    setCurrentGiphy(giphyListResult[currentIndex]);
  }, [currentIndex]);

  return (
    <Modal>
      {currentGiphy && (
        <Container>
          <GiphyImg src={currentGiphy.image.url} />
          <GiphyTitle>{currentGiphy.title}</GiphyTitle>
          <SliderControlContainer>
            <SliderControls onClick={() => setCurrentIndex(currentIndex + 1)}>
              Prev
            </SliderControls>
            <SliderControls onClick={() => setCurrentIndex(currentIndex - 1)}>
              Next
            </SliderControls>
          </SliderControlContainer>
        </Container>
      )}
    </Modal>
  );
};
