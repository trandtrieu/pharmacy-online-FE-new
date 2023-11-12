const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // Sử dụng CORS middleware

// Các cài đặt khác và tuyến đường của ứng dụng

const PORT = process.env.PORT || 8080; // Chọn cổng máy chủ

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
