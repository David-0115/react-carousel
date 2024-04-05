import { useState, useEffect } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(true);

  const currCard = photos[currCardIdx];
  const total = photos.length;


  //Increments currCardIdx state by 1
  function goForward() {
    setCurrCardIdx(currCardIdx + 1);
  }

  //Decrements currCardIdx state by 1
  function goBack() {
    setCurrCardIdx(currCardIdx - 1)
  }
  useEffect(() => {
    const hideLeft = () => setLeftArrow(false);
    const showLeft = () => setLeftArrow(true);
    const hideRight = () => setRightArrow(false);
    const showRight = () => setRightArrow(true);

    currCardIdx > 0 ? showLeft() : hideLeft();
    currCardIdx === photos.length - 1 ? hideRight() : showRight();
  }, [currCardIdx, photos.length])


  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {leftArrow ? <i className="bi bi-arrow-left-circle" onClick={goBack} data-testid="left" /> : null}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {rightArrow ? <i className="bi bi-arrow-right-circle" onClick={goForward} data-testid="right" /> : null}

      </div>
    </div>
  );
}

export default Carousel;
