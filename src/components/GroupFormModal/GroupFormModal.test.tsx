import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GroupFormModal } from './GroupFormModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ToastContainer, toast } from 'react-toastify';
import '@testing-library/jest-dom';
import { GroupType } from '../../redux/types/types';
import { addGroupTh } from '../../redux/thunks/thunks';
import { addGroup } from '../../redux/api/groupsApi';

const mockStore = configureStore([]);
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const initialGroupData : GroupType =  {
    _id: "1",
    title: "Group 1",
    coachId: "coach1",
    payment: [{
        "dailyPayment": 0,
        "monthlyPayment": 1100
      }],
    schedule: [ {
        "day": "monday",
        "time": "16:00",
      },
      {
        "day": "wednesday",
        "time": "16:00",
      },
      {
        "day": "friday",
        "time": "16:00",
      }],
    participants: [ {
        "_id": "66d9c628c0839ff5f3bd730f",
        "name": "Индросий",
        "telegramId": 412631781
      },
      {
        "_id": "66d9b4e7e5e1b9e2718cde50",
        "name": "Лиза",
        "telegramId": 1018007612
      }],
  };


// jest.mock('../../redux/api/groupsApi', () => ({
//   addGroup: jest.fn(),
// }));
jest.mock("../../redux/api/groupsApi", () => ({
    addGroup: jest.fn() as jest.MockedFunction<typeof addGroup>,
  }));
  const mockedaddGroup = addGroup as jest.MockedFunction<
  typeof addGroup
>;

jest.mock('../../redux/thunks/thunks', () => ({
  addGroupTh: jest.fn(),
}));

describe("GroupFormModal", () => {
  let store: any;

  beforeEach(() => {
    jest.clearAllMocks();  // Очищаем моки перед каждым тестом

    store = mockStore({
      users: [{ id: '1', name: 'User1' }, { id: '2', name: 'User2' }],
    });
  });

  it('renders with initial data in edit mode', () => {
    const initialGroupData : GroupType =  {
        _id: "1",
        title: "Group 1",
        coachId: "coach1",
        payment: [{
            "dailyPayment": 0,
            "monthlyPayment": 1100
          }],
        schedule: [ {
            "day": "monday",
            "time": "16:00",
          },
          {
            "day": "wednesday",
            "time": "16:00",
          },
          {
            "day": "friday",
            "time": "16:00",
          }],
        participants: [ {
            "_id": "66d9c628c0839ff5f3bd730f",
            "name": "Индросий",
            "telegramId": 412631781
          },
          {
            "_id": "66d9b4e7e5e1b9e2718cde50",
            "name": "Лиза",
            "telegramId": 1018007612
          }],
      };

    render(
      <Provider store={store}>
        <GroupFormModal  isEditMode={false} initialGroupData={initialGroupData}/>
      </Provider>
    );

    expect(screen.getByDisplayValue('Group 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('0')).toBeInTheDocument();
  });

  it('should call addGroupTh on form submission', async () => {
    render(
      <Provider store={store}>
        <GroupFormModal isEditMode={false} initialGroupData={initialGroupData} />
      </Provider>
    );

    fireEvent.change(screen.getByTestId("group-title-input") as HTMLInputElement, { target: { value: 'New Group' } });
    fireEvent.change(screen.getByLabelText(/Ежедневный платеж/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/Ежемесячный платеж/i), { target: { value: 100 } });

    const addGroupButton = screen.getByText(/Добавить группу/i);
    fireEvent.click(addGroupButton);

    await waitFor(() => {
      expect(addGroupTh).toHaveBeenCalled();
    });
    await waitFor(() => {
        expect(addGroupTh).toHaveBeenCalledWith({
            title: 'New Group',
            coachId: "Kostya",
            payment: [{
                "dailyPayment": 10,
                "monthlyPayment": 100
              }],
            schedule: [ {
                "day": "monday",
                "time": "16:00",
              },
              {
                "day": "wednesday",
                "time": "16:00",
              },
              {
                "day": "friday",
                "time": "16:00",
              }],
            participants: [ {
                "_id": "66d9c628c0839ff5f3bd730f",
                "name": "Индросий",
                "telegramId": 412631781
              },
              {
                "_id": "66d9b4e7e5e1b9e2718cde50",
                "name": "Лиза",
                "telegramId": 1018007612
              }],
        });
      });
  
    console.log(addGroupTh)
//     await waitFor(() => {
//         expect(screen.getByText("Группа успешно добавлена")).toBeTruthy()
//    //   expect(toast.error).toHaveBeenCalledWith("Ошибка при обновлении группы");
//     });
  //  expect(toast.success).toHaveBeenCalled();
  });

//   it('should show error toast on failure', async () => {
//     mockedaddGroup.mockRejectedValueOnce('error');  // Мокаем ошибку

//     render(
//       <Provider store={store}>
//         <GroupFormModal isEditMode={false} initialGroupData={initialGroupData}/>
//       </Provider>
//     );

//     fireEvent.change(screen.getByText("Group 1"), { target: { value: 'New Group' } });

//     const addGroupButton = screen.getByText(/Добавить группу/i);
//     fireEvent.click(addGroupButton);
    
// //     await waitFor(() => {
// //         expect(screen.getByText("Ошибка при обновлении группы")).toBeTruthy()
// //    //   expect(toast.error).toHaveBeenCalledWith("Ошибка при обновлении группы");
// //     });
//   });
 });

describe("GroupFormModalw", () => {
    let store: any;
  
    beforeEach(() => {
      jest.clearAllMocks();  // Очищаем моки перед каждым тестом
  
      store = mockStore({
        users: [{ id: '1', name: 'User1' }, { id: '2', name: 'User2' }],
      });
    });

    test('renders GroupFormModal with initial data in edit mode', () => {
        const initialGroupData: GroupType = {
          _id: "1",
          title: "Group 1",
          coachId: "coach1",
          payment: [{ dailyPayment: 0, monthlyPayment: 1100 }],
          schedule: [
            { day: "monday", time: "16:00" },
            { day: "wednesday", time: "16:00" },
            { day: "friday", time: "16:00" }
          ],
          participants: [
            { _id: "66d9c628c0839ff5f3bd730f", name: "Индросий", telegramId: 412631781 },
            { _id: "66d9b4e7e5e1b9e2718cde50", name: "Лиза", telegramId: 1018007612 }
          ]
        };
      
        const store = mockStore({
          users: [{ id: '1', name: 'User1' }, { id: '2', name: 'User2' }]
        });
      
        render(
          <Provider store={store}>
            <GroupFormModal initialGroupData={initialGroupData} isEditMode={true} />
          </Provider>
        );
      
        // Проверяем, что поле заголовка заполнено начальными данными
        expect(screen.getByDisplayValue('Group 1')).toBeInTheDocument();
        // Проверяем, что поля оплаты отображается с начальными данными
        expect(screen.getByDisplayValue('1100')).toBeInTheDocument();
        expect(screen.getByDisplayValue('0')).toBeInTheDocument();
      });
});