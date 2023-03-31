import paper from "paper";

class Process{
    constructor(shape) {
        if(shape){
            this.rectangle=shape.children[0];
            this.leftline=shape.children[1];
            this.rightline=shape.children[2];
        }else{
            this.rectangle=new paper.Path.Rectangle({
                point: [50,50],
                size: [100, 50],
                fillColor: 'white',
                strokeColor:'black',
                strokeWidth:2,
            })
            this.leftline=new paper.Path.Line(new paper.Point(70,50), new paper.Point(70,100));
            this.leftline.strokeColor = 'black';
            this.leftline.strokeWidth = 2;
            this.rightline=new paper.Path.Line(new paper.Point(130,50), new paper.Point(130,100));
            this.rightline.strokeColor = 'black';
            this.rightline.strokeWidth = 2;
            this.groupItem = new paper.Group([this.rectangle,this.leftline,this.rightline]);
            this.groupItem.name="process_"+ +paper.project.activeLayer.children.length+1;
            this.dragOffset=null;
            this.groupItem.onMouseDown=this.onMouseDown.bind(this);
            this.groupItem.onMouseDrag=this.onMouseDrag.bind(this);
        }
    }
    onMouseDown(event){
        let hitResult = paper.project.hitTest(event.point);
        if (hitResult && hitResult.item) {
            this.dragOffset = event.point.subtract(this.groupItem.position);
        }
    }
    onMouseDrag(event){
        if(paper.Key.isDown('shift')){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {
                this.groupItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.groupItem.scale(scale);
            }
        }
        this.groupItem.position = event.point.subtract(this.dragOffset);
    }
}

export default Process;