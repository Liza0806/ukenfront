import { useSelector } from "react-redux";
import cls from "./AdminStatPage.module.scss";
import {
  selectActiveUsers,
  selectEvents,
  selectEventsThisMonth,
  selectEventsThisWeek,
  selectEventsThisYear,
  selectGroups,
  selectPayments,
  selectUsers,
} from "../../redux/selectors/selectors";
import {
  LineChart,
  Line,
  AreaChart,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";
import * as stat from "./adminStatistics";

const AdminStatPage = () => {
  const groups = useSelector(selectGroups);
  const users = useSelector(selectUsers);
  const events = useSelector(selectEvents);
  const payments = useSelector(selectPayments);
  const activeUsers = useSelector(selectActiveUsers);
  const eventsThisMonth = useSelector(selectEventsThisMonth);
  const eventsThisYear = useSelector(selectEventsThisYear);
  const eventsThisWeek = useSelector(selectEventsThisWeek);
  const usersForStat = stat.getMonthlyAttendanceWithCounts(users);
  const eventsForStat = stat.getMonthlyEventsCount(events);
  const paymentsPerMonth = stat.sumPaymentsByMonth(payments);
  const newClients = stat.countNewClientsByMonth(users);

  return (
    <div style={{ backgroundColor: "#121212", color: "#fff", padding: "20px" }}>
      <div className={cls.statNumbers}>
        <div>Активні групи: {groups.length}</div>
        <div>Користувачі: {users.length}</div>
        <div>Активні користувачі: {activeUsers.length}</div>
        <div>Події для груп цього тижня: {eventsThisWeek.length}</div>
        <div>Події для груп цього місяця: {eventsThisMonth.length}</div>
        <div>Події для груп цього року: {eventsThisYear.length}</div>
      </div>
      <div>
        {/* активних користувачів по місяцях */}
        <div>Кількість активних користувачів по місяцях</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={usersForStat}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis dataKey="usersCount" stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
            />
            <Line
              type="monotone"
              dataKey="usersCount"
              stroke="#FF7F00"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* тренувань по місяцях */}
      <div>
        <div>Кількість тренувань по місяцях</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={eventsForStat}>
            <CartesianGrid stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis dataKey="eventCount" stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
            />
            <Line
              type="monotone"
              dataKey="eventCount"
              stroke="#FF7F00"
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* кількість учасників на тренуваннях */}
      <div>
        <div>Кількість учасників на тренуваннях</div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={500}
            height={400}
            data={events}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey={(event) => {
                const date = new Date(event.date);
                return date.toLocaleDateString("uk-UA", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
              }}
              stroke="#ccc"
            />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
            />
            <Area
              type="monotone"
              dataKey="participants.length"
              stroke="#FF7F00"
              fill="#FF7F00"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Платежі по місяцях (Стовпчиковий графік) */}
      <div>
        <div>Платежі по місяцях</div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={400}
            data={paymentsPerMonth}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
            />
            <Bar dataKey="monthlyAmount" fill="#FF7F00" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
        <div>Платежі по місяцях</div>
      </div>

      {/* Нові клієнти (Стовпчиковий графік) */}
      <div>
        <div>Нові клієнти по місяцях</div>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={400}
            data={newClients}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", borderRadius: "5px" }}
            />
            <Bar
              dataKey="newClientsCount"
              fill="#FF7F00" // Оранжевый цвет
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStatPage;
