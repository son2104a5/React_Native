# TodoList Mobile App với API Integration

Ứng dụng TodoList React Native đã được tích hợp hoàn chỉnh với Spring Boot API backend.

## Cấu trúc dự án

### Backend (API_Ss22)
- **Framework**: Spring Boot 3.5.7
- **Database**: MySQL
- **Port**: 8080
- **Endpoints**:
  - `GET /api/v1/tasks` - Lấy danh sách tất cả tasks
  - `POST /api/v1/tasks` - Tạo task mới
  - `PUT /api/v1/tasks/{id}` - Cập nhật task
  - `DELETE /api/v1/tasks/{id}` - Xóa task

### Frontend (Mobile_TodoList-Template)
- **Framework**: React Native với Expo
- **Navigation**: Expo Router
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Yup validation
- **API Integration**: Custom API service

## Cài đặt và chạy ứng dụng

### 1. Cài đặt Backend

```bash
cd API_Ss22
./gradlew bootRun
```

Backend sẽ chạy trên `http://localhost:8080`

### 2. Cài đặt Frontend

```bash
cd Mobile_TodoList-Template
npm install
npx expo start
```

### 3. Cấu hình Database

Đảm bảo MySQL đang chạy và có database `todo_task_ss22` với thông tin kết nối trong `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/todo_task_ss22?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=snd21804@
```

## Tính năng đã hoàn thiện

### ✅ API Integration
- Tích hợp hoàn chỉnh với Spring Boot API
- Xử lý CRUD operations (Create, Read, Update, Delete)
- Error handling và loading states
- Pull-to-refresh functionality

### ✅ UI/UX Improvements
- Loading indicators khi tải dữ liệu
- Empty state khi không có tasks
- Error alerts với thông báo tiếng Việt
- Disabled buttons khi đang xử lý

### ✅ Data Management
- Chuyển đổi từ mock data sang real API calls
- Cập nhật types để match với API structure
- Helper functions để convert giữa API format và UI display

### ✅ Form Handling
- Validation với Yup schema
- Loading states trong forms
- Success/error feedback

## Cấu trúc files quan trọng

### API Service
- `services/api.ts` - API service layer với tất cả HTTP calls

### Types
- `types/index.ts` - TypeScript interfaces và helper functions

### Components
- `components/TaskForm.tsx` - Form component cho add/edit
- `components/TaskListItem.tsx` - List item component

### Screens
- `app/(tabs)/(tasks)/index.tsx` - Danh sách tasks
- `app/(tabs)/(tasks)/add.tsx` - Thêm task mới
- `app/(tabs)/(tasks)/edit.tsx` - Chỉnh sửa task
- `app/(tabs)/(tasks)/[id].tsx` - Chi tiết task

## Testing

Chạy test script để kiểm tra API:

```bash
node test-api.js
```

## Lưu ý

1. **Network Configuration**: Đảm bảo mobile device/emulator có thể truy cập `localhost:8080`
2. **CORS**: Backend đã được cấu hình để cho phép CORS requests
3. **Database**: Database sẽ được tạo tự động khi chạy lần đầu

## Troubleshooting

### Lỗi kết nối API
- Kiểm tra backend có đang chạy không
- Kiểm tra network configuration
- Xem logs trong console để debug

### Lỗi database
- Kiểm tra MySQL service
- Kiểm tra connection string trong `application.properties`
- Kiểm tra database permissions
