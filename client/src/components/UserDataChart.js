import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDataChart = () => {
  const posts = useSelector((state) => state.posts.items);
  const albums = useSelector((state) => state.albums.items);
  const photos = useSelector((state) => state.photos.items);
  const todos = useSelector((state) => state.todos.items);

  const data = {
    labels: ['Posts', 'Albums', 'Photos', 'Todos'],
    datasets: [
      {
        label: 'User Data',
        data: [posts.length, albums.length, photos.length, todos.length],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Data Overview',
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          User Data Chart
        </Typography>
        <Bar data={data} options={options} />
      </CardContent>
    </Card>
  );
};

export default UserDataChart;
