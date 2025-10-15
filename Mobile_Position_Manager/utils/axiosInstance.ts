import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nest-axiosInstance-public.ixe-agent.io.vn/axiosInstance/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Gửi các request kèm theo lên axiosInstance
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm các thông tin như token, ngôn ngữ,... vào header
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Lấy các phản hồi từ phía server một cách tự động
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 Unauthorized and it's not the refresh token endpoint itself
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request to prevent infinite loops

      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Or retrieve from cookies
        const response = await axios.post(
          "https://nest-api-public.ixe-agent.io.vn/api/v1/auths/refresh-token",
          { refreshToken }
        );
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // Retry the original failed request
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error("Refresh token failed:", refreshError);
        // Example: Clear tokens and redirect to login page
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
