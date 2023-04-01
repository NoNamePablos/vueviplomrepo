<script setup>
import paper from "paper";
import {onBeforeMount, onMounted, ref,} from "vue";
import mock1 from "@/mock/mock1.js";
import {paperController} from "@/utils/papercontrols.routes";
import Ellipse from "@/paper-components/ellipse.paper";
import Process from "@/paper-components/process.paper";
import Arrow90 from "@/paper-components/arrow90.paper";
import Arrow from "@/paper-components/arrow.paper";
import Romb from "@/paper-components/romb.paper";
import Circle from "@/paper-components/cricle.paper";
import Rectangle from "@/paper-components/rectangle.paper";
import Line from "@/paper-components/line.paper";
import Loop from "@/paper-components/loop.paper";
import Hexagon from "@/paper-components/hexagon.paper";
import Text from "@/paper-components/text.paper";
import Square from "@/paper-components/square.paper";
import Triangle from "@/paper-components/triangle.paper";
  const canvas=ref(null);
  const selectedItem=ref(null);
  const dragOffset=ref(null);
  const copiedItem=ref(null);
  const logger=()=>{
    console.log(paper.project.activeLayer.children.map(item=>item.name));
  }
  const unSelected=(array)=>{
    array.forEach((item)=>item.selected=false);
  }

  const removeLast =()=>{
    const layer=paper.project.activeLayer;
    if(layer.children.length>0){
      const lastItem=layer.lastChild;
      lastItem.remove();
    }
  }
  const exportSvg=ref(null);
  const exportJson=ref(null);
  const exporterSvg=()=>{
    exportSvg.value=paper.project.exportSVG({asSting:true});
  }
  const exporterJson=()=>{
    exportJson.value=paper.project.exportJSON({asString:true});
  }

  const appendItem=(name,obj)=>{
    const center = paper.view.center;
    let projectItems= +paper.project.activeLayer.children.length;
    if(name===null||name===undefined){
      return;
    }
    if(name.toLowerCase().includes('ellipse_')){
      let shape=new Ellipse(obj);
      paper.project.activeLayer.addChild(shape.shape);
    }
    if(name.toLowerCase().includes('process_')){
      let process=new Process(obj);
      paper.project.activeLayer.addChild(process.groupItem);
    }
    if(name.toLowerCase().includes("arrow90_")){
      let arrow90=new Arrow90(obj);
      paper.project.activeLayer.addChild(arrow90.groupItem);
    }
    if(name.toLowerCase().includes("arrow_")){
      let arrow=new Arrow(obj);
      paper.project.activeLayer.addChild(arrow.groupItem);
    }
    if(name.toLowerCase().includes("romb_")){
      let romb=new Romb(obj);
      paper.project.activeLayer.addChild(romb.rombItem);
    }
    if(name.toLowerCase().includes("loop_")){
      let loop=new Loop(obj);
      paper.project.activeLayer.addChild(loop.loopItem);
    }

    if(name.toLowerCase().includes("hexagon_")){
      let hexagon=new Hexagon(obj);
      paper.project.activeLayer.addChild(hexagon.hexagonItem);
    }
    if(name.toLowerCase().includes("text_")){
      let text=new Text(obj);
      paper.project.activeLayer.addChild(text.textItem);
    }


    if(name.toLowerCase().includes("circle_")){
      let cirlce=new Circle(obj);
      paper.project.activeLayer.addChild(cirlce.circleItem);
    }
    if(name.toLowerCase().includes("rectangle_")){
      let rect=new Rectangle(obj);
      paper.project.activeLayer.addChild(rect.rectangleItem);
    }
    if(name.toLowerCase().includes("triangle_")){
      let rect=new Triangle(obj);
      paper.project.activeLayer.addChild(rect.triangleItem);
    }
    if(name.toLowerCase().includes("square_")){
      let rect=new Square(obj);
      paper.project.activeLayer.addChild(rect.squareItem);
    }

    if(name.toLowerCase().includes("line_")){
      let line = new Line(obj);
      paper.project.activeLayer.addChild(line.lineItem);
    }
  }
  const bufferItem=ref(null)
  const onMouseDown=(event)=>{
      let hitResult = paper.project.hitTest(event.point);
      if (hitResult && hitResult.item) {
        selectedItem.value = hitResult.item;
        selectedItem.value.selected=true;
        bufferItem.value = hitResult.item;
        bufferItem.value.selected=true;
        dragOffset.value = event.point.subtract(selectedItem.value.position);
      }

  }
  function onKeyDown(event) {
    console.log("11");
    if (event.key == 'delete') {
        const layer=selectedItem.value?.parent;
        if(layer instanceof paper.Layer){
          const deleteName=selectedItem.value?.name;
          layer.children.map((item)=>{
            if(item?.name===deleteName){
              item.remove()
            }
          })
        }else{
          selectedItem.value.parent.remove();
        }
    }
    if (event.key === 'c' && event.modifiers.control && bufferItem.value) {
      if (bufferItem.value){
        if(bufferItem.value.name!=null||bufferItem.value.name!==undefined){
          copiedItem.value = bufferItem.value.clone();
          copiedItem.value.visible=false;
          const substring = bufferItem.value.name.slice(0, bufferItem.value.name.toString().length);
          copiedItem.value.name=substring;
        }else{
          copiedItem.value = bufferItem.value.parent.clone();
          copiedItem.value.visible=false;
          const substring = bufferItem.value.parent.name.slice(0, bufferItem.value.parent.name.toString().length);
          copiedItem.value.name=substring;
        }

      }
    }else if(event.key === 'v' && event.modifiers.control && copiedItem.value){
      appendItem(copiedItem.value.name,copiedItem.value);
      copiedItem.value.visible=true;
    }
  }

  const scene=ref(null);
  const loadForEdit=()=>{
    let scense=paper.project.importJSON(mock1);
    let importedItems =  paper.project.activeLayer.children.slice();
    paper.project.activeLayer.children=null;
    let newLayer=new paper.Layer();
    paper.project.addLayer(newLayer);
    newLayer.activate();
    importedItems.forEach((item)=>{
       appendItem(item.name,item);
    })
  }
  const onMouseUp=(event)=>{
    if(selectedItem.value){
      if(selectedItem.value.parent instanceof paper.Group){
        let parent=selectedItem.value.parent;
        unSelected(parent.children);
      }
      selectedItem.value.selected = false;
      selectedItem.value = null;
    }
  }
  onBeforeMount(()=>{

  })

  onMounted(()=>{
    paper.setup(canvas.value);
    paper.view.onMouseDown=onMouseDown;
    paper.view.onMouseUp=onMouseUp;
    paper.view.onKeyDown=onKeyDown;
    paper.view.draw();
  })
