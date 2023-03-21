<script setup>
import paper, {Group} from "paper";
import {onBeforeMount, onMounted, ref, watch} from "vue";
  import loopItemGroup from "@/items";
  import mock from "@/../public/mock/mock.json"
import mock2 from "@/../public/mock/mock2.json"
import {paperController} from "@/utils/papercontrols.routes";
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

  const appendItem=(name,obj)=>{
    const center = paper.view.center;
    if(name===null){
      return;
    }
    if(name.toLowerCase()==='ellipse'){
      console.log("obj: ",obj);
      let shape = obj!=null?obj:new paper.Path.Ellipse({
        center: [110, 50],
        radius: [90, 30],
        fillColor: 'white',
        strokeWidth:3,
        strokeColor:'black',
        name:'ellipse'
      });
      shape.position=obj!=null?obj.position:center;
      console.log("shape: ",shape);
      shape.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if(paper.Key.isDown('delete')){
          console.log("delete clicked");
        }
        if(event.modifiers.shift){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {
            shape.scale(1/scale);
          }else if (delta.x > 0 && delta.y > 0) {
            shape.scale(scale);
          }
        }
        if (selectedItem.value){
          shape.position = event.point.subtract(dragOffset);
        }
      }
      paper.project.activeLayer.addChild(shape);
    }
    if(name.toLowerCase()==='process'){
      // Создаем первый прямоугольник
      const clone = JSON.parse(JSON.stringify(obj));
      let rect1 =clone!=null?clone.children[0]:new paper.Path.Rectangle({
        point: [50, 50],
        size: [100, 50],
        fillColor: 'white',
        strokeColor:'black',
        strokeWidth:2,
      });
      console.log("rect1 ,",rect1);
      // Создаем второй, меньший прямоугольник
      let rect2 = clone!=null?clone.children[1]:new paper.Path.Rectangle({
        point: [65, 50],
        size: [70, 50],
        fillColor: 'white',
        strokeColor:'black',
        strokeWidth:2,
      });
      console.log("rect2 ,",rect2);

      // Создаем группу из двух прямоугольников
      let group = new paper.Group([rect1, rect2]);
      group.name='process';
      group.position=obj!=null?obj.position:paper.view.center;
      console.log("group: ",group);
      console.log("poss: ",group.position);

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
    if(name.toLowerCase()==='arrow90'){
      console.log("obj: ",obj);
      let startPoint = obj!=null?obj.children[1].firstSegment.point:new paper.Point(20, 20);
      let endPoint = obj!=null?obj.children[1].lastSegment.point:new paper.Point(20, 80);
      console.log("start point ",startPoint);
      console.log("end point ",startPoint);
      /*let startPoint = new paper.Point(20, 20);
      let endPoint = new paper.Point(20, 80);*/
      let arrowVector = endPoint.subtract(startPoint);
      let arrowSize = 20;
      arrowVector.length -= arrowSize;

// Создаем линию между начальной и конечной точками
      let line = new paper.Path.Line(startPoint, endPoint);
      line.strokeColor = 'black';
      line.strokeWidth = 2;

      let closestSegmentLine=null;
      let closestSegmentIndexLine=null;

// Создаем стрелку
      let arrow = new paper.Path([
        endPoint,
        endPoint.add(arrowVector.normalize(arrowSize).rotate(135)),
        endPoint,
        endPoint.add(arrowVector.normalize(arrowSize).rotate(-135))
      ]);
      arrow.fillColor = 'black';
      arrow.strokeColor = 'black';
      arrow.strokeWidth = 2;

      const line2= obj!=null?obj.children[2]:new paper.Path.Line([80, 20], [20, 20]);
      line2.strokeColor='black';
      line2.strokeWidth=2;

// Добавляем линию и стрелку на сцену
      let group=new paper.Group([arrow,line,line2]);
      console.log("arrow: line", arrow);
      console.log("ffsdfds: ",line);
      group.name='arrow90';
      group.position=obj!=null?obj.position:paper.view.center;
      group.onMouseUp=(event)=>{
        closestSegment.value=null;
        segemntIndex.value=null;
        closestSegmentLine=null;
        closestSegmentIndexLine=null;
      }
      group.onMouseDown=(event)=>{
        const arrowPath = group.children[0]; // первый элемент группы - наконечник стрелки
        const arrowPoint = arrowPath.segments[0].point; // первая точка наконечника
        const distanceToArrow=event.point.getDistance(arrowPoint);
        const line=group.children[group.children.length-1];
        const segmentDistancesLine = line.segments.map(segment => {
          const distance = segment.point.getDistance(event.point);
          return distance;
        });
        const closestSegmentIndexArrowLine = segmentDistancesLine.indexOf(Math.min(...segmentDistancesLine));
        const closestSegmentLineArrow = line.segments[closestSegmentIndexArrowLine]
        if(event.point.getDistance(closestSegmentLineArrow.point) <= 10){
          closestSegmentLine=closestSegmentLineArrow;
          closestSegmentIndexLine=closestSegmentIndexArrowLine;
        }
        else if(distanceToArrow<=10){
          const segmentDistances =arrowPath.segments.map(segment=>{
            const distance=segment.point.getDistance(event.point);
            return distance;
          })
          const closestSegmentIndex=segmentDistances.indexOf(Math.min(...segmentDistances))
          const closestSegment1 = arrowPath.segments[closestSegmentIndex];
          if (closestSegment1.previous == null || closestSegment1.next == null) {
            // ближайший сегмент является сегментом, крепящим наконечник
            console.log("set");
            closestSegment.value =closestSegment1;
            segemntIndex.value=closestSegmentIndex;
          }

        }
      }
      group.onMouseDrag=(event)=>{
        if(event.modifiers.shift){
          console.log("shift");
          if(closestSegmentLine!=null){

            closestSegmentLine.point.x=event.point.x;
          }else{
            let startPoint = line.firstSegment.point;
            let endPoint = event.point;
            let endPointY=endPoint.y;
            line.lastSegment.point.y=endPointY;
            let arrowVector = line.lastSegment.point.subtract(startPoint);
            let arrowSize = 20;
            arrowVector.length -= arrowSize;
            arrow.segments[0].point = line.lastSegment.point;
            arrow.segments[1].point = line.lastSegment.point.add(arrowVector.normalize(arrowSize).rotate(135));
            arrow.segments[2].point = line.lastSegment.point;
            arrow.segments[3].point = line.lastSegment.point.add(arrowVector.normalize(arrowSize).rotate(-135));
          }
        }
        else{
            if(closestSegmentLine!=null){
          console.log("zzz");
          closestSegmentLine.point=event.point;

        }
        else if (closestSegment.value) {

          let segment = closestSegment.value;
          // Перемещаем сегмент вместе с наконечником
          segment.point = event.point;
          // Обновляем позицию наконечника стрелки в соответствии с новым положением сегмента

          let startPoint = line.firstSegment.point;
          let endPoint = event.point;
          line.lastSegment.point=endPoint;
          console.log("after update lastsegment point: ",endPoint);

          let arrowVector = endPoint.subtract(startPoint);
          let arrowSize = 20;
          arrowVector.length -= arrowSize;
          arrow.segments[0].point = endPoint;
          arrow.segments[1].point = endPoint.add(arrowVector.normalize(arrowSize).rotate(135));
          arrow.segments[2].point = endPoint;
          arrow.segments[3].point = endPoint.add(arrowVector.normalize(arrowSize).rotate(-135));
        }else{
          group.position = event.point.subtract(dragOffset);
        }
        }


      }

      paper.project.activeLayer.addChild(group);


    }
    if(name.toLowerCase()==='arrow'){
      console.log(obj);
      let startPoint = obj!=null?obj.children[1].firstSegment.point:new paper.Point(20, 20);
      let endPoint = obj!=null?obj.children[1].lastSegment.point:new paper.Point(80, 80);
      let arrowVector = endPoint.subtract(startPoint);
      let arrowSize = 20;
      arrowVector.length -= arrowSize;

// Создаем линию между начальной и конечной точками
      let line = new paper.Path.Line(startPoint, endPoint);
      line.strokeColor = 'black';
      line.strokeWidth = 2;

// Создаем стрелку
      let arrow = new paper.Path([
        endPoint,
        endPoint.add(arrowVector.normalize(arrowSize).rotate(135)),
        endPoint,
        endPoint.add(arrowVector.normalize(arrowSize).rotate(-135))
      ]);
      arrow.fillColor = 'black';
      arrow.strokeColor = 'black';
      arrow.strokeWidth = 2;

// Добавляем линию и стрелку на сцену
      let group=new paper.Group([arrow,line]);
      //TODO let group=obj!=null?obj:new paper.Group([arrow,line]);
      //TODO group.position=obj!=null?obj.position:paper.view.center;
      group.name='arrow';
      group.position=obj!=null?obj.position:center;
      group.onMouseUp=(event)=>{
        closestSegment.value=null;
        segemntIndex.value=null;
      }
      group.onMouseDown=(event)=>{
        const arrowPath = group.children[0]; // первый элемент группы - наконечник стрелки
        const arrowPoint = arrowPath.segments[0].point; // первая точка наконечника
        const distanceToArrow=event.point.getDistance(arrowPoint);
        if(distanceToArrow<=10){
          const segmentDistances =arrowPath.segments.map(segment=>{
            const distance=segment.point.getDistance(event.point);
            return distance;
          })
          const closestSegmentIndex=segmentDistances.indexOf(Math.min(...segmentDistances))
          const closestSegment1 = arrowPath.segments[closestSegmentIndex];
          if (closestSegment1.previous == null || closestSegment1.next == null) {
            // ближайший сегмент является сегментом, крепящим наконечник
            console.log("set");
            closestSegment.value =closestSegment1;
            segemntIndex.value=closestSegmentIndex;
          }

        }

      /*  console.log("ffff: ",group.firstChild);
        const segmentDistances = group.firstChild.segments.map(segment => {
          const distance = segment.point.getDistance(event.point);
          return distance;
        });
        const closestSegmentIndex = segmentDistances.indexOf(Math.min(...segmentDistances));
        const closestSegment1 = group.firstChild.segments[closestSegmentIndex]
        if(event.point.getDistance(closestSegment1.point) <= 10){
          closestSegment.value=closestSegment1;
          segemntIndex.value=closestSegmentIndex;
        }*/
      }
      group.onMouseDrag=(event)=>{
        if (closestSegment.value) {
          console.log("klicked");
          console.log("before update lastsegment point: ",line.lastSegment.point);
          let segment = closestSegment.value;
          // Перемещаем сегмент вместе с наконечником
          segment.point = event.point;
          // Обновляем позицию наконечника стрелки в соответствии с новым положением сегмента

          let startPoint = line.firstSegment.point;
          let endPoint = event.point;
          line.lastSegment.point=endPoint;
          console.log("after update lastsegment point: ",endPoint);

          let arrowVector = endPoint.subtract(startPoint);
          let arrowSize = 20;
          arrowVector.length -= arrowSize;
          arrow.segments[0].point = endPoint;
          arrow.segments[1].point = endPoint.add(arrowVector.normalize(arrowSize).rotate(135));
          arrow.segments[2].point = endPoint;
          arrow.segments[3].point = endPoint.add(arrowVector.normalize(arrowSize).rotate(-135));
        }else{
          group.position = event.point.subtract(dragOffset);
        }
        if(paper.Key.isDown('shift')){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {
            group.children[1].scale(1/scale);

          }else if (delta.x > 0 && delta.y > 0) {
            // движение мыши вниз-вправо, увеличиваем элемент
            group.children[1].scale(scale);
          }
        }

      }

      paper.project.activeLayer.addChild(group);


    }
    if(name.toLowerCase()==='romb'){
      let points2= [
        new paper.Point(100, 100),
         new paper.Point(150, 50),
         new paper.Point(200, 100),
        new  paper.Point(150, 150),
      ];
      let romb = obj!=null?obj:new paper.Path({
        segments: points2,
        closed:true,
        strokeColor:'black',
        fillColor:"white",
        strokeWidth:3,
        name:'romb',
      });
      romb.position=obj!=null?obj.position:center;
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
    if(name.toLowerCase()==='loop'){
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
      let loop = obj!=null?obj:new paper.Path({
        segments: points1,

        strokeColor:'black',
        fillColor:"white",
        strokeWidth:3,
        name:'loop'
      });
      loop.position=obj!=null?obj.position:center;
      loop.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);

        if (selectedItem.value){
          loop.position = event.point.subtract(dragOffset);
        }
      }

      paper.project.activeLayer.addChild(loop);
    }
    if(name.toLowerCase()==='hexagon'){
      let points = [
        new paper.Point(0, 0),
        new paper.Point(100, 0),
        new paper.Point(150, 75),
        new paper.Point(100, 150),
        new paper.Point(0, 150),
        new paper.Point(-50, 75)
      ];
      // Создаем путь из точек
      let hexagon = obj!=null?obj:new paper.Path({
        center:center,
        segments: points,
        closed: true,
        strokeColor:'black',
        fillColor:"white",
        strokeWidth:2,
        name:'hexagon'
      });

      hexagon.onMouseDrag=(event)=>{
        if (selectedItem.value){
          hexagon.position = event.point.subtract(dragOffset);
        }
      }

      paper.project.activeLayer.addChild(hexagon);
    }
    if(name.toLowerCase()==='text'){
      let text=obj!=null?obj:new paper.PointText({
        point:center,
        content:"Text",
        justification: 'center',
        fontSize:20,
        fillColor:'black',
        name:'text'
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
    if(name.toLowerCase()==='circle'){
      let circle=obj!=null?obj:new paper.Path.Circle({
        center: center,
        radius: 50,
        fillColor: 'white',
        strokeColor:'black',
        strokeWidth:3,
        name:'circle',
      });
      circle.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if(event.modifiers.shift){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {
            circle.scale(1/scale);
          }else if (delta.x > 0 && delta.y > 0) {
            circle.scale(scale);
          }
        }
        if (selectedItem.value){
          circle.position = event.point.subtract(dragOffset);
        }
      }
      paper.project.activeLayer.addChild(circle);
    }
    if(name.toLowerCase()==='rectangle'){
      // создаем новый прямоугольник
      const rect = obj!=null?obj:new paper.Path.Rectangle({
        point: center,  // начальная точка
        size: [100, 50],  // ширина и высота
        fillColor: 'white',
        strokeColor:'black',
        strokeWidth:3,
        name:'rectangle',
      });
      rect.onMouseDrag=(event)=>{
        console.log("selected: ",selectedItem.value);
        if(event.modifiers.shift){
          let scale =1.1;
          let delta = event.delta;
          if (delta.x < 0 && delta.y < 0) {
            rect.scale(1/scale);
          }else if (delta.x > 0 && delta.y > 0) {
            rect.scale(scale);
          }
        }
        if (selectedItem.value){
          rect.position = event.point.subtract(dragOffset.value);
        }
      }
      paper.project.activeLayer.addChild(rect);

    }
    if(name.toLowerCase()==='line'){
      // создаем новую линию
      const line = obj!=null?obj:new paper.Path.Line({
        from: [200, 100],  // начальная точка
        to: [300, 50],     // конечная точка
        strokeColor:'black',
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
  const scene=ref(null);
  const loadForEdit=()=>{
    let scense=paper.project.importJSON(mock);
    let importedItems =  paper.project.activeLayer.children.slice();
    paper.project.activeLayer.children=null;
    console.log("layers: act",    paper.project.activeLayer);
    console.log("ims: ",importedItems);
    let newLayer=new paper.Layer();
    paper.project.addLayer(newLayer);
    newLayer.activate();
    console.log("new layere ", newLayer)
    importedItems.forEach((item)=>{
      console.log("ifsf: ",item.name);
      console.log("ifdfsfdsf:  ",item);
       appendItem(item.name,item);
    })


    // Clean up the temporary project

    /*scene.value.onLoad=function (){
       console.log("imported: ", scene.children);
       scene.children.forEach(function(child) {
         console.log("xzxz");
         appendItem(child.name,child);

       });
       scene.remove();
       paper.view.draw();
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
  onBeforeMount(()=>{

    /*scene.value = paper.project.importJSON(mock);
    console.log("sceee: ",scene.value);*/
  })

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
    Экспорт компонента process работает с багом,всё остальное ок
    <div class="paper__controller">
      <div class="paper__controller_figures">
        <button class="paper-button" v-for="(paperItem) of paperController" :key="paperItem.id"  @click="appendItem(paperItem.name,null)">
          {{paperItem.name}}
          <component :is=" paperItem.component"></component>
        </button>
      </div>
      <div class="paper__controller_settings">
        <button class="paper-button paper-button_controller" @click="removeLast">Clear last</button>
        <button  class="paper-button paper-button_controller" @click="exporterSvg">Export SVG</button>
        <button  class="paper-button paper-button_controller"  @click="exporterJson">Export JSON</button>
        <button class="" @click="loadForEdit"></button>
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
    &:hover{
      background-color: #a4a4a4;
    }
    &_controller{
      font-weight: 700!important;
      color: #fff;
      background-color: #4299e1;
      border-radius: 0.25rem!important;
    }
  }
  .paper__controller{
    padding: 20px 10px;

    background-color: #cccccc;
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
