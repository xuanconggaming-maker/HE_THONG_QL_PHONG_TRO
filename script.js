// Đợi trang tải xong hoàn toàn
document.addEventListener("DOMContentLoaded", function () {
  // 1. Chạy đồng hồ
  function runClock() {
    const clockBox = document.getElementById("liveClock");
    if (clockBox) {
      const now = new Date();
      clockBox.innerHTML = "🕒 " + now.toLocaleString("vi-VN");
    }
  }
  setInterval(runClock, 1000);
  runClock();

  // 2. Kiểm tra log để biết JS đã chạy
  console.log("Hệ thống của Xuân Công đã kích hoạt JS thành công!");
});
document.querySelector(".login-form").onsubmit = function (e) {
  e.preventDefault(); // Ngăn trang tải lại

  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let messageArea = document.getElementById("error-message");

  // Xóa thông báo cũ nếu có
  if (messageArea) messageArea.remove();

  // GIẢ LẬP KIỂM TRA TÀI KHOẢN (Bạn có thể đổi mật khẩu tại đây)
  if (user === "admin" && pass === "123456") {
    localStorage.setItem("userRole", "admin");
    localStorage.setItem("userName", "Quản lý Xuân Công");
    alert("Đăng nhập thành công!");
    window.location.href = "index.html"; // Dẫn đến trang chủ
  } else if (user === "khach" && pass === "123") {
    localStorage.setItem("userRole", "khach");
    localStorage.setItem("userName", "Khách Thuê");
    window.location.href = "index.html";
  } else {
    // TẠO THÔNG BÁO LỖI NẾU SAI MẬT KHẨU
    let errorDiv = document.createElement("div");
    errorDiv.id = "error-message";
    errorDiv.style.color = "#b50d0d";
    errorDiv.style.fontSize = "14px";
    errorDiv.style.marginTop = "10px";
    errorDiv.style.textAlign = "center";
    errorDiv.style.fontWeight = "bold";
    errorDiv.innerText = "❌ Tài khoản hoặc mật khẩu không chính xác!";

    // Chèn thông báo vào dưới nút bấm
    document.querySelector(".login-form").appendChild(errorDiv);

    // Hiệu ứng rung ô nhập liệu để báo lỗi
    document.querySelector(".login-card").style.animation = "shake 0.3s";
    setTimeout(() => {
      document.querySelector(".login-card").style.animation = "";
    }, 300);
  }
};
