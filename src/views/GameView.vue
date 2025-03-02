<script setup>
import AppBarComponent from '@/components/AppBarComponent.vue'
import { ref } from 'vue'

const players = ref([''])
const drawer = ref(false)
const items = [
  {
    title: 'Foo',
    value: 'foo',
  },
  {
    title: 'Bar',
    value: 'bar',
  },
  {
    title: 'Fizz',
    value: 'fizz',
  },
  {
    title: 'Buzz',
    value: 'buzz',
  },
]
const handleColorPoint = (point) => {
  let color = ''
  point = Number(point)

  if (point < 0) {
    color = 'red'
  } else if (point > 0) {
    color = 'green'
  } else {
    color = ''
  }

  return color
}
</script>

<template>
  <div>
    <AppBarComponent
      title="Kéo xì dách"
      @on-click-dots-horizontal="drawer = !drawer"
      :is-show-dots-horizontal="true"
    >
      <template v-slot:dots-horizontal>
        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list :items="items"></v-list>
        </v-navigation-drawer>
      </template>
    </AppBarComponent>

    <div class="heading">Người chơi</div>
    <v-card rounded="lg">
      <v-card-text>
        <div v-for="player in 10" :key="player" class="player-item">
          <div>
            1. {{ player }}
            <v-chip variant="flat" size="x-small" color="brown" class="ml-2"> Nhà cái </v-chip>
          </div>
          <v-chip variant="flat" :color="handleColorPoint(player)"> {{ player }} </v-chip>
        </div>
      </v-card-text>
    </v-card>

    <!-- Button ghi diem -->
    <div class="button-mark">
      <v-btn class="w-100 bg-black" rounded @click="createGame">Ghi điểm</v-btn>
    </div>

    <div class="heading mt-3">Lịch sử ván</div>
    <v-row no-gutters="true">
      <v-col v-for="n in 10" :key="n" class="mb-1">
        <v-card link elevation="0" class="card-custom">
          <v-card-text class="card-text-custom">
            <div class="d-flex justify-space-between align-center">
              <div class="history-item">
                <h3 class="text-truncate" style="max-width: 300px">Ván {{ n }} ....</h3>
                <p class="text-truncate" style="max-width: 300px">
                  Chơi cùng với bạn Chơi cùng với bạn Chơi cùng với bạn
                </p>
              </div>
              <div>
                <v-icon> mdi-chevron-right </v-icon>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.button-mark{
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px;
    z-index: 99;
    margin: 0 7px;
}
.card-custom {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px !important;
  border-radius: none !important;
}

.card-text-custom {
  padding: 13px;
}
.player-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.player-item:last-child {
  margin-bottom: 0;
}
.btn-custom {
  text-transform: none;
  padding-left: 20px;
  padding-right: 20px;
}
h1 {
  margin-bottom: 10px;
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
