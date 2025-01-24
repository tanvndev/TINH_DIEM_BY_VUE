<template>
  <div class="app-container">
    <h1>APP TINH DIEM</h1>

    <div class="settings">
      <label for="pointStep">Point: </label>
      <input
        id="pointStep"
        type="number"
        placeholder="Enter point"
        v-model.number="pointStep"
        @input="updatePointStep(pointStep)"
      />
    </div>

    <div class="add-player">
      <label>Player:</label>
      <input v-model="newPlayerName" type="text" placeholder="Enter player name" />
      <button @click="addPlayer">
        <i class="far fa-plus mr-2"></i>
      </button>
    </div>

    <div class="middle-section">
      <div class="reset-section">
        <button @click="resetGame" class="btn btn-reset">
          <i class="far fa-sync mr-2"></i> Reset Game
        </button>
      </div>

      <!-- Nút xuất Excel -->
      <div class="export-section">
        <button @click="exportToExcel" class="btn btn-export">
          <i class="far fa-download mr-2"></i> Export to Excel
        </button>
      </div>
    </div>

    <ul class="player-list">
      <li v-for="(player, index) in players" :key="index" class="player-item">
        <button class="btn btn-delete" @click="deletePlayer(index)">
          <i class="far fa-times"></i>
        </button>
        <span class="player-name">{{ player.name }}</span>
        <span class="player-points"
          >Point:
          <span
            class="player-points-value"
            :class="{ red: player.points < 0, green: player.points >= 0 }"
            >{{ player.points }}</span
          ></span
        >
        <div class="btn-group">
          <button class="btn btn-add" @click="addPoints(index)"><i class="far fa-plus"></i></button>
          <button class="btn btn-subtract" @click="subtractPoints(index)">
            <i class="far fa-minus"></i>
          </button>
        </div>
      </li>
    </ul>

    <div class="total-points">
      <span class="total-points-label">Total points: </span>
      <span class="total-points-value" :class="{ red: totalPoints < 0, green: totalPoints >= 0 }">
        {{ totalPoints }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import * as XLSX from 'xlsx'

// Khởi tạo các biến
const pointStep = ref(Number(localStorage.getItem('pointStep')) || 1)
const newPlayerName = ref('')
const players = ref(loadPlayers())
// Tính tổng điểm của tất cả người chơi
const totalPoints = computed(() => {
  return players.value.reduce((sum, player) => sum + player.points, 0)
})

// Hàm lưu dữ liệu vào localStorage
const savePlayers = () => {
  localStorage.setItem('players', JSON.stringify(players.value))
}

// Cập nhật giá trị pointStep vào localStorage
const updatePointStep = (value) => {
  pointStep.value = value
  localStorage.setItem('pointStep', value)
}

// Hàm tải người chơi từ localStorage
function loadPlayers() {
  const savedPlayers = localStorage.getItem('players')
  return savedPlayers ? JSON.parse(savedPlayers) : []
}

// Thêm người chơi
const addPlayer = () => {
  if (newPlayerName.value.trim()) {
    players.value.push({ name: newPlayerName.value, points: 0 })
    newPlayerName.value = '' // Reset input
    savePlayers()
  }
}

// Cộng điểm
const addPoints = (index) => {
  players.value[index].points += pointStep.value
  savePlayers()
}

// Trừ điểm
const subtractPoints = (index) => {
  players.value[index].points -= pointStep.value
  savePlayers()
}

// Xóa một người chơi
const deletePlayer = (index) => {
  const password = prompt(`Để xóa người chơi "${players.value[index].name}", vui lòng nhập mật mã:`)

  if (password == '2001') {
    players.value.splice(index, 1) // Xóa người chơi tại vị trí index
    savePlayers()
    alert(`Người chơi "${players.value[index].name}" đã bị xóa thành công.`)
  } else {
    alert('Mật mã không chính xác! Không thể xóa người chơi.')
  }
}

// Reset toàn bộ game
const resetGame = () => {
  const password = prompt('Để reset toàn bộ game, vui lòng nhập mật mã:')
  if (password === '2001') {
    const confirmReset = window.confirm(
      'Bạn có chắc chắn muốn reset toàn bộ game? Tất cả người chơi sẽ bị xóa.',
    )
    if (confirmReset) {
      players.value = [] // Xóa toàn bộ danh sách
      savePlayers()
      updatePointStep(1)
      alert('Game đã được reset thành công.')
    }
  } else {
    alert('Mật mã không chính xác! Không thể reset game.')
  }
}

// Xuất dữ liệu người chơi ra file Excel
const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(
    players.value.map((player) => ({
      Name: player.name,
      Points: player.points,
    })),
  )
  const filename = 'TINH_DIEM_' + new Date().toISOString().slice(0, 10)

  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, filename)
  XLSX.writeFile(wb, filename + '.xlsx')
}

// Theo dõi biến players, mỗi khi thay đổi sẽ lưu vào localStorage
watch(players, savePlayers, { deep: true })
</script>

<style scoped>
/* Căn chỉnh tổng thể */
.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}
/* Tiêu đề */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 15px;
}

/* Khu vực cài đặt */
.settings,
.add-player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.settings input,
.add-player input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-player button {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-player button:hover {
  background-color: #45a049;
}

/* Khu vực reset game */
.reset-section {
  text-align: center;
}

.btn-reset {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-reset:hover {
  background-color: #d32f2f;
}

/* Danh sách người chơi */
.player-list {
  list-style: none;
  padding: 0;
}

.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.player-name {
  font-weight: bold;
  flex: 1;
  margin-left: 5px;
}

.player-points {
  margin-right: 20px;
  color: #555;
}

/* Nút hành động */
.btn {
  padding: 6px 12px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add {
  background-color: #007bff;
  color: white;
}

.btn-add:hover {
  background-color: #0056b3;
}

.btn-subtract {
  background-color: #e53935;
  color: white;
}

.btn-subtract:hover {
  background-color: #c62828;
}

.btn-delete {
  background-color: #ff9800;
  color: white;
}

.btn-delete:hover {
  background-color: #f57c00;
}
.btn-group {
  display: flex;
  gap: 5px;
}
.player-points-value {
  color: green;
  font-weight: bold;
  font-size: 20px;
}
.red {
  color: red;
}
.green {
  color: green;
}

.total-points {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
.total-points-label {
  margin-right: 10px;
}
.total-points-value {
  font-weight: bold;
  font-size: 20px;
}
.middle-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}
.btn-export {
  background-color: #45a049;
  color: white;
}
.mr-2 {
  margin-right: 2px;
}
</style>
