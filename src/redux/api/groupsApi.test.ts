import { group } from 'console';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllGroups, addGroup, deleteGroup, updateGroup } from "./groupsApi"; // Замените на правильный путь
import { AddGroupType, EventTypeDB, GroupType } from "../types/types";

describe("getAllGroups", () => {
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

  it("should fetch all groups and store them in localStorage", async () => {
    const mockData = [
      { id: 1, name: "Event 1" },
      { id: 2, name: "Event 2" },
    ];

    // Настраиваем мок для axios
    mock.onGet("https://ukenback.vercel.app/groups/").reply(200, mockData);

    const groups = await getAllGroups();

    expect(groups).toEqual(mockData); // Проверяем, что данные соответствуют мокам
    expect(localStorage.getItem("groups")).toBe(JSON.stringify(mockData)); // Проверяем, что данные сохранились в localStorage
  });

  it("should throw an error when the request fails", async () => {
    // Настраиваем мок для ошибки
    mock.onGet("https://ukenback.vercel.app/events/").reply(500);

    await expect(getAllGroups()).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("addGroup", () => {
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

  it("should add group", async () => {
    const mockGroup: AddGroupType = {
        title: "Group 1",
        coachId: "coach1",
        dailyPayment: 0, 
        monthlyPayment:0,
        schedule: [],
        participants: [],
      };

    // Настраиваем мок для axios
    mock
      .onPost(`https://ukenback.vercel.app/groups/`, mockGroup)
      .reply(200, mockGroup);

    const group = await addGroup(mockGroup);

    expect(group.data).toEqual({
      title: mockGroup.title,
      coachId: mockGroup.coachId,
      dailyPayment: 0, 
      monthlyPayment:0,
      schedule: mockGroup.schedule,
      participants: [],
    }); // Проверяем, что данные соответствуют мокам
  });

  it("should throw an error when the request fails", async () => {
  
    const mockGroup: GroupType = {
        _id: "1",
        title: "Group 1",
        coachId: "coach1",
        dailyPayment: 0, 
        monthlyPayment:0,
        schedule: [],
        participants: [],
      };
    // Настраиваем мок для ошибки
    mock.onGet(`https://ukenback.vercel.app/groups/`).reply(500);

    await expect(addGroup(mockGroup)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("updateGroup", () => {
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

  it("should update an group and return the updated data", async () => {
    
    const mockGroup: GroupType = {
        _id: "1",
        title: "Group 1",
        coachId: "coach1",
        dailyPayment: 0,
        monthlyPayment:0,
        schedule: [],
        participants: [],
      };

    const updatedData = { ...mockGroup, name: "Updated Event Name" }; // Ожидаемое обновленное событие

    // Настраиваем мок для axios
    mock
      .onPut(`https://ukenback.vercel.app/groups/${mockGroup._id}`)
      .reply(200, updatedData);

    const result = await updateGroup(mockGroup, mockGroup._id);

    expect(result).toEqual(updatedData); // Проверяем, что возвращаемые данные соответствуют ожидаемым
  });

  it("should throw an error when the request fails", async () => {
   const mockGroup: GroupType = {
        _id: "1",
        title: "Group 1",
        coachId: "coach1",
        dailyPayment: 0, 
        monthlyPayment:0,
        schedule: [],
        participants: [],
      };

    // Настраиваем мок для ошибки
    mock
      .onPut(`https://ukenback.vercel.app/events/${mockGroup._id}`)
      .reply(500);

    await expect(updateGroup(mockGroup, mockGroup._id)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
  });
});

describe("deleteGroup", () => {
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
  
    it("should delete a group and return the updated data", async () => {
      const mockId = '1';
  
      // Настраиваем мок для axios
      mock
        .onDelete(`https://ukenback.vercel.app/groups/${mockId}`)
        .reply(200, { message: "Group successfully deleted" }); // Возвращаем сообщение об успешном удалении
  
      const result = await deleteGroup(mockId);
  
      // Проверяем, что возвращаемые данные соответствуют ожидаемым
      expect(result.data).toEqual({ message: "Group successfully deleted" });
    });


    it("should throw an error when the request fails", async () => {
        const mockId = '1';
      // Настраиваем мок для ошибки
      mock
        .onDelete(`https://ukenback.vercel.app/events/${mockId}`)
        .reply(500);
  
      await expect(deleteGroup(mockId)).rejects.toThrow(); // Проверяем, что ошибка выбрасывается
    });
  });

 export {};