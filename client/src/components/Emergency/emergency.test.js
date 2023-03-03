<<<<<<< HEAD
=======

>>>>>>> 039a5e0 (adding two jest tests)
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

<<<<<<< HEAD
import Emergency from "./indextest.js";
=======
import Map from "./emergencytest.js";
>>>>>>> 039a5e0 (adding two jest tests)

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

<<<<<<< HEAD
it("renders with button for emergency contacts", () => {
  act(() => {
    render(<Emergency />, container);
  });
  expect(container.textContent).toBe("Emergency DashboardEmergency ContactsFake Phone Call GeneratorBark911");;
});
=======
it("renders with all buttons", () => {
  act(() => {
    render(<Map />, container);
  });
  expect(container.textContent).toBe("Emergency DashboardEmergency ContactsFake Phone Call GeneratorBark911");;
});
>>>>>>> 039a5e0 (adding two jest tests)
