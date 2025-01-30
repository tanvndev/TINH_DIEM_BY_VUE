<template>
    <canvas ref="canvas" class="flower-canvas"></canvas>
  </template>

  <script setup>
  import { onMounted, ref, onBeforeUnmount } from "vue";

  const canvas = ref(null);
  let ctx = null;
  let flowers = [];
  const flowerCount = 40; // Số lượng hoa

  // Hàm tạo hoa đào
  const createFlower = () => {
    const size = Math.random() * 1 + 8; // Kích thước ngẫu nhiên của hoa (giới hạn từ 10 đến 25)
    const speed = Math.random() * 1 + 0.5; // Tốc độ rơi
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return { x, y, size, speed };
  };

  // Vẽ hoa đào
  const drawFlowers = () => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

    // Vẽ mỗi hoa đào
    flowers.forEach(flower => {
      const x = flower.x;
      const y = flower.y;
      const size = flower.size;

      ctx.font = `${size}px Arial`; // Thiết lập kích thước hoa nhỏ hơn
      ctx.fillStyle = "pink"; // Màu hoa đào

      ctx.fillText("🌸", x, y); // Vẽ emoji hoa đào

      // Cập nhật vị trí hoa đào
      flower.y += flower.speed;
      if (flower.y > window.innerHeight) {
        flower.y = -flower.size; // Đưa hoa lên trên cùng
        flower.x = Math.random() * window.innerWidth; // Random hóa vị trí x
      }
    });
  };

  // Khởi tạo hoa đào
  const initFlowers = () => {
    flowers = [];
    for (let i = 0; i < flowerCount; i++) {
      flowers.push(createFlower());
    }
  };

  // Chạy hiệu ứng hoa đào
  const animate = () => {
    drawFlowers();
    requestAnimationFrame(animate);
  };

  // Điều chỉnh kích thước canvas khi thay đổi kích thước cửa sổ
  const resizeCanvas = () => {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
  };

  onMounted(() => {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    ctx = canvas.value.getContext("2d");

    initFlowers();
    animate();
    window.addEventListener("resize", resizeCanvas);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeCanvas);
  });
  </script>

  <style scoped>
  .flower-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
  }
  </style>
