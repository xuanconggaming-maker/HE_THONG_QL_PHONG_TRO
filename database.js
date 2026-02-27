const DB_KEY = "ROOM_DATABASE";
const LOG_KEY = "TRANSACTION_HISTORY";
const PENDING_KEY = "PENDING_REQUESTS";

function initDatabase() {
  if (!localStorage.getItem(DB_KEY)) {
    const initialRooms = [
      {
        id: "P.101",
        type: "Phòng Đơn",
        price: 2500000,
        status: "Đã thuê",
        guest: "Nguyễn Văn A",
      },
      {
        id: "P.102",
        type: "Phòng Đôi",
        price: 3500000,
        status: "Còn trống",
        guest: "-",
      },
      {
        id: "P.103",
        type: "Phòng Đơn",
        price: 500000,
        status: "Còn trống",
        guest: "-",
      },
      {
        id: "P.104",
        type: "Phòng Đơn",
        price: 800000,
        status: "Còn trống",
        guest: "-",
      },
      {
        id: "P.105",
        type: "Phòng Đôi",
        price: 1500000,
        status: "Đã thuê",
        guest: "Trần Thị B",
      },
      {
        id: "P.106",
        type: "Phòng Đơn",
        price: 2100000,
        status: "Còn trống",
        guest: "-",
      },
      {
        id: "P.201",
        type: "Phòng Đơn",
        price: 2500000,
        status: "Đã thuê",
        guest: "Lê Văn C",
      },
      {
        id: "P.202",
        type: "Phòng Đơn",
        price: 1350000,
        status: "Đã thuê",
        guest: "Phạm Văn D",
      },
      {
        id: "P.203",
        type: "Phòng Đôi",
        price: 4500000,
        status: "Còn trống",
        guest: "-",
      },
      {
        id: "P.204",
        type: "Phòng Đơn",
        price: 1300000,
        status: "Còn trống",
        guest: "-",
      },
      {
        id: "P.205",
        type: "Phòng Đôi",
        price: 2700000,
        status: "Đã thuê",
        guest: "Hoàng Văn E",
      },
      {
        id: "P.206",
        type: "Phòng Đơn",
        price: 900000,
        status: "Còn trống",
        guest: "-",
      },
    ];
    localStorage.setItem(DB_KEY, JSON.stringify(initialRooms));
  }
}

function getRooms() {
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}
function getTransactions() {
  return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
}
function getPendingRequests() {
  return JSON.parse(localStorage.getItem(PENDING_KEY)) || [];
}

function addRoom(newRoom) {
  let rooms = getRooms();
  if (rooms.some((r) => r.id === newRoom.id)) return false;
  rooms.push(newRoom);
  localStorage.setItem(DB_KEY, JSON.stringify(rooms));
  return true;
}

function requestDeposit(username, amount) {
  let pending = getPendingRequests();
  pending.unshift({
    id: "RQ" + Math.floor(Math.random() * 100000),
    user: username,
    amount: amount,
    time: new Date().toLocaleString("vi-VN"),
  });
  localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
}

function approveDeposit(reqId) {
  let pending = getPendingRequests();
  let index = pending.findIndex((r) => r.id === reqId);
  if (index !== -1) {
    let req = pending[index];
    let balanceKey = "balance_" + req.user;
    let currentBal = parseInt(localStorage.getItem(balanceKey) || 0);
    localStorage.setItem(balanceKey, currentBal + req.amount);

    let logs = getTransactions();
    logs.unshift({
      id: "GD" + Math.floor(Math.random() * 100000),
      user: req.user,
      amount: req.amount,
      time: req.time,
      status: "Thành công",
    });
    localStorage.setItem(LOG_KEY, JSON.stringify(logs));

    pending.splice(index, 1);
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    return true;
  }
  return false;
}

function rejectDeposit(reqId) {
  let pending = getPendingRequests();
  let index = pending.findIndex((r) => r.id === reqId);
  if (index !== -1) {
    pending.splice(index, 1);
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    return true;
  }
  return false;
}

function updateRoom(roomId, newData) {
  let rooms = getRooms();
  let index = rooms.findIndex((r) => r.id === roomId);
  if (index !== -1) {
    rooms[index] = { ...rooms[index], ...newData };
    localStorage.setItem(DB_KEY, JSON.stringify(rooms));
    return true;
  }
  return false;
}

initDatabase();
