<template>
    <div class="wrap">
        <h1>Создание схемы</h1>
        <canvas ref="canvasRef" v-paper=""></canvas>
    </div>
</template>

<script setup>
import paper from 'paper';
  import {onMounted, onUnmounted, ref,} from "vue";
  const canvasRef=ref(null);

const handleMouseDown = (event) => {
  const item = event.item;
  if (item) {
    item.data.dragging = true;
    item.data.offset = event.point.subtract(item.position);
  }
};

const handleMouseUp = (event) => {
  const item = event.item;
  if (item) {
    item.data.dragging = false;
  }
};

const handleMouseMove = (event) => {
  const item = event.item;
  if (item && item.data.dragging) {
    item.position = event.point.subtract(item.data.offset);
  }
};


onMounted(() => {
  const canvas = canvasRef.value;
  paper.setup(canvas);

  // Create a circle
  const circle = new paper.Path.Circle(new paper.Point(100, 100), 50);
  circle.fillColor = 'red';
  circle.data.dragging = false;

  // Create a rectangle
  const rectangle = new paper.Path.Rectangle(new paper.Point(200, 200), new paper.Size(100, 100));
  rectangle.fillColor = 'blue';
  rectangle.data.dragging = false;

  // Attach mouse event handlers to the canvas
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mousemove', handleMouseMove);
  return {
    canvasRef,
  };
  })
onUnmounted(() => {
  const canvas = canvasRef.value;
  canvas.removeEventListener('mousedown', handleMouseDown);
  canvas.removeEventListener('mouseup', handleMouseUp);
  canvas.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style lang="scss" scoped>
.wrap{
  margin-top: 80px;
}

</style>