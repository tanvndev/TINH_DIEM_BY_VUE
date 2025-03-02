<script setup>
import AppBarComponent from '@/components/AppBarComponent.vue'
import { ref } from 'vue'

const bookmaker = ref('')
const players = ref([''])
const point = ref(0)
const name = ref('')
const form = ref(null)
const snackbar = ref(false)
const snackbarText = ref('')
const addPlayer = () => players.value.push('')

const validate = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return 'Có lỗi vui lòng thử lại.'

  const invalidPlayer = players.value.some((player) => !player || player.trim() === '')
  if (invalidPlayer) return 'Vui lòng nhập tên người chơi.'

  if (point.value < 1 || point.value > 100) return 'Điểm phải lớn hơn 1 và nhỏ hơn 100.'

  return ''
}

const createGame = async () => {
  const error = await validate()

  if (error) {
    snackbarText.value = error
    snackbar.value = true
    return
  }

  alert('Create game')
}
</script>

<template>
  <div>
    <AppBarComponent title="Tạo ván mới" />
    <div class="heading">Danh sách người chơi ({{ players.length }})</div>
    <v-form @submit.prevent ref="form">
      <v-snackbar :timeout="3000" class="elevation-24" color="#6B0000" v-model="snackbar">
        <span>{{ snackbarText }}</span>
      </v-snackbar>
      <v-card rounded="lg">
        <v-card-text>
          <div
            v-for="(player, index) in players"
            :key="index"
            class="d-flex justify-space-between align-center"
          >
            <v-text-field
              variant="underlined"
              clearable
              v-model="players[index]"
              label="Tên người chơi"
              required
            ></v-text-field>

            <v-btn
              v-if="index > 1"
              rounded
              variant="text"
              icon="mdi-trash-can-outline"
              size="small"
              @click="players.splice(index, 1)"
            >
            </v-btn>
          </div>

          <v-card-actions class="justify-center">
            <v-btn class="btn-custom bg-black" rounded @click="addPlayer">Thêm người chơi</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>

      <!--  -->
      <div v-if="players.length > 1">
        <div class="heading mt-5">Nhà cái</div>
        <v-card rounded="lg">
          <v-card-text class="p-10">
            <v-chip-group v-model="bookmaker" required column selected-class="text-primary">
              <div v-for="player in players" :key="`bookmaker_${player}`">
                <v-chip
                  :text="player"
                  variant="outlined"
                  filter
                  rounded="xs"
                  v-if="player"
                ></v-chip>
              </div>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </div>

      <!--  -->
      <div class="heading mt-5">Cấu hình điểm</div>
      <v-card rounded="lg">
        <v-card-text>
          <div class="my-4">
            <v-slider
              v-model="point"
              :max="100"
              :min="0"
              :step="5"
              show-ticks
              thumb-label
              class="align-center"
              hide-details
            >
            </v-slider>
          </div>

          <div>
            <v-text-field
              variant="underlined"
              clearable
              v-model.number="point"
              label="Điểm (Tối đa 100)"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card>
      <!--  -->

      <div class="heading mt-5">Khác</div>
      <v-card rounded="lg">
        <v-card-text>
          <div>
            <v-text-field
              variant="underlined"
              clearable
              v-model="name"
              label="Tên ván (Không bắt buộc)"
            ></v-text-field>
          </div>
        </v-card-text>
      </v-card>

      <v-card-actions class="justify-center mt-5">
        <v-btn class="btn-custom" rounded variant="outlined" @click="$router.go(-1)">Hủy</v-btn>
        <v-btn class="btn-custom bg-black" rounded @click="createGame">Bắt đầu chơi</v-btn>
      </v-card-actions>
    </v-form>
  </div>
</template>
<style scoped>
.btn-custom {
  text-transform: none;
  padding-left: 20px;
  padding-right: 20px;
}
h1 {
  margin-bottom: 10px;
}
.card-text-custom {
  padding: 10px;
  padding-bottom: 5px;
}
.history-item p {
  color: #666666;
}
.bottom-item {
  margin-top: 7px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666666;
}
</style>
