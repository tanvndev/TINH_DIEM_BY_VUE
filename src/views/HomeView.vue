<script setup></script>

<template>
  <div>
    <v-card rounded="lg">
      <v-card-title>
        <v-img :height="150" cover rounded src="/images/banner1.jpeg"></v-img>
      </v-card-title>
      <v-card-text>
        Xin chào, bạn đang xủ dụng ứng dụng được xây dựng bởi <strong>VŨ NGỌC TÂN</strong>.
      </v-card-text>
      <v-card-actions class="justify-center mb-2">
        <v-btn
          variant="outlined"
          class="btn-custom"
          rounded="xl"
          @click="$router.push({ name: 'create' })"
        >
          Tạo ván mới
        </v-btn>
        <v-btn rounded="xl" variant="tonal" class="btn-custom bg-black"> Tiếp tục </v-btn>
      </v-card-actions>
    </v-card>
    <h1>Lịch sử</h1>
    <v-row no-gutters="true">
      <v-col v-for="n in 10" :key="n" class="mb-4">
        <v-card link rounded="lg">
          <v-card-text class="card-text-custom">
            <div class="d-flex justify-space-between align-center">
              <div class="history-item">
                <h3 class="text-truncate" style="max-width: 300px">Ván chơi ngày ....</h3>
                <p class="text-truncate" style="max-width: 300px">
                  Chơi cùng với bạn Chơi cùng với bạn Chơi cùng với bạn
                </p>
                <div class="bottom-item">
                  <v-chip variant="elevated" color="primary" size="x-small"> Chip </v-chip>
                  <span>Lượt cuối cùng lúc 16:07 02/03</span>
                </div>
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
.btn-custom {
  width: 160px;
  text-transform: none;
}
h1 {
  margin-top: 20px;
  margin-bottom: 10px;
}
.card-text-custom {
  padding: 10px;
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
