<template>
  <div class="notify-container">
    <transition-group name="notify" tag="div">
      <div class="notify-item" v-for="(ntf,idx) in notification" :key="idx">
        {{ntf}}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import {ref, shallowRef, watch} from "vue";
  const props=defineProps({
    notification:{
      type:Array,
      required:true,
    },
    timing:{
      type:Number,
      required:false,
      default:3000
    }
  })

const notification = shallowRef(props.notification)
watch(()=>props.notification,(_ntf)=>{
  setTimeout(()=>{
    notification.value.pop();
  },props.timing)
},{deep:true})

</script>

<style lang="scss" scoped>
.notify-container{
  position:  absolute;
  right: 0;
  z-index: 10;
  top: 0;
}
.notify-item{
  padding: 15px 20px;
  background-color: #5470c6;
  color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  white-space: nowrap;
}

.notify-enter-active,
.notify-leave-active {
  transition: all 0.5s ease;
}
.notify-enter-from,
.notify-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>