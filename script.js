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
