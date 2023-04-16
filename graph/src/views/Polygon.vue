<script setup>

import {ref, computed, toRaw, onMounted} from "vue";
import BaseLayout from "@/components/BaseLayout.vue";
import Form from "@/components/ui/BaseForm.vue";
import TabContainer from "@/components/Tabs2.0/TabContainer.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
const tabs=ref([{
  name:"Tab1",
  content:"Tab1"
},{
  name:"Tab2",
  content:"Tab2"
},{
  name:"Tab3",
  content:"Tab3"
}])

const selectedTab=ref(tabs.value[0].name);
const changeTab=(tabId)=>{
  const tabIndex=tabs.value.find((item)=>item.name===tabId);
  selectedTab.value=tabIndex.name;
}


</script>

<template>
  <BaseLayout style="margin-top:200px;">
      <TabContainer v-if="selectedTab" :horizontal="false">
        <template #n-button>
          <base-button :classes="['button-select',{'active':selectedTab===tab.name}]" v-for="tab in tabs" :key="tab.name" @click="changeTab(tab.name)">{{tab.name}}</base-button>
        </template>
        <template #n-list>
          <div v-for="tab in tabs" :key="tab.name" v-show="tab.name===selectedTab">
            {{tab.content}}
          </div>
        </template>
      </TabContainer>

  </BaseLayout>
</template>

<style lang="scss" scoped>

</style>
