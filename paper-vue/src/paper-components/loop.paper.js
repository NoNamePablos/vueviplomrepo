import paper from "paper";


class Loop{
    constructor(shape) {
        if(shape){
            this.loopItem=shape;
        }else{
            this.segmentPoints= [
                new paper.Point(0, 0),
                new paper.Point(-100, 0),
                new paper.Point(-100, -75),
                new paper.Point(0,-100),
                new paper.Point(100,-75),
                new paper.Point(100,0),
                new paper.Point(-100,0),
            ];
            this.loopItem=new paper.Path({
                segments: this.segmentPoints,
                strokeColor:'black',
                fillColor:"white",
                strokeWidth:3,
            });
            this.loopItem.position=paper.view.center;
        }
        this.dragOffset=null;
        this.loopItem.name='loop_'+ +paper.project.activeLayer.children.length+1;
        this.loopItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.loopItem.onMouseDown=this.onMouseDown.bind(this);

    }

    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.loopItem.position);
    }
    onMouseDrag(event){
        if(event.modifiers.shift){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.loopItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.loopItem.scale(scale);
            }
        }
        this.loopItem.position = event.point.subtract(this.dragOffset);

    }

}

export default Loop;