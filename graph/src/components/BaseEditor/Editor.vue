<template>
  <div class="editor">
    <div class="editor__container">
      <Notify :timing="3500" :notification="notification"/>
      <codemirror  v-model="code"
                   placeholder="Please enter the code..."
                   :style="{
          width: preview ? '50%' : '100%',
          height: config?.height,
          backgroundColor: '#fff',
          color: '#333'
        }"
                   :autofocus="config?.autofocus"
                   :disabled="config?.disabled"
                   :indent-with-tab="config?.indentWithTab"
                   :tab-size="config?.tabSize"
                   :extensions="extensions"
                   @ready="handleReady"
                   @update="handleStateUpdate"

      />
      <Highlight
          v-if="preview"
          @copied="handleCopied"
          :code-raw="code"
          :code="code"
          :text="'Э-э-э ты чо бро?'"
          class="code"
          :style="{ height: config?.height, width: preview ? '50%' : '0px' }"
      />
<!--      <pre
          v-if="preview"
          class="code"
          :style="{ height: config?.height, width: preview ? '50%' : '0px' }"
      >
        {{ code }}
      </pre>-->
    </div>
    <div class="divider"></div>
    <div class="editor-footer">
      <button class=""  @click="togglePreview">Preview</button>
      <div class="infos">
        <span class="item">Spaces: {{ config?.tabSize }}</span>
        <span class="item">Length: {{ state.length }}</span>
        <span class="item">Lines: {{ state.lines }}</span>
        <span class="item">Cursor: {{ state.cursor }}</span>
        <span class="item">Selected: {{ state.selected }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, shallowRef, watch} from "vue";

import {EditorView,ViewUpdate} from "@codemirror/view";
import { redo, undo } from '@codemirror/commands'
import {Codemirror} from "vue-codemirror";
import Highlight from "@/components/Highlight/Highlight.vue";
import Notify from "@/components/Notify/Notify.vue";
import {useNotify} from "@/hooks/useNotify";
//
const {notification, handleCopied}=useNotify();
const props=defineProps({
  config: {
    type: Object,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  theme: [Object, Array],
  language: Function,
})





const code = shallowRef(props.code)
const extensions = computed(() => {
  const result = []
  if (props.language) {
    result.push(props.language())
  }
  if (props.theme) {

    result.push(props.theme)
  }
  return result
})
const preview = shallowRef(false)
const togglePreview = () => {
  preview.value = !preview.value
}
const cmView = shallowRef()
/*const handleUndo = () => {
  undo({
    state: cmView.value!.state,
      dispatch: cmView.value!.dispatch
})
}

const handleRedo = () => {
  redo({
    state: cmView.value!.state,
      dispatch: cmView.value!.dispatch
})
}*/
const state = reactive({
  lines: null,
  cursor: null ,
  selected: null,
  length: null
})
const handleStateUpdate = (viewUpdate) => {
  // selected
  const ranges = viewUpdate.state.selection.ranges;
  state.selected=ranges.reduce((plus, range) => plus + range.to - range.from, 0);
  state.cursor=ranges[0].anchor;
  state.length = viewUpdate.state.doc.length;
  state.lines = viewUpdate.state.doc.lines;
}
onMounted(()=>{
  watch(()=>props.code,(_code)=>{
    code.value=_code;
  })
})
const handleReady = ({ view }) => {
  cmView.value = view
  console.log(cmView.value);
}


</script>

<style lang="scss" scoped>
  .editor{
    &__container{
      position: relative;
      display: flex;
      width: 100%;
      .code {
        width: 30%;
        height: 100px;
        margin: 0;
        padding: 0.4em;
        overflow: scroll;
        border-left: 1px solid var(--theme-border);
        font-family: monospace;
      }
    }
    .infos {
      .item {
        margin-left: 2em;
        display: inline-block;
        font-feature-settings: 'tnum';
      }
    }
  }
</style>