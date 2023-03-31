import paper from "paper";


class Circle{
    constructor(shape) {
        if(shape){
            this.circleItem=shape;
        }else{
            this.circleItem=new paper.Path.Circle({
                center:  paper.view.center,
                radius: 50,
                fillColor: 'white',
                strokeColor:'black',
                strokeWidth:3,
            });
        }

        this.dragOffset=null;
        this.circleItem.name='circle_'+ +paper.project.activeLayer.children.length+1;
        this.circleItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.circleItem.onMouseDown=this.onMouseDown.bind(this);

    }
    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.circleItem.position);
    }
    onMouseDrag(event){
        if(paper.Key.isDown('shift')){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.circleItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.circleItem.scale(scale);
            }
        }else{
            this.circleItem.position = event.point.subtract(this.dragOffset);
        }
    }

}

export default Circle;