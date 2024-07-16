// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// // Route Proxy để chuyển tiếp yêu cầu đến JSONPlaceholder API
// app.use('/api', async (req, res) => {
//   const url = `https://jsonplaceholder.typicode.com${req.url}`;
//   try {
//     const response = await axios({
//       method: req.method,
//       url: url,
//       data: req.body,
//     });
//     res.json(response.data);
//   } catch (error) {
//     res.status(error.response.status).send(error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
