<template>
    <div class="header">
      <div class="logo">
        БЗ
      </div>
      <ul class="nav-list">
        <router-link to="/">Создание графика</router-link>
        <router-link to="/load">Готовый граф</router-link>
        <router-link to="/grpah-creater">Создать граф</router-link>
        <router-link to="/highlight">Подсветка</router-link>
      </ul>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .header{
    padding: 10px 50px;
    display: flex;
    gap: 30px;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #ffffff;
    border-bottom: 1px solid;
    z-index: 10;
  }
  .logo{
    font-weight: 800;
    font-size: 40px;
    line-height: 40px;
    font-family: 'Golos Text';
  }
  .nav-list{
    display: flex;
    gap: 30px;
    & *{
      font-size: 24px;
      line-height: 24px;
      cursor: pointer;
    }
  }
</style>