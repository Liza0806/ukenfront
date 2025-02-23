import { User, EventTypeDB, Payment } from "../../redux/types/types";

export function getMonthlyAttendanceWithCounts(
  users: User[]
): { month: string; usersCount: number }[] {
  const now = new Date();
  const monthlyStats: Record<string, Set<string>> = {};
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    monthlyStats[key] = new Set();
  }

  users.forEach((user) => {
    user.visits.forEach((visit) => {
      const visitDate = new Date(visit.date);
      const key = `${visitDate.getFullYear()}-${visitDate.getMonth() + 1}`;

      if (key in monthlyStats) {
        monthlyStats[key].add(user.name);
      }
    });
  });

  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  return Object.entries(monthlyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, usersSet]) => {
      const [year, monthIndex] = key.split("-").map(Number);
      return {
        month: `${months[monthIndex - 1]} ${year}`, // Название месяца + год
        usersCount: usersSet.size,
      };
    });
}

export function getMonthlyEventsCount(
  events: EventTypeDB[]
): { month: string; eventCount: number }[] {
  const now = new Date();
  const monthlyStats: Record<string, number> = {};

  // Генерируем ключи для последних 12 месяцев
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
    monthlyStats[key] = 0;
  }

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const key = `${eventDate.getFullYear()}-${eventDate.getMonth() + 1}`;

    if (key in monthlyStats) {
      monthlyStats[key]++;
    }
  });

  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  return Object.entries(monthlyStats)
    .sort(([a], [b]) => a.localeCompare(b)) // Сортируем по дате
    .map(([key, count]) => {
      const [year, monthIndex] = key.split("-").map(Number);
      return {
        month: `${months[monthIndex - 1]} ${year}`, // Название месяца + год
        eventCount: count,
      };
    });
}
export const getTotalBalance = (users: User[]): number => {
  return users.reduce(
    (total, user) => total + (user.balance > 0 ? user.balance : 0),
    0
  );
};

export interface MonthlyPayment {
  monthlyAmount: number;
  date: string;
}

export function sumPaymentsByMonth(payments: Payment[]): MonthlyPayment[] {
  const paymentsByMonth: Record<string, number> = {};
  const now = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(now.getFullYear() - 1);

  payments.forEach(({ amount, date }) => {
    const paymentDate = new Date(date);
    if (paymentDate >= yearAgo && paymentDate <= now) {
      const monthYear = paymentDate.toLocaleString("uk-UA", {
        month: "long",
        year: "numeric",
      });

      paymentsByMonth[monthYear] = (paymentsByMonth[monthYear] || 0) + amount;
    }
  });

  return Object.entries(paymentsByMonth).map(([monthYear, total]) => ({
    monthlyAmount: total,
    date: monthYear,
  }));
}

interface NewClientMonthlyCount {
  date: string; // "Лютий 2024"
  newClientsCount: number;
}

export function countNewClientsByMonth(users: User[]): NewClientMonthlyCount[] {
  const clientsByMonth: Record<string, number> = {};

  users.forEach(({ createdAt }) => {
    const createdDate = new Date(createdAt ? createdAt : new Date());
    const date = createdDate.toLocaleString("uk-UA", {
      month: "long",
      year: "numeric",
    });

    clientsByMonth[date] = (clientsByMonth[date] || 0) + 1;
  });

  return Object.entries(clientsByMonth)
    .sort(
      ([a], [b]) =>
        new Date(`01 ${a}`).getTime() - new Date(`01 ${b}`).getTime()
    )
    .map(([date, newClientsCount]) => ({
      date,
      newClientsCount,
    }));
}
