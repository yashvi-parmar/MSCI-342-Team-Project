import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from "./hometestweather.js";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
const name = 'User';
it("renders", () => {
  act(() => {
    render(<Home />, container);
  });
  expect(container.textContent).toBe(`Loading..`);
});