import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Map from "./mapjest.js";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("h2");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with map as a header", () => {
  act(() => {
    render(<Map />, container);
  });
  expect(container.textContent).toBe("Map");;
});

  
