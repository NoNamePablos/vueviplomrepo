import paper from "paper";


class Triangle{
    constructor(shape) {
        if(shape){
            this.triangleItem=shape;
        }else{
            this.triangleItem=new paper.Path({
                segments: [[50, 50],[150, 50], [100,-50] ],
                closed: true,
                fillColor: 'white',
                strokeColor:'black',
                strokeWidth:3,
            });
            this.triangleItem.position=paper.view.center;
        }
        this.dragOffset=null;
        this.triangleItem.name='triangle_'+ +paper.project.activeLayer.children.length+1;
        this.triangleItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.triangleItem.onMouseDown=this.onMouseDown.bind(this);

    }
    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.triangleItem.position);
    }
    onMouseDrag(event){
        if(paper.Key.isDown('shift')){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.triangleItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.triangleItem.scale(scale);
            }
        }else{
            this.triangleItem.position = event.point.subtract(this.dragOffset);
        }
    }
}

export default Triangle;