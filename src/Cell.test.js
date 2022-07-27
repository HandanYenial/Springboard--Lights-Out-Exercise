import React from "react";
import {render} from "@testing-library/react";
import Cell from "./Cell";

//smoke test
test("renders Cell", () => {
    render(<Cell />);
});
