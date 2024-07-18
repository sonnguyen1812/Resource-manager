import React from 'react';
import { Bar } from 'react-chartjs-2';
import { usePostContext } from '../context/PostContext';
import { useAlbumContext } from '../context/AlbumContext';
import { usePhotoContext } from '../context/PhotoContext';
import { useTodoContext } from '../context/TodoContext';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDataChart = () => {
  const { state: { items: posts = [] } } = usePostContext();
  const { state: { items: albums = [] } } = useAlbumContext();
  const { state: { items: photos = [] } } = usePhotoContext();
  const { state: { items: todos = [] } } = useTodoContext();

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
