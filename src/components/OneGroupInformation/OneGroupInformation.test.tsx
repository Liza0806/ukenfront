import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../../redux/slices/groupsSlice";
import { OneGroupInformation } from "./OneGroupInformation";
import "@testing-library/jest-dom";
import { GroupType } from "../../redux/types/types";

jest.mock("../../redux/api/groupsApi");
jest.mock("../../redux/thunks/thunks");

const mockStore = configureStore({
  reducer: {
    groups: groupReducer,
  },
});
const mockGroupData: GroupType = {
  _id: "1",
  title: "Group 1",
  coachId: "coach1",

      dailyPayment: 10,
      monthlyPayment: 100,
  
  schedule: [{ day: "Понеділок", time: "10:00" }],
  participants: [
    { _id: "101", name: "Иван", telegramId: 11 },
    { _id: "102", name: "Анна", telegramId: 22 },
  ],
};

describe("OneGroupInformation Component", () => {
  it("renders component with group data", () => {
    render(
      <Provider store={mockStore}>
          <OneGroupInformation title={mockGroupData.title}
                  dailyPayment={mockGroupData.dailyPayment}
                  monthlyPayment={mockGroupData.monthlyPayment}
                  participants={[...mockGroupData.participants]}
                  schedule={mockGroupData.schedule}/>
      </Provider>
    );

    expect(screen.getByText("Оплата")).toBeInTheDocument();
    expect(screen.getByText("Оплата за день: 10 грн")).toBeInTheDocument();
    expect(screen.getByText("Оплата за місяць: 100 грн")).toBeInTheDocument();
    expect(screen.getByText("Графік:")).toBeInTheDocument();
    expect(screen.getByText("Понеділок: 10:00")).toBeInTheDocument();
    expect(screen.getByText("Учасники:")).toBeInTheDocument();
    expect(screen.getByText("Иван")).toBeInTheDocument();
  });

  it("displays message when no participants", () => {
    const groupDataWithoutParticipants = { ...mockGroupData, participants: [] };

    render(
      <Provider store={mockStore}>
        <OneGroupInformation title={groupDataWithoutParticipants.title}
                  dailyPayment={groupDataWithoutParticipants.dailyPayment}
                  monthlyPayment={groupDataWithoutParticipants.monthlyPayment}
                  participants={[...groupDataWithoutParticipants.participants]}
                  schedule={groupDataWithoutParticipants.schedule}/>
      </Provider>
    );

    expect(screen.getByText("Нет учасників")).toBeInTheDocument();
  });
});
