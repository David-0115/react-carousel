import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import Card from "./Card.js";

//Card smoke test
it("Card should render", () => {
  render(<Card caption="test" src={TEST_IMAGES[0]} currNum={1} totalNum={1} />)
});

//Card snapshot test
it("Card matches snapshot", () => {
  const { asFragment } = render(<Card caption="test" src={TEST_IMAGES[0]} currNum={1} totalNum={1} />);
  expect(asFragment()).toMatchSnapshot();
});

//Carousel smoke test
it("Carousel should render", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />)
});

//Carousel snapshot test
it("Carousel should render", () => {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);
  //expect first image to show, but not the second. 
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("should not show left arrow at the start", () => {
  const { queryByTestId } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  expect(queryByTestId("left")).toBe(null);

});

it("should not show right arrow at the end", () => {
  const { container, queryByTestId } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);  //move to img2
  fireEvent.click(rightArrow);  //move to img3

  expect(queryByTestId("right")).toBe(null);

})
