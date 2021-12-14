import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Questions from "../Questions";
import { act } from "react-dom/test-utils";

describe("Questions Component", () => {
  let mokCurrQuestion = {
    incorrect_answers: ["quest1", "quest2", "quest3"],
    correct_answer: "quest4",
    question: "testing time",
  };
  let mockQuizzAgain = jest.fn();
  let mockData = [{}];
  test("rendering Questions Component", () => {
    render(
      <Questions
        currentQuestion={mokCurrQuestion}
        nextQuestion={2}
        quizAgain={mockQuizzAgain}
        data={mockData}
      />
    );
    const firstQuestion = screen.getByText(/testing time/i);
    expect(firstQuestion).toBeInTheDocument();
  });

  test("rendering answers button", async () => {
    render(
      <Questions
        currentQuestion={mokCurrQuestion}
        nextQuestion={2}
        quizAgain={mockQuizzAgain}
        data={mockData}
      />
    );
    const answers = screen.getAllByTestId(/answers-/i);
    answers.forEach((answ) => {
      expect(answ).toBeInTheDocument();
      fireEvent.click(answ);
      act(() => {
        answ.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(answ).toHaveClass("selected");
    });
  });

  test("rendering submit button", async () => {
    render(
      <Questions
        currentQuestion={mokCurrQuestion}
        nextQuestion={2}
        quizAgain={mockQuizzAgain}
        data={mockData}
      />
    );
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const nextButton = screen.getByRole("button", { name: /next/i });
    const answer = screen.getByTestId(/answers-0/i);
    expect(submitButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
    fireEvent.click(answer);
    expect(submitButton).not.toBeDisabled();
  });
});
