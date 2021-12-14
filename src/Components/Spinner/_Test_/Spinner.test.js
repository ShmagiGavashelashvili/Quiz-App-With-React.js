import React from "react";
import { render } from "@testing-library/react";
import Spinner from "../Spinner";
describe("Spnner", () => {
  test("spinner rendering", async () => {
    render(<Spinner />);
    expect(render(<Spinner />)).toMatchSnapshot();
  });
});
