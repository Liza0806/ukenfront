import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GroupFormModal } from "./GroupFormModal";
import { Provider } from "react-redux";

import "@testing-library/jest-dom";
import { GroupType } from "../../redux/types/types";
import { addGroupTh } from "../../redux/thunks/thunks";
import { deleteGroup, getAllGroups } from "../../redux/api/groupsApi";
import { Action, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import groupReducer from "../../redux/slices/groupsSlice";
import userReducer from "../../redux/slices/userSlice";
import { getAllUsers } from "../../redux/api/usersApi";

jest.mock("../../redux/api/groupsApi");
jest.mock("../../redux/api/eventsApi");
jest.mock("../../redux/api/usersApi");

const mockedGetAllGroups = getAllGroups as jest.MockedFunction<
  typeof getAllGroups
>;
const mockedDeleteGroup = deleteGroup as jest.MockedFunction<
  typeof deleteGroup
>;
const mockedGetAllUsers = getAllUsers as jest.MockedFunction<
  typeof getAllUsers
>;
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
const mockCloseModal = jest.fn();
const initialGroupData: GroupType = {
  _id: "1",
  title: "Group 1",
  coachId: "coach1",

  dailyPayment: 0,
  monthlyPayment: 1100,

  schedule: [
    {
      day: "monday",
      time: "16:00",
    },
    {
      day: "wednesday",
      time: "16:00",
    },
    {
      day: "friday",
      time: "16:00",
    },
  ],
  participants: [
    {
      _id: "66d9c628c0839ff5f3bd730f",
      name: "Индросий",
      telegramId: 412631781,
    },
    {
      _id: "66d9b4e7e5e1b9e2718cde50",
      name: "Лиза",
      telegramId: 1018007612,
    },
  ],
};

jest.mock('../../redux/hooks/hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe("GroupFormModal", () => {

  const store = configureStore({
    reducer: {
      groups: groupReducer,
      users: userReducer,
    },
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Очищаем моки перед каждым тестом
  });
 type AppDispatch = ThunkDispatch<
    ReturnType<typeof store.getState>,
    void,
    Action
  >;
  it("renders without crashing", () => {

  const dispatch: AppDispatch = jest.fn();



    // Рендеринг компонента с минимально необходимыми пропсами
    render(

      <Provider store={store}>
        <GroupFormModal isEditMode={false} closeModal={mockCloseModal} />
      </Provider>
    );
    // Проверка, что компонент отображает элемент, который должен быть всегда
    expect(screen.getByText("Название")).toBeInTheDocument();

    expect(screen.getByText("Добавить группу")).toBeInTheDocument();

    expect(screen.getByTestId("group-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("group-dailyPayment-input")).toBeInTheDocument();
    expect(
      screen.getByTestId("group-monthlyPayment-input")
    ).toBeInTheDocument();
  });

  it("should update the title field correctly when typing", () => {
    render(
      <Provider store={store}>
        <GroupFormModal
          initialGroupData={initialGroupData}
          isEditMode={true}
          closeModal={mockCloseModal}
        />
      </Provider>
    );
    const titleInput = screen.getByTestId(
      "group-title-input"
    ) as HTMLInputElement;

    // Проверка начального состояния
    expect(titleInput.value).toBe("Group 1");

    // Ввод нового значения
    fireEvent.change(titleInput, { target: { value: "New Group Title" } });

    // Проверка, что значение поля изменилось
    expect(titleInput.value).toBe("New Group Title");
  });

  it("should update the dailyPayment field correctly when typing", () => {
    render(
      <Provider store={store}>
        <GroupFormModal
          initialGroupData={initialGroupData}
          isEditMode={true}
          closeModal={mockCloseModal}
        />
      </Provider>
    );
    const dailyPaymentInput = screen.getByTestId(
      "group-dailyPayment-input"
    ) as HTMLInputElement;

    // Проверка начального состояния
    expect(dailyPaymentInput.value).toBe("");

    // Ввод нового значения
    fireEvent.change(dailyPaymentInput, { target: { value: 50 } });

    // Проверка, что значение поля изменилось
    expect(dailyPaymentInput.value).toBe("50");
  });

  it("should update the monthlyPayment field correctly when typing", () => {
    render(
      <Provider store={store}>
        <GroupFormModal
          initialGroupData={initialGroupData}
          isEditMode={true}
          closeModal={mockCloseModal}
        />
      </Provider>
    );
    const monthlyPaymentInput = screen.getByTestId(
      "group-monthlyPayment-input"
    ) as HTMLInputElement;

    // Проверка начального состояния
    expect(monthlyPaymentInput.value).toBe("1100");

    // Ввод нового значения
    fireEvent.change(monthlyPaymentInput, { target: { value: "500" } });

    // Проверка, что значение поля изменилось
    expect(monthlyPaymentInput.value).toBe("500");
  });

  // it("renders with initial data in add mode", () => {
  //   const initialGroupData: GroupType = {
  //     _id: "1",
  //     title: "Group 1",
  //     coachId: "coach1",
  //     payment: [
  //       {
  //         dailyPayment: 0,
  //         monthlyPayment: 1100,
  //       },
  //     ],
  //     schedule: [
  //       {
  //         day: "monday",
  //         time: "16:00",
  //       },
  //       {
  //         day: "wednesday",
  //         time: "16:00",
  //       },
  //       {
  //         day: "friday",
  //         time: "16:00",
  //       },
  //     ],
  //     participants: [
  //       {
  //         _id: "66d9c628c0839ff5f3bd730f",
  //         name: "Индросий",
  //         telegramId: 412631781,
  //       },
  //       {
  //         _id: "66d9b4e7e5e1b9e2718cde50",
  //         name: "Лиза",
  //         telegramId: 1018007612,
  //       },
  //     ],
  //   };

  //   render(
  //     <Provider store={store}>
  //       <GroupFormModal
  //         isEditMode={false}
  //         initialGroupData={initialGroupData}
  //         closeModal={mockCloseModal}
  //       />
  //     </Provider>
  //   );

  //   expect(screen.getByDisplayValue("")).toBeInTheDocument();
  //   expect(screen.getByDisplayValue("")).toBeInTheDocument();
  //   expect(screen.getByDisplayValue("")).toBeInTheDocument();
  // });

  it("вызывается санк с новыми значениями при изменении значений", async () => {
    render(
      <Provider store={store}>
        <GroupFormModal isEditMode={false} closeModal={mockCloseModal} />
      </Provider>
    );

    fireEvent.change(
      screen.getByTestId("group-title-input") as HTMLInputElement,
      { target: { value: "New Group" } }
    );
    fireEvent.change(screen.getByLabelText(/Ежедневный платеж/i), {
      target: { value: 10 },
    });
    fireEvent.change(screen.getByLabelText(/Ежемесячный платеж/i), {
      target: { value: 100 },
    });

    const addGroupButton = screen.getByText(/Добавить группу/i);
    fireEvent.click(addGroupButton);

    await waitFor(() => {
      expect(addGroupTh).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(addGroupTh).toHaveBeenCalledWith({
        title: "New Group",
        coachId: "Kostya",

        dailyPayment: 10,
        monthlyPayment: 100,

        schedule: [
          {
            day: "",
            time: "00:00",
          },
        ],
        participants: [],
      });
    });
  });
});

describe("GroupFormModalw", () => {
  let store: any;

  beforeEach(() => {
    jest.clearAllMocks(); // Очищаем моки перед каждым тестом

    // store = mockStore({
    //   users: [
    //     { id: "1", name: "User1" },
    //     { id: "2", name: "User2" },
    //   ],
    // });

  });

  it("renders GroupFormModal with initial data in edit mode", () => {
    const initialGroupData: GroupType = {
      _id: "1",
      title: "Group 1",
      coachId: "coach1",
      dailyPayment: 0, 
      monthlyPayment: 1100,
      schedule: [
        { day: "monday", time: "16:00" },
        { day: "wednesday", time: "16:00" },
        { day: "friday", time: "16:00" },
      ],
      participants: [
        {
          _id: "66d9c628c0839ff5f3bd730f",
          name: "Индросий",
          telegramId: 412631781,
        },
        {
          _id: "66d9b4e7e5e1b9e2718cde50",
          name: "Лиза",
          telegramId: 1018007612,
        },
      ],
    };

    // const store = mockStore({
    //   users: [
    //     { id: "1", name: "User1" },
    //     { id: "2", name: "User2" },
    //   ],
    // });
   

    render(
      <Provider store={store}>
        <GroupFormModal
          initialGroupData={initialGroupData}
          isEditMode={true}
          closeModal={mockCloseModal}
        />
      </Provider>
    );

    // Проверяем, что поле заголовка заполнено начальными данными
    expect(screen.getByDisplayValue("Group 1")).toBeInTheDocument();
    // Проверяем, что поля оплаты отображается с начальными данными
    expect(screen.getByDisplayValue("1100")).toBeInTheDocument();
  });
});
