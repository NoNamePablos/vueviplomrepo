import paper from "paper";


class Rectangle{
    constructor(shape) {
        if(shape){
            this.rectangleItem=shape;
        }else{
            this.rectangleItem=new paper.Path.Rectangle({
                point:  paper.view.center,  // начальная точка
                size: [100, 50],  // ширина и высота
                fillColor: 'white',
                strokeColor:'black',
                strokeWidth:3,
            });
        }
        this.dragOffset=null;
        this.rectangleItem.name='rectangle_'+ +paper.project.activeLayer.children.length+1;
        this.rectangleItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.rectangleItem.onMouseDown=this.onMouseDown.bind(this);

    }
    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.rectangleItem.position);
    }
    onMouseDrag(event){
        if(paper.Key.isDown('shift')){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.rectangleItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.rectangleItem.scale(scale);
            }
        }else{
            this.rectangleItem.position = event.point.subtract(this.dragOffset);
        }
    }

}

export default Rectangle;