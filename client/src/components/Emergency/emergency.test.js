import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Emergency from "./indextest.js";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("Button");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with button for emergency contacts", () => {
  act(() => {
    render(<Emergency />, container);
  });
  expect(container.textContent).toBe("Emergency DashboardEmergency ContactsFake Phone Call GeneratorBark911");;
});
