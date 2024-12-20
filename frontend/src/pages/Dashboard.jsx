import React, { useEffect } from 'react';
import { FaUsers, FaProjectDiagram, FaTasks, FaClipboardList } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useStore } from '../store/store';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
};

const AnimatedCard = ({ icon: Icon, color, title, description, value, onClick }) => {
  return (
    <motion.div
      className={`card shadow-xl bg-${color} text-black`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <Icon className="text-4xl text-primary" />
          <span className="text-xl font-bold">{value}</span>
        </div>
        <h2 className="card-title mt-2">{title}</h2>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const dashboardData = useStore((state) => state.dashboardData);
  const setDashboardData = useStore((state) => state.setDashboardData);
  const chartData = useStore((state) => state.chartData);
  const setChartData = useStore((state) => state.setChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponse = await axios.get('http://localhost:8080/api/dashboard/data');
        console.log('Dashboard Data:', dashboardResponse.data);  // Log the response data
        setDashboardData(dashboardResponse.data);

        const chartResponse = await axios.get('http://localhost:8080/api/tasks/chart-data');
        setChartData({
          labels: chartResponse.data.labels,
          datasets: [
            {
              label: 'Tasks Completed',
              data: chartResponse.data.completedData,
              borderColor: '#4ADE80',
              backgroundColor: 'rgba(74, 222, 128, 0.2)',
              tension: 0.4,
              fill: false,
              pointBackgroundColor: '#4ADE80',
            }
          ],
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [setDashboardData, setChartData]);

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AnimatedCard
          icon={FaUsers}
          color="white"
          title="Teams"
          description="Total number of teams"
          value={dashboardData.teamsCount}
        />
        <AnimatedCard
          icon={FaProjectDiagram}
          color="white"
          title="Projects"
          description="Total number of projects."
          value={dashboardData.projects}
        />
        <AnimatedCard
          icon={FaTasks}
          color="white"
          title="Pending Tasks"
          description="Total number of pending tasks."
          value={dashboardData.pendingTasks}
        />
        <AnimatedCard
          icon={FaClipboardList}
          color="white"
          title="Completed Tasks"
          description="Total number of completed tasks."
          value={dashboardData.completedTasks}
        />
      </div>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Tasks Progress</h2>
          <div style={{ height: '400px' }}>
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
