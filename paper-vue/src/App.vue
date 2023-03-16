<script setup>
import paper, {Group} from "paper";
  import {onMounted, ref} from "vue";
  import loopItemGroup from "@/items";
  const canvas=ref(null);
  const selectedItem=ref(null);
  const dragOffset=ref(null);
  const isSelectedGroup=ref(false);
  const selectedGroupItem=ref([]);
  const selectGroup=(item)=>{
    if(item.parent instanceof paper.Group){
      console.log("dddd: ",item);
      let children=item.parent.children;
      paper.project.deselectAll();
      children.forEach((el)=>{
        el.selected=true;
        selectedGroupItem.value.push(el);
        isSelectedGroup.value=true;
      })
      console.log(selectedGroupItem.value);
    }
  }
  const unSelected=(array)=>{
    array.forEach((item)=>item.selected=false);
  }
  const paperController=[{
    id:1,
    name:"circle",
    icon:'',
  },
    {
    id:2,
    name:"rectangle",
    icon:'',
  },
    {
    id:3,
    name:"line",
    icon:'',
  },{
    id:4,
      name:'text',
      icon:'',
    },{
    id:5,
      name:'loop',
      icon:'',
    }
    ]

  const removeLast =()=>{
    const layer=paper.project.activeLayer;
    if(layer.children.length>0){
      const lastItem=layer.lastChild;
      lastItem.remove();
    }
  }
  const closestSegment=ref(null);
  const segemntIndex=ref(null);

  const exportSvg=ref(null);
  const exportJson=ref(null);
  const exporterSvg=()=>{
    exportSvg.value=paper.project.exportSVG({asSting:true});
  }
  const exporterJson=()=>{
    exportJson.value=paper.project.exportJSON({asString:true});
  }

  const appendItem=(id)=>{
    const index=paperController.findIndex((item)=>item.id===id);
    const name=paperController[index].name;
    const center = paper.view.center;
    if(name==='loop'){
      /*var points = [
        new paper.Point(0, 0),
        new paper.Point(100, 0),
        new paper.Point(150, 75),
        new paper.Point(100, 150),
        new paper.Point(0, 150),
        new paper.Point(-50, 75)
      ];

// Создаем путь из точек
      var hexagon = new paper.Path({
        center:center,
        segments: points,
        closed: true,
        strokeColor:'black',
        strokeWidth:2,
      });
      var decagon = new paper.Path.RegularPolygon(new paper.Point(200, 50),5, 50);
      decagon.fillColor = '#e9e9ff';
      decagon.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if (selectedItem.value){
          decagon.position = event.point.subtract(dragOffset);
        }
      }*/
      var rectangle = new paper.Path.Rectangle({
        point: [50, 100], // начальная точка
        size: [100, 50], // размер
        fillColor: 'red' // цвет заливки
      });

// Создаем трапецию сверху
      var trapezoid = new paper.Path({
        segments: [
          [75, 50], // верхняя левая точка
          [125, 50], // верхняя правая точка
          [150, 100], // нижняя правая точка
          [50, 100] // нижняя левая точка
        ],
        fillColor: 'blue' // цвет заливки
      });

// Группируем оба объекта
      var group = new paper.Group([rectangle, trapezoid]);

      group.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if (selectedItem.value){
          group.position = event.point.subtract(dragOffset);
        }
      }

      /*group.onMouseUp=(event)=>{
        console.log("unselected");
        selectedGroupItem.value=[];
        isSelectedGroup.value=false;
      }*/
      /*paper.project.activeLayer.addChild(loopItemGroup());*/
      paper.project.activeLayer.addChild(group);
    }
    if(name==='text'){
      let text=new paper.PointText({
        point:center,
        content:"Text",
        justification: 'center',
        fontSize:20,
        fillColor:'black'
      })
      text.onDoubleClick=(event)=>{
          let textInput=document.createElement('input');
          textInput.type = 'text';
          textInput.style.position = 'absolute';
          textInput.style.top = event.point.y + 'px';
          textInput.style.left = event.point.x + 'px';
          textInput.style.width = '200px';
          textInput.style.height = '20px';
          textInput.style.border = '1px solid black';
          textInput.style.fontFamily = 'Arial';
          textInput.style.fontSize = '20px';
          textInput.style.fontWeight = 'bold';
          textInput.style.padding = '5px';
          textInput.value = text.content;
          document.body.appendChild(textInput);
          textInput.onkeypress=(event)=>{
          if(event.key==='Enter'){
            text.content=textInput.value;
            textInput.remove();
          }
        }

      }
      text.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if (selectedItem.value){
          text.position = event.point.subtract(dragOffset);
        }
      }
      paper.project.activeLayer.addChild(text);
    }
    if(name==='circle'){
      let circle=new paper.Path.Circle({
        center: center,
        radius: 50,
        fillColor: 'green',
      });
      circle.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if (selectedItem.value){
          circle.position = event.point.subtract(dragOffset);
        }
      }
      paper.project.activeLayer.addChild(circle);
    }
    if(name==='rectangle'){
      // создаем новый прямоугольник
      const rect = new paper.Path.Rectangle({
        point: center,  // начальная точка
        size: [100, 50],  // ширина и высота
        fillColor: 'red'
      });
      rect.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if (selectedItem.value){
          rect.position = event.point.subtract(dragOffset);
        }
      }
      paper.project.activeLayer.addChild(rect);

    }
    if(name==='line'){
      // создаем новую линию
      const line = new paper.Path.Line({
        from: [200, 100],  // начальная точка
        to: [300, 50],     // конечная точка
        strokeColor: 'blue',
        strokeWidth: 3
      });
      line.onMouseUp=(event)=>{
        closestSegment.value=null;
        segemntIndex.value=null;
      }
      line.sendToBack();
      line.onMouseDrag=(event)=>{
        //2варик
        if(closestSegment.value){
          closestSegment.value.point=event.point;
          line.smooth();
        }else{
          line.position = event.point.subtract(dragOffset);
        }

      }
      line.onMouseDown =(event)=>{
        const segmentDistances = line.segments.map(segment => {
          const distance = segment.point.getDistance(event.point);
          return distance;
        });
        const closestSegmentIndex = segmentDistances.indexOf(Math.min(...segmentDistances));
        const closestSegment1 = line.segments[closestSegmentIndex]
        if(event.point.getDistance(closestSegment1.point) <= 10){
          closestSegment.value=closestSegment1;
          segemntIndex.value=closestSegmentIndex;
        }
        dragOffset.value = event.point.subtract(line.position);
      }
      paper.project.activeLayer.addChild(line);
    }
  }
  const onMouseDown=(event)=>{
    console.log("ev: ",event);
    var hitResult = paper.project.hitTest(event.point);
    if(hitResult&&hitResult.item){
      /*if(paper.Key.isDown('Delete')){
        hitResult.item.remove();
      }*/

      console.log("htr: ",hitResult);
    }
    if (hitResult && hitResult.item) {
      selectedItem.value = hitResult.item;
      selectedItem.value.selected=true;
      dragOffset.value = event.point.subtract(selectedItem.position);

    }
  }
  const onMouseDrag=(event)=>{
    if(paper.Key.isDown('shift')){
      var scale =1.1;
      var delta = event.delta;
      if (delta.x < 0 && delta.y < 0) {
        selectedItem.value.scale(1/scale);
      }else if (delta.x > 0 && delta.y > 0) {
        // движение мыши вниз-вправо, увеличиваем элемент
          selectedItem.value.scale(scale);

      }
    }
  }
  const onMouseUp=(event)=>{
    if(selectedItem.value){
      selectedItem.value.selected = false;
      selectedItem.value = null;
      segemntIndex.value=null;
      closestSegment.value=null;
    }
  }
  onMounted(()=>{
    paper.setup(canvas.value);
    paper.view.onMouseDown=onMouseDown;
    paper.view.onMouseDrag=onMouseDrag;
    paper.view.onMouseUp=onMouseUp;
    paper.view.draw();

  })
</script>

<template>
  <div class="paper-wrapper">
    <div class="paper__controller">
      <button v-for="(paperItem) of paperController" :key="paperItem.id"  @click="appendItem(paperItem.id)">{{paperItem.name}}</button>
      <button @click="removeLast">Clear last</button>
      <button @click="exporterSvg">Export SVG</button>
      <button @click="exporterJson">Export JSON</button>
      <div class="content">
        <textarea :value="exportSvg" v-if="exportSvg!==null"/>
        <textarea :value="exportJson" v-if="exportJson!==null"/>
      </div>
    </div>
    <canvas ref='canvas' width="1000" height="600" v-paper></canvas>
  </div>
</template>

<style lang="scss" scoped>
  .paper-wrapper{
    display: flex;
    gap: 50px;
    & canvas{
      position: relative;
      margin-top: 100px;
      border:1px solid black;
    }
  }
  .content{
    & textarea{
      max-height: 200px;
      resize: vertical;
    }
  }
</style>
