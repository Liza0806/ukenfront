import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getAllUsers,
  getUsersByName,
  getUsersByUserId,
  addParticipant,
} from "./usersApi"; // Замените на правильный путь
import { EventTypeDB, User } from "../types/types";

describe("getAllUsers", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset(); // Сбрасываем моки после каждого теста
    localStorage.clear(); // Очищаем localStorage перед каждым тестом
  });

  afterAll(() => {
    mock.restore(); // Восстанавливаем axios после завершения всех тестов
  });

  it("should fetch all users and store them in localStorage", async () => {
    const mockData = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
    ];

    // Настраиваем мок для axios
    mock.onGet("https://ukenback.vercel.app/users/").reply(200, mockData);

    const users = await getAllUsers();

    expect(users).toEqual(mockData); // Проверяем, что данные соответствуют мокам
    expect(localStorage.getItem("users")).toBe(JSON.stringify(mockData)); // Проверяем, что данные сохранились в localStorage
  });

  it("should throw an error when the request fails", async () => {
    // Настраиваем мок для ошибки
    mock.onGet("https://ukenback.vercel.app/events/").reply(500);

    await expect(getAllUsers()).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("getUsersByUserId", () => {
  let mock: MockAdapter; // Указываем тип для mock

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset(); // Сбрасываем моки после каждого теста
  });

  afterAll(() => {
    mock.restore(); // Восстанавливаем axios после завершения всех тестов
  });

  it("should fetch an user by ID", async () => {
    const mockUser: User = {
      _id: "1",
      name: "userName",
      password: "111",
      phone: "11111",
      isAdmin: false,
      groups: [],
      balance: 11,
      telegramId: 111,
  
      visits: [],
    };
    const userId = "1";

    // Настраиваем мок для axios
    mock
      .onGet(`https://ukenback.vercel.app/users/${userId}`)
      .reply(200, mockUser);

    const user = await getUsersByUserId(userId);

    expect(user).toEqual(mockUser); // Проверяем, что данные соответствуют мокам
  });

  it("should throw an error when the request fails", async () => {
    const userId = "1";

    // Настраиваем мок для ошибки
    mock.onGet(`https://ukenback.vercel.app/users/${userId}`).reply(500);

    await expect(getUsersByUserId(userId)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("getUsersByName", () => {
  let mock: MockAdapter; // Указываем тип для mock

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset(); // Сбрасываем моки после каждого теста
  });

  afterAll(() => {
    mock.restore(); // Восстанавливаем axios после завершения всех тестов
  });

  it("should fetch an event by ID", async () => {
    const mockUser: User = {
      _id: "1",
      name: "userName",
      password: "111",
      phone: "11111",
      isAdmin: false,
      groups: [],
      balance: 11,
      telegramId: 111,

      visits: [],
    };
    const userName = "userName";

    // Настраиваем мок для axios
    mock
      .onGet(`https://ukenback.vercel.app/users/search`, {
        params: { name: userName },
      })
      .reply(200, mockUser);

    const user = await getUsersByName(userName);

    expect(user).toEqual(mockUser); // Проверяем, что данные соответствуют мокам
  });

  it("should throw an error when the request fails", async () => {
    const userName = "userName";

    // Настраиваем мок для ошибки
    mock
      .onGet(`https://ukenback.vercel.app/events/search`, {
        params: { name: userName },
      })
      .reply(500);

    await expect(getUsersByName(userName)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("addParticipant", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset(); // Сбрасываем моки после каждого теста
  });

  afterAll(() => {
    mock.restore(); // Восстанавливаем axios после завершения всех тестов
  });

  it("should add a participant and return the updated data", async () => {
    const username = "testUser";
    const id = "123";
    const mockResponse = {
      success: true,
      message: "Participant added successfully.",
    };

    // Настраиваем мок для axios
    mock
      .onPut(`https://ukenback.vercel.app/event/`, {
        params: { name: username, id: id },
      })
      .reply(200, mockResponse);

    // Вызываем функцию
    const result = await addParticipant(username, id);

    // Проверяем, что возвращаемые данные соответствуют ожидаемым
    expect(result).toEqual(mockResponse);
    // Проверяем, что данные корректно записаны в localStorage
    expect(localStorage.getItem("users")).toBe(JSON.stringify(mockResponse)); // Проверяем, что данные сохранились в localStorage
  });

  it("should throw an error when the request fails", async () => {
    const username = "testUser";
    const id = "123";

    // Настраиваем мок для axios, чтобы вернуть ошибку
    mock
      .onPut(`https://ukenback.vercel.app/event/`, {
        params: { name: username, id: id },
      })
      .reply(500);

    // Проверяем, что функция выбрасывает ошибку
    await expect(addParticipant(username, id)).rejects.toThrowError();
  });
});
