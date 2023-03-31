import paper from "paper";


class Hexagon{
    constructor(shape) {
        if(shape){
            this.hexagonItem=shape;
        }else{
            this.segmentPoints= [
                new paper.Point(0, 0),
                new paper.Point(100, 0),
                new paper.Point(150, 75),
                new paper.Point(100, 150),
                new paper.Point(0, 150),
                new paper.Point(-50, 75)
            ];
            this.hexagonItem=new paper.Path({
                segments: this.segmentPoints,
                closed: true,
                strokeColor:'black',
                fillColor:"white",
                strokeWidth:2,
            });
            this.hexagonItem.position=paper.view.center;
        }
        this.dragOffset=null;
        this.hexagonItem.name='hexagon_'+ +paper.project.activeLayer.children.length+1;
        this.hexagonItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.hexagonItem.onMouseDown=this.onMouseDown.bind(this);

    }

    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.hexagonItem.position);
    }
    onMouseDrag(event){
        if(event.modifiers.shift){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.hexagonItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.hexagonItem.scale(scale);
            }
        }
        this.hexagonItem.position = event.point.subtract(this.dragOffset);

    }

}

export default Hexagon;