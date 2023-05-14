<template>
  <div  class="experemental-list">
    <!--    -->
    <experement-result-item :block="block"  v-for="block in blocks" :key="block.id"/>
  </div>
</template>

<script setup>
import ExperementResultItem from "@/components/ExperementalComponents/ExperementResultItem.vue";

const props=defineProps({
  blocks:{
    type:Array,
    required:true,
  }
})


</script>

<style lang="scss" scoped>

</style>