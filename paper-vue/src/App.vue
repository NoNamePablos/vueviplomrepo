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
      name:'hexagon',
      icon:'',
    },
    {
      id:6,
      name:'loop',
      icon:'',
    },
    {
      id:7,
      name:'romb',
      icon:'',
    },
    {
      id:8,
      name:'arrow',
      icon:'',

    },
    {
      id:9,
      name:'process',
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
    if(name==='process'){
      // Создаем первый прямоугольник
      let rect1 = new paper.Path.Rectangle({
        point: [50, 50],
        size: [100, 50],
        fillColor: 'white',
        strokeColor:'black',
        strokeWidth:2,
      });
      // Создаем второй, меньший прямоугольник
      let rect2 = new paper.Path.Rectangle({
        point: [65, 50],
        size: [70, 50],
        fillColor: 'white',
        strokeColor:'black',
        strokeWidth:2,
      });
      // Создаем группу из двух прямоугольников
      let group = new paper.Group([rect1, rect2]);
      group.position=paper.view.center;
      group.onMouseDrag=(event)=>{
        if(paper.Key.isDown('shift')){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {
            group.scale(1/scale);

          }else if (delta.x > 0 && delta.y > 0) {
            // движение мыши вниз-вправо, увеличиваем элемент
              group.scale(scale);
          }
        }
          group.position = event.point.subtract(dragOffset);
      }
      // Добавляем его на холст
      paper.project.activeLayer.addChild(group);
    }
    if(name==='arrow'){
      let startPoint = new paper.Point(20, 20);
      let endPoint = new paper.Point(80, 80);
      let arrowVector = endPoint.subtract(startPoint);
      let arrowSize = 60;
      arrowVector.length -= arrowSize;

// Создаем линию между начальной и конечной точками
      let line = new paper.Path.Line(startPoint, endPoint);
      line.strokeColor = 'black';
      line.strokeWidth = 2;

// Создаем стрелку
      let arrow = new paper.Path([
        endPoint,
        endPoint.add(arrowVector.rotate(135)),
        endPoint,
        endPoint.add(arrowVector.rotate(-135))
      ]);
      arrow.fillColor = 'black';
      arrow.strokeColor = 'black';
      arrow.strokeWidth = 2;

// Добавляем линию и стрелку на сцену
      let group=new paper.Group([arrow,line]);

      group.position=paper.view.center;
      group.onMouseUp=(event)=>{
        closestSegment.value=null;
        segemntIndex.value=null;
      }
      group.onMouseDown=(event)=>{
        console.log("ffff: ",group.firstChild);
        const segmentDistances = group.firstChild.segments.map(segment => {
          const distance = segment.point.getDistance(event.point);
          return distance;
        });
        const closestSegmentIndex = segmentDistances.indexOf(Math.min(...segmentDistances));
        const closestSegment1 = group.firstChild.segments[closestSegmentIndex]
        if(event.point.getDistance(closestSegment1.point) <= 10){
          closestSegment.value=closestSegment1;
          segemntIndex.value=closestSegmentIndex;
        }
      }

      group.onMouseMove = function(event) {
        let delta = event.delta;
        let direction = delta.normalize();

        if (group.bounds.intersects(event.point)) {
          if (direction.y > 0) {
            group.position.y += delta.length;
          } else if (direction.y < 0) {
            group.position.y -= delta.length;
          }
        }
      }
      group.onMouseDrag=(event)=>{
        if(paper.Key.isDown('shift')){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {
            group.scale(1/scale);

          }else if (delta.x > 0 && delta.y > 0) {
            // движение мыши вниз-вправо, увеличиваем элемент
            group.scale(scale);
          }
        }
        /*group.position = event.point.subtract(dragOffset);*/
      }

      paper.project.activeLayer.addChild(group);


    }
    if(name==='romb'){
      let points2= [
        new paper.Point(100, 100),
         new paper.Point(150, 50),
         new paper.Point(200, 100),
        new  paper.Point(150, 150),
      ];
      let romb = new paper.Path({
        segments: points2,
        closed:true,
        strokeColor:'black',
        fillColor:"white",
        strokeWidth:3,
      });
      romb.position=paper.view.center;
      romb.onMouseDrag=(event)=>{
        if(paper.Key.isDown('shift')){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {

            romb.scale(1/scale);

          }else if (delta.x > 0 && delta.y > 0) {
            // движение мыши вниз-вправо, увеличиваем элемент
            romb.scale(scale);

          }
        }else{
          romb.position = event.point.subtract(dragOffset);
        }
      }
      paper.project.activeLayer.addChild(romb);
    }
    if(name==='loop'){
      let points1= [
        new paper.Point(0, 0),
        new paper.Point(-100, 0),
        new paper.Point(-100, -75),
        new paper.Point(0,-100),
        new paper.Point(100,-75),
        new paper.Point(100,0),
        new paper.Point(-100,0),
      ];
      // Создаем путь из точек
      let loop = new paper.Path({
        segments: points1,

        strokeColor:'black',
        fillColor:"white",
        strokeWidth:3,
      });
      loop.position=paper.view.center;
      loop.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);

        if (selectedItem.value){
          loop.position = event.point.subtract(dragOffset);
        }
      }

      paper.project.activeLayer.addChild(loop);
    }
    if(name==='hexagon'){
      let points = [
        new paper.Point(0, 0),
        new paper.Point(100, 0),
        new paper.Point(150, 75),
        new paper.Point(100, 150),
        new paper.Point(0, 150),
        new paper.Point(-50, 75)
      ];
      // Создаем путь из точек
      let hexagon = new paper.Path({
        center:center,
        segments: points,
        closed: true,
        strokeColor:'black',
        fillColor:"white",
        strokeWidth:2,
      });

      hexagon.onMouseDrag=(event)=>{
        if (selectedItem.value){
          hexagon.position = event.point.subtract(dragOffset);
        }
      }

      paper.project.activeLayer.addChild(hexagon);
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
    let hitResult = paper.project.hitTest(event.point);
    if (hitResult && hitResult.item) {
      selectedItem.value = hitResult.item;
      selectedItem.value.selected=true;
      console.log("selected item: ",selectedItem.value);
      dragOffset.value = event.point.subtract(selectedItem.value.position);

    }
  }
  const onMouseDrag=(event)=>{
   /* if(paper.Key.isDown('shift')){
      let scale =1.1;
      let delta = event.delta;
      if (delta.x < 0 && delta.y < 0) {
        if(selectedItem.value.parent instanceof paper.Group){
          selectedItem.value.parent.scale(1/scale);
        }
        else{
          selectedItem.value.scale(1/scale);
        }

      }else if (delta.x > 0 && delta.y > 0) {
        // движение мыши вниз-вправо, увеличиваем элемент
        if(selectedItem.value.parent instanceof paper.Group)
        {
          selectedItem.value.parent.scale(scale);
        }
        else
        {
          selectedItem.value.scale(scale);
        }
      }
    }*/
  }
  const onMouseUp=(event)=>{
    if(selectedItem.value){
      if(selectedItem.value.parent instanceof paper.Group){
        let parent=selectedItem.value.parent;
        console.log("parent: ",parent);
        unSelected(parent.children);
        console.log("parent children: ",parent.children);
      }
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
