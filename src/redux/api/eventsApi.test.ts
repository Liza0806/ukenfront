import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllEvents, getEventById, updateEventAPi } from "./eventsApi"; // Замените на правильный путь
import { EventTypeDB } from "../types/types";

describe("getAllEvents", () => {
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

  it("should fetch all events and store them in localStorage", async () => {
    const mockData = [
      { id: 1, name: "Event 1" },
      { id: 2, name: "Event 2" },
    ];

    // Настраиваем мок для axios
    mock.onGet("https://ukenback.vercel.app/events/").reply(200, mockData);

    const events = await getAllEvents();

    expect(events).toEqual(mockData); // Проверяем, что данные соответствуют мокам
    expect(localStorage.getItem("events")).toBe(JSON.stringify(mockData)); // Проверяем, что данные сохранились в localStorage
  });

  it("should throw an error when the request fails", async () => {
    // Настраиваем мок для ошибки
    mock.onGet("https://ukenback.vercel.app/events/").reply(500);

    await expect(getAllEvents()).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("getEventById", () => {
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
    const mockEvent = { id: 1, name: "Event 1" };
    const eventId = "1";

    // Настраиваем мок для axios
    mock
      .onGet(`https://ukenback.vercel.app/events/${eventId}`)
      .reply(200, mockEvent);

    const event = await getEventById(eventId);

    expect(event).toEqual(mockEvent); // Проверяем, что данные соответствуют мокам
  });

  it("should throw an error when the request fails", async () => {
    const eventId = "1";

    // Настраиваем мок для ошибки
    mock.onGet(`https://ukenback.vercel.app/events/${eventId}`).reply(500);

    await expect(getEventById(eventId)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("updateEventAPi", () => {
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

  it("should update an event and return the updated data", async () => {
    const mockEvent: EventTypeDB = {
      _id: "1",
      groupTitle: "Updated Event",
      groupId: "1",
      date: new Date().toISOString(),
      isCancelled: false,
      participants: [],
    }; 
    const updatedData = { ...mockEvent, name: "Updated Event Name" }; // Ожидаемое обновленное событие

    // Настраиваем мок для axios
    mock
      .onPut(`https://ukenback.vercel.app/events/${mockEvent._id}`)
      .reply(200, updatedData);

    const result = await updateEventAPi(mockEvent);

    expect(result).toEqual(updatedData); // Проверяем, что возвращаемые данные соответствуют ожидаемым
  });

  it("should throw an error when the request fails", async () => {
    const mockEvent: EventTypeDB = {
      _id: "1",
      groupTitle: "Updated Event",
      groupId: "1",
      date: new Date().toISOString(),
      isCancelled: false,
      participants: [],
    }; 

    // Настраиваем мок для ошибки
    mock
      .onPut(`https://ukenback.vercel.app/events/${mockEvent._id}`)
      .reply(500);

    await expect(updateEventAPi(mockEvent)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});
export {};