import "@testing-library/jest-dom";
import { Summary } from "../pages/Summary";
import { render, screen, fireEvent } from "@testing-library/react";
import { TriviaContext, TriviaContextProps } from "../contexts/TriviaContext";
import { useNavigate } from "react-router-dom";

const navigate = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useNavigate: jest.fn(() => navigate),
  };
});

describe("Summary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render summary page with 4 cards", () => {
    const value: TriviaContextProps = {
      triviaQuestions: [
        {
          type: "",
          difficulty: "",
          category: "",
          question: "test question 1",
          correct_answer: "a",
          incorrect_answers: [],
          answers: ["a", "b", "c", "d"],
          answered: "a",
          value: 1,
        },
        {
          type: "",
          difficulty: "",
          category: "",
          question: "test question 2",
          correct_answer: "b",
          incorrect_answers: [],
          answers: ["a", "b", "c", "d"],
          answered: "b",
          value: 1,
        },
        {
          type: "",
          difficulty: "",
          category: "",
          question: "test question 3",
          correct_answer: "c",
          incorrect_answers: [],
          answers: ["a", "b", "c", "d"],
          answered: "d",
          value: 0,
        },
        {
          type: "",
          difficulty: "",
          category: "",
          question: "test question 4",
          correct_answer: "d",
          incorrect_answers: [],
          answers: ["a", "b", "c", "d"],
          answered: "a",
          value: null,
        },
      ],
      triviaParams: {
        amount: 1,
        type: "multiple",
        difficulty: "easy",
        category: "9",
        categoryName: "test"
      },
      updateTriviaQuestions: jest.fn(),
      updateTriviaParams: jest.fn(),
    };

    render(
      <TriviaContext.Provider value={value}>
        <Summary />
      </TriviaContext.Provider>
    );

    expect(useNavigate).toHaveBeenCalledTimes(1);
    const summary = screen.getByTestId("summary");
    expect(summary).toBeInTheDocument();
    const scoreLabel = screen.getByTestId("score-label");
    expect(scoreLabel).toHaveTextContent("YOUR SCORE:");
    const score = screen.getByTestId("score");
    expect(score).toHaveTextContent("2/4");
    const question = screen.getAllByTestId("question");
    expect(question.length).toEqual(4);

    expect(question[0]).toHaveTextContent(
      "1. test question 1Answer: aYou answered: a✅"
    );
    expect(question[1]).toHaveTextContent(
      "2. test question 2Answer: bYou answered: b✅"
    );
    expect(question[2]).toHaveTextContent(
      "3. test question 3Answer: cYou answered: d❌"
    );
    expect(question[3]).toHaveTextContent(
      "4. test question 4Answer: dYou answered: a❌"
    );
    const homeBtn = screen.getByTestId("home-btn");
    fireEvent.click(homeBtn);
    expect(navigate).toHaveBeenCalledWith("/");
  });

  test("should render summary page with 0 card", () => {
    const value: TriviaContextProps = {
      triviaQuestions: [],
      triviaParams: {
        amount: 1,
        type: "multiple",
        difficulty: "easy",
        category: "9",
        categoryName: "test"
      },
      updateTriviaQuestions: jest.fn(),
      updateTriviaParams: jest.fn(),
    };

    render(
      <TriviaContext.Provider value={value}>
        <Summary />
      </TriviaContext.Provider>
    );

    expect(useNavigate).toHaveBeenCalledTimes(1);
    const summary = screen.getByTestId("summary");
    expect(summary).toBeInTheDocument();
    const scoreLabel = screen.getByTestId("score-label");
    expect(scoreLabel).toHaveTextContent("YOUR SCORE:");
    const score = screen.getByTestId("score");
    expect(score).toHaveTextContent("0/0");
    const question = screen.queryAllByTestId("question");
    expect(question.length).toEqual(0);
  });
});
