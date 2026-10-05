# Sử dụng Node.js bản nhẹ LTS
FROM node:20-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file khai báo thư viện vào container
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 5000 cho container
EXPOSE 5000

# Lệnh khởi chạy server khi container bắt đầu chạy
CMD ["node", "server.js"]