import React from "react";
import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import Quizz from "../Quizz";
import "@testing-library/jest-dom";
import { mockAxios } from "../../../__Mocks__/axios";

afterEach(cleanup);

describe("Quizz Component", () => {
  test("Quizz component rendering", () => {
    render(<Quizz />);
    const jsdomAlert = window.alert;
    window.alert = () => {};
    const getQuestionButton = screen.getByRole("button", { name: /get questions/i });
    expect(getQuestionButton).toBeInTheDocument();
    fireEvent.click(getQuestionButton);
    window.alert = jsdomAlert;
  });

  test("Quizz component rendering", async () => {
    let expectedData = [
      {
        question: "some Question",
        correct_answer: "anser1",
        incorrect_answers: ["answer3", "answer2", "answer4"],
      },
    ];

    render(<Quizz />);
    const url = "/quizz";
    mockAxios.get.mockResolvedValueOnce(expectedData);
    const getQuestionButton = screen.getByRole("button", { name: /get questions/i });
    const category = screen.getByLabelText(/choose category:/i);
    const difficulty = screen.getByLabelText(/choose dificulty :/i);
    const type = screen.getByLabelText(/select type :/i);
    fireEvent.change(category, { target: { value: "9" } });
    fireEvent.change(difficulty, { target: { value: "hard" } });
    fireEvent.change(type, { target: { value: "multiple" } });
    fireEvent.click(getQuestionButton);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
