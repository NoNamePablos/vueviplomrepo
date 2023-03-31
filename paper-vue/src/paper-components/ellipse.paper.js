import paper from "paper";

class Ellipse{
    constructor(shape=new paper.Path.Ellipse({
        center: [110, 50],
        radius: [90, 30],
        fillColor: 'white',
        strokeWidth:3,
        strokeColor:'black',
        name:'ellipse_'+ paper.project.activeLayer.children.length+1,
    }) ) {
        if(shape){
            this.shape=shape;
        }
        else{
            this.shape=new paper.Path.Ellipse({
                center: [110, 50],
                radius: [90, 30],
                fillColor: 'white',
                strokeWidth:3,
                strokeColor:'black',
                name:'ellipse_'+ paper.project.activeLayer.children.length+1,
            })
        }
        this.dragOffset=null;
        this.shape.name='ellipse_'+ +paper.project.activeLayer.children.length+1;
        this.shape.onMouseDown=this.onMouseDown.bind(this);
        this.shape.onMouseDrag=this.onMouseDrag.bind(this);
    }
    onMouseDown(event){
            let hitResult = paper.project.hitTest(event.point);
            if (hitResult && hitResult.item) {
                this.dragOffset = event.point.subtract(this.shape.position);
            }
    }
    onMouseDrag(event){
        if(event.modifiers.shift){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {
                this.shape.scale(1/scale);
            }else if (delta.x > 0 && delta.y > 0) {
                this.shape.scale(scale);
            }
        }
        this.shape.position = event.point.subtract(this.dragOffset);
    }
}


export  default Ellipse;