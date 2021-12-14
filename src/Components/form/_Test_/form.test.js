import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../form";

describe("Form Component", () => {
  const mockGetQuestions = jest.fn();
  test("rendering Form component", async () => {
    render(<Form getQuestions={mockGetQuestions} />);
  });

  test("input fields categoryes", async () => {
    render(<Form getQuestions={mockGetQuestions} />);
    const categoryOption = screen.getByLabelText(/choose category:/i);
    expect(categoryOption).toBeInTheDocument();
    fireEvent.change(categoryOption, { target: { value: "9" } });
    expect(categoryOption.value).toEqual("9");
  });

  test("input fields difficulty", async () => {
    render(<Form getQuestions={mockGetQuestions} />);
    const difficultyOption = screen.getByLabelText(/choose dificulty :/i);
    expect(difficultyOption).toBeInTheDocument();
    fireEvent.change(difficultyOption, { target: { value: "hard" } });
    expect(difficultyOption.value).toEqual("hard");
  });

  test("input fields type", async () => {
    render(<Form getQuestions={mockGetQuestions} />);
    const typeOption = screen.getByLabelText(/select type :/i);
    expect(typeOption).toBeInTheDocument();
    fireEvent.change(typeOption, { target: { value: "multiple" } });
    expect(typeOption.value).toEqual("multiple");
  });
});