</script>

<template>
  <div class="paper-wrapper">
    <div class="paper__controller">
      <div class="paper__controller_figures">
        <button class="paper-button" v-for="(paperItem) of paperController" :key="paperItem.id"  @click="appendItem(paperItem.sub_name,null)">
          <span> {{paperItem.name}}</span>
          <component :is=" paperItem.component"></component>
        </button>
      </div>
      <div class="paper__controller_settings">
        <button class="paper-button paper-button_controller button-active" @click="removeLast">Clear last</button>
        <button  class="paper-button paper-button_controller button-active" @click="exporterSvg">Export SVG</button>
        <button  class="paper-button paper-button_controller button-active"  @click="exporterJson">Export JSON</button>
        <button  class="paper-button paper-button_controller button-active" @click="loadForEdit">Import JSON</button>
        <button  class="paper-button paper-button_controller button-active" @click="logger">logger</button>
      </div>
      <div class="content">
        <textarea :value="exportSvg" v-if="exportSvg!==null"/>
        <textarea :value="exportJson" v-if="exportJson!==null"/>
      </div>
    </div>
    <canvas ref='canvas' width="1000" height="600" v-paper></canvas>
  </div>
</template>

<style lang="scss" scoped>
  .paper-button{
    outline: none;
    border: none;
    appearance: none;
    background: rgba(1,1,1,0);
    padding: 5px;
    font-size: 10px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    border:1px solid rgba(1,1,1,0);
    & span{
      font-weight: 600;
    }
    &:hover{
      border:1px solid #2d69e8;
    }
    &_controller{
      font-weight: 700!important;
      color: #fff;
      background-color: #2d69e8;
      border-radius: 0.25rem!important;
    }
  }
  .paper__controller{
    padding: 20px 10px;
    background-color: #FFFFFF;
    border-right: 1px solid #181818;
    max-width: 200px;
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 20px;
    &_figures{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 15px;
    }
    &_settings{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 20px;
      grid-auto-rows:minmax(30px,max-content);
    }
  }
  .paper-wrapper{
    display: flex;
    gap: 25px;
    & canvas{
      position: relative;
      margin-top: 100px;
      border:1px solid black;
      flex: 1;
    }
  }
  .content{
    & textarea{
      max-height: 200px;
      resize: vertical;
    }
  }
  button.button-active{
    background-color: #2d69e8;
    color: white;
    transition: all 0.3s cubic-bezier(.26,.88,.82,.19);
  }
  button.button-active:hover {
    background-color: #0d3383;
  }
  button.button-active:focus,
  button.button-active:focus-visible{
    background-color: #0d3383;
    -webkit-box-shadow: inset 0 0 0 1px #0d3383;
    box-shadow: inset 0 0 0 2px #0d3383;
  }

</style>
