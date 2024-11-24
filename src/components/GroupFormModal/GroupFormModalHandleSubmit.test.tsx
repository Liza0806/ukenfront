import { GroupFormModal, handleSubmit } from "./GroupFormModal";
import { configureStore } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import groupsReducer from "../../redux/slices/groupsSlice";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { addGroup, updateGroup } from "../../redux/api/groupsApi";
import { Provider } from "react-redux";
import React from "react";

const mockGroupFormState = {
  title: "Test Group",
  dailyPayment: 50,
  monthlyPayment: 1000,
  schedule: [
    {
      day: "Понеділок",
      time: "16:00",
    },
    {
      day: "Середа",
      time: "16:00",
    },
    {
      day: "П'ятниця",
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

const mockUpdateGroupFormState = {
  title: "Test New Group",
  dailyPayment: 5,
  monthlyPayment: 10,
  schedule: [
    {
      day: "Понеділок",
      time: "16:11",
    },
    {
      day: "Середа",
      time: "16:11",
    },
    {
      day: "Неділя",
      time: "16:11",
    },
  ],
  participants: [
    {
      _id: "66d9c628c0839ff5f3bd730f",
      name: "Индросий",
      telegramId: 412631781,
    },
  ],
};
const mockGroup = {
  title: "Test Group",
  payment: [{ dailyPayment: 50, monthlyPayment: 1000 }],
  schedule: [
    {
      day: "Понеділок",
      time: "16:00",
    },
    {
      day: "Середа",
      time: "16:00",
    },
    {
      day: "П'ятниця",
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

const mockUpdateGroup = {
  title: "Test New Group",
  payment: [{ dailyPayment: 5, monthlyPayment: 10 }],
  schedule: [
    {
      day: "Понеділок",
      time: "16:11",
    },
    {
      day: "Середа",
      time: "16:11",
    },
    {
      day: "Неділя",
      time: "16:11",
    },
  ],
  participants: [
    {
      _id: "66d9c628c0839ff5f3bd730f",
      name: "Индросий",
      telegramId: 412631781,
    },
  ],
};

const initialGroupData = {
  _id: "1",
  ...mockGroup,
};
// Мокаем toast для тестирования
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Мокаем API
jest.mock("../../redux/api/groupsApi", () => ({
  addGroup: jest.fn() as jest.MockedFunction<typeof addGroup>,
  updateGroup: jest.fn() as jest.MockedFunction<typeof updateGroup>,
}));

const mockCloseModal = jest.fn();

// Создаем store с redux-thunk middleware
const store = configureStore({
  reducer: {
    groups: groupsReducer, // Подключаем редюсер группы
  },
});
const mockedaddGroup = addGroup as jest.MockedFunction<typeof addGroup>;

const mockedupdateGroup = updateGroup as jest.MockedFunction<
  typeof updateGroup
>;

describe("Функция handleSubmit", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Очищаем моки перед каждым тестом
  });

  it("успешно добавляет новую группу и обновляет состояние в Redux", async () => {
    // @ts-ignore
    mockedaddGroup.mockResolvedValue({ status: 200, data: mockGroup });
    // Вызываем handleSubmit с реальным dispatch
    await handleSubmit(
      false,
      mockGroupFormState,
      store.dispatch,
      mockCloseModal
    );

    // Получаем состояние после выполнения handleSubmit
    const state = store.getState();
    console.log(state.groups.groups, "state.groups.groups");
    console.log(state.groups, "state.groups");
    console.log(state, "state");
    // Проверяем, что состояние группы обновилось (добавлена новая группа)
    await waitFor(() => {
      expect(state.groups.groups).toHaveLength(1); // Например, если должна быть одна группа в state
    });
    expect(state.groups.groups[0].title).toBe("Test Group");
    expect(state.groups.groups[0].payment[0].dailyPayment).toBe(50);

    //Проверяем, что модальное окно закрывается
    expect(mockCloseModal).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalledTimes(1);

    // Проверяем, что toast.success был вызван с правильным сообщением
    expect(toast.success).toHaveBeenCalledWith("Группа успешно добавлена");
  });

  it("успешно обновляет группу и обновляет состояние в Redux", async () => {
    // @ts-ignore
    mockedupdateGroup.mockResolvedValue({
      updatedGroup: mockUpdateGroup,
      _id: "1",
    });
    // Вызываем handleSubmit с реальным dispatch
    await handleSubmit(
      true,
      mockUpdateGroupFormState,
      store.dispatch,
      mockCloseModal,
      initialGroupData._id
    );

    // Получаем состояние после выполнения handleSubmit
    const state = store.getState();
    const updatedGroup = state.groups.groups.find((group) => group._id === "1");

    expect(updatedGroup).toBeDefined(); // Проверяем, что группа существует

    expect(updatedGroup?.title).toBe("Test New Group"); // Проверка title
    expect(updatedGroup?.payment[0].dailyPayment).toBe(5); // Проверка dailyPayment

    //Проверяем, что модальное окно закрывается
    expect(mockCloseModal).toHaveBeenCalled();
    expect(mockCloseModal).toHaveBeenCalledTimes(1);

    // Проверяем, что toast.success был вызван с правильным сообщением
    expect(toast.success).toHaveBeenCalledWith("Группа успешно обновлена");
  });

  it("не добавляет группу при ошибке API и не обновляет состояние в Redux", async () => {
    // Мокаем ошибку API до выполнения теста
    mockedaddGroup.mockRejectedValue({ status: 500, data: {} });

    // Получаем состояние до вызова handleSubmit
    const stateBeforeLength = store.getState().groups.groups.length;

    // Вызываем handleSubmit с ошибкой API
    await handleSubmit(
      false,
      mockGroupFormState,
      store.dispatch,
      mockCloseModal
    );

    // Ждем, чтобы убедиться, что состояние обновилось после асинхронной операции
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Получаем состояние после выполнения handleSubmit
    const stateAfterLength = store.getState().groups.groups.length;

    // Проверяем, что состояние группы не обновилось
    expect(stateBeforeLength).toEqual(stateAfterLength);

    //Проверяем, что модальное окно не закрывается
    expect(mockCloseModal).not.toHaveBeenCalled();

    // Проверяем, что toast.error был вызван с правильным сообщением
    expect(toast.error).toHaveBeenCalledWith("Ошибка при сохранении группы");
  });

  it("не обновляет группу при ошибке API и не обновляет состояние в Redux", async () => {
    const stateBefore = store.getState().groups.groups;
    // Мокаем ошибку API до выполнения теста
    mockedupdateGroup.mockRejectedValue({});

    // Вызываем handleSubmit с ошибкой API
    await handleSubmit(
      false,
      mockGroupFormState,
      store.dispatch,
      mockCloseModal
    );

    // Ждем, чтобы убедиться, что состояние обновилось после асинхронной операции
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Получаем состояние после выполнения handleSubmit
    const state = store.getState();

    // Проверяем, что состояние группы не обновилось
    expect(state.groups.groups).toEqual(stateBefore);
    expect(state.groups.error).toBe("error"); // Проверка установки ошибки
    expect(state.groups.isLoading).toBe(false);

    //Проверяем, что модальное окно не закрывается
    expect(mockCloseModal).not.toHaveBeenCalled();

    // Проверяем, что toast.error был вызван с правильным сообщением
    expect(toast.error).toHaveBeenCalledWith("Ошибка при сохранении группы");
  });
});
