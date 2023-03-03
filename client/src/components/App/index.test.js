// App.test.js

import { render, screen } from "@testing-library/react";
import MyComponent from "./components/MyComponent";
import { MemoryRouter } from "react-router-dom"; // <-- Import MemoryRouter

test("My test description", () => {
  render(
    <MemoryRouter>
      <MyComponent />
    </MemoryRouter>
  );
});