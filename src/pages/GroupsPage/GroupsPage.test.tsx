import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { deleteGroup, getAllGroups } from "../../redux/api/groupsApi";
import {
  deleteGroupTh,
  fetchAllGroups,
  fetchAllUsers,
} from "../../redux/thunks/thunks";
import groupReducer from "../../redux/slices/groupsSlice";
import userReducer from "../../redux/slices/userSlice";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import GroupsPage from "./GroupsPage";
import {
  GroupType,
  PartialUserWithRequiredFields,
} from "../../redux/types/types";
import "@testing-library/jest-dom";
import { getAllUsers } from "../../redux/api/usersApi";

jest.mock("../../redux/api/groupsApi");

const mockedGetAllGroups = getAllGroups as jest.MockedFunction<
  typeof getAllGroups
>;
const mockedDeleteGroup = deleteGroup as jest.MockedFunction<
  typeof deleteGroup
>;
const mockedGetAllUsers = getAllUsers as jest.MockedFunction<
  typeof getAllUsers
>;

const groups: GroupType[] = [
  {
    _id: "1",
    title: "Group 1",
    coachId: "coach1",

        dailyPayment: 10,
        monthlyPayment: 100,
    
    schedule: [
      { day: "Monday", time: "10:00" },
      { day: "Wednesday", time: "12:00" },
    ],
    participants: [],
  },
  {
    _id: "2",
    title: "Group 2",
    coachId: "coach1",
 
        dailyPayment: 12,
        monthlyPayment: 122,
    
    schedule: [
      { day: "Sunday", time: "11:00" },
      { day: "Freeday", time: "13:00" },
    ],
    participants: [],
  },
];

const mockUsersForUserList: PartialUserWithRequiredFields[] = [
  {
    _id: "1",
    name: "userName",
    telegramId: 111,
  },
  {
    _id: "2",
    name: "userName2",
    telegramId: 222,
  },
];

describe("GroupsPage", () => {
  const store = configureStore({
    reducer: {
      groups: groupReducer,
      users: userReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  type AppDispatch = ThunkDispatch<
    ReturnType<typeof store.getState>,
    void,
    Action
  >;



  it("renders GroupsPage component", async () => {
    mockedGetAllGroups.mockResolvedValue(groups);
    const dispatch: AppDispatch = store.dispatch;
    const result = await dispatch(fetchAllGroups());

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );

    // Check if the component renders
    expect(screen.getByText("ГРУПИ")).toBeInTheDocument();
    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Оплата за день: 10 грн")).toBeInTheDocument();
    expect(screen.getByText("Оплата за місяць: 100 грн")).toBeInTheDocument();
    expect(screen.getByText(/Monday/i)).toBeInTheDocument();
    expect(screen.getByText(/12:00/i)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday/i)).toBeInTheDocument();
    expect(screen.getByText(/14:00/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("editButton")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("editButton")[1]).toBeInTheDocument();
    expect(screen.getAllByTestId("deleteButton")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("deleteButton")[1]).toBeInTheDocument();
    expect(screen.getByText("Створити групи")).toBeInTheDocument();
  });

  it("renders GroupsPage without data", async () => {
    debugger;
    mockedGetAllGroups.mockResolvedValue([]);
    const dispatch: AppDispatch = store.dispatch;
    const result = await dispatch(fetchAllGroups());
    debugger;
    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );
    debugger;
    // Check if the component renders
    expect(screen.getByText("ГРУПИ")).toBeInTheDocument();
    //   expect(screen.getByText("Немає доступних груп")).toBeInTheDocument();
    expect(screen.queryByTestId("editButton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("deleteButton")).not.toBeInTheDocument();
    expect(screen.getByText("Створити групи")).toBeInTheDocument();
  });

  it("test delete group", async () => {
    mockedGetAllGroups.mockResolvedValue(groups);

    const dispatch: AppDispatch = store.dispatch;
    const result = await dispatch(fetchAllGroups());

    const deleteGroupSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );

    const deleteBtn = screen.queryAllByTestId(
      "deleteButton"
    )[0] as HTMLButtonElement;
    expect(deleteBtn).toBeInTheDocument();

    // Имитируем клик по событию
    fireEvent.click(deleteBtn);

    // Проверка вызова action удаления
    expect(deleteGroupSpy).toHaveBeenCalled();
    expect(deleteGroupSpy).toHaveBeenCalledTimes(3);
  });

  it("shows modal for adding a group", async () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);

    mockedGetAllGroups.mockResolvedValue(groups);
    const dispatch: AppDispatch = store.dispatch;
    const result = await dispatch(fetchAllGroups());

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );

    const addButton = screen.getByText("Створити групи") as HTMLButtonElement;
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    expect(screen.getByText("додати")).toBeInTheDocument();
    modalRoot.remove();
  });

  it("shows modal for editing a group", async () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);

    mockedGetAllGroups.mockResolvedValue(groups);
    const dispatch: AppDispatch = store.dispatch;
    const result = await dispatch(fetchAllGroups());

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );

    const editButton = screen.getAllByTestId('editButton')[0] as HTMLButtonElement;
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);

    expect(screen.getByText("Обновити")).toBeInTheDocument();
  });

  it("fetches groups on mount", async () => {
    mockedGetAllGroups.mockResolvedValue(groups);
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it("handles delete group error", async () => {
    const error = new Error("Ошибка при удалении группы");

    jest.spyOn(store, "dispatch");
    mockedGetAllGroups.mockRejectedValueOnce("error");

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );
    const editButtonsBefore = screen.getAllByTestId("editButton").length;

    const deleteBtn = screen.queryAllByTestId("deleteButton")[0];
    fireEvent.click(deleteBtn);
  
    await waitFor(() => {
      const editButtonsAfter = screen.getAllByTestId("editButton").length;
      expect(editButtonsAfter).toBe(editButtonsBefore); // Длина должна остаться той же, так как запрос упал
    });
  });

  it("updates group list after adding a new group", async () => {
    const newGroup: GroupType = {
      _id: "3",
      title: "Group 3",
      coachId: "coach2",
    
          dailyPayment: 100,
          monthlyPayment: 1000,
       
      schedule: [],
      participants: [],
    };
    mockedGetAllGroups.mockResolvedValue([...groups, newGroup]);

    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);

    const dispatch: AppDispatch = store.dispatch;
    const result = await dispatch(fetchAllGroups());

    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );
    const addButton = screen.getByText("Створити групи") as HTMLButtonElement;
    expect(addButton).toBeInTheDocument();
    // Simulate adding a new group
    fireEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByText("Group 3")).toBeInTheDocument();
    });
  });

  it("calls handleDeleteGroup correctly", async () => {
    mockedGetAllGroups.mockResolvedValue(groups);

    //@ts-ignore
    mockedDeleteGroup.mockResolvedValue({_id: "1", message: "Group deleted."});
    render(
      <Provider store={store}>
        <GroupsPage />
      </Provider>
    );

    const deleteBtn = screen.queryAllByTestId("deleteButton")[0];
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(mockedDeleteGroup).toHaveBeenCalledWith(groups[0]._id);
    });
  });
});
