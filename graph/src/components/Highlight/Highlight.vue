<template>
  <div class="highlight" >
    <div class="highlight-control">
      <base-button :classes="['button-select']" @click="copyClickboard(codeRaw)">
        <svg xmlns="http://www.w3.org/2000/svg"  height="22px" version="1.1" viewBox="0 0 21 22" width="21px">
          <title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
          <g fill="#000000" id="Core" transform="translate(-86.000000, -127.000000)">
            <g id="content-copy" transform="translate(86.500000, 127.000000)">
              <path d="M14,0 L2,0 C0.9,0 0,0.9 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 L14,0 Z M17,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 C4,21.1 4.9,22 6,22 L17,22 C18.1,22 19,21.1 19,20 L19,6 C19,4.9 18.1,4 17,4 L17,4 Z M17,20 L6,20 L6,6 L17,6 L17,20 L17,20 Z" id="Shape"/></g>
          </g>
        </g>
        </svg>
      </base-button>
    </div>
    <div class="code-highlight" :style="{maxHeight:maxHeightCss,fontSize:'10px'}">
      <pre>
        <code v-html="code"></code>
      </pre>
    </div>
  </div>
</template>

<script setup>
import {onMounted, shallowRef, watch} from "vue";
    const props=defineProps({
      code:{
        type:String,
        required:true,
      },
      codeRaw:{
        type:String,
        required:true,
      },
      text:{
        type:String,
        required:false,
        default:'Код скопирован!'
      },
      maxHeightCss:{
        type:String,
        required:false,
        default:'500px',
      }

    })
const emits=defineEmits(['copied'])
const copyClickboard=(code)=>{
  navigator.clipboard.writeText(code);
  emits('copied',{text:props.text})
  /* appendNotify(Text);*/
}
  const code = shallowRef(props.code)
  onMounted(()=>{
    watch(()=>props.code,(_code)=>{
      code.value=_code;
    })

  })
</script>

<style lang="scss" scoped>
.highlight{
  position: relative;
  &:hover{
    & .highlight-control{
      display: block;
    }
  }
  &-control{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    width: calc(100% - 8px);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: none;
    padding: 10px 20px;
    background-color: rgb(36 35 35 / 25%);

  }
}
.code-highlight{
  background: white;
  border: 1px solid #ddd;
  padding: 15px 10px;
  border-radius: 6px;
  max-height: 500px;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background:#ddd;
    border-radius: 12px;
    cursor: pointer;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: var(--color-accent-2);
    border-radius: 12px;
    cursor: pointer;

  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #0073f7;
    cursor: pointer;

  }
}
</style>