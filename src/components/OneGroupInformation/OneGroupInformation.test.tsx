import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "../../redux/slices/groupsSlice";
import { OneGroupInformation } from "./OneGroupInformation";
import { fetchAllUsers } from "../../redux/thunks/thunks";
import "@testing-library/jest-dom";
import { getAllGroups } from "../../redux/api/groupsApi";
import { GroupType } from "../../redux/types/types";

jest.mock("../../redux/api/groupsApi");
jest.mock("../../redux/thunks/thunks");

const mockedGetAllGroups = getAllGroups as jest.MockedFunction<
  typeof getAllGroups
>;

const mockStore = configureStore({
  reducer: {
    groups: groupReducer,
  },
});
const mockGroupData: GroupType = {
  _id: "1",
  title: "Group 1",
  coachId: "coach1",
  payment: [
    {
      dailyPayment: 10,
      monthlyPayment: 100,
    },
  ],
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
        <OneGroupInformation groupData={mockGroupData} />
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
        <OneGroupInformation groupData={groupDataWithoutParticipants} />
      </Provider>
    );

    expect(screen.getByText("Нет учасників")).toBeInTheDocument();
  });
});
