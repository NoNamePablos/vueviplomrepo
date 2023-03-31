import paper from "paper";


class Square{
    constructor(shape) {
        if(shape){
            this.squareItem=shape;
        }else{
            this.squareItem=new paper.Path.Rectangle({
                point:  paper.view.center,  // начальная точка
                size: [50, 50],  // ширина и высота
                fillColor: 'white',
                strokeColor:'black',
                strokeWidth:3,
            });
        }
        this.dragOffset=null;
        this.squareItem.name='rectangle_'+ +paper.project.activeLayer.children.length+1;
        this.squareItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.squareItem.onMouseDown=this.onMouseDown.bind(this);

    }
    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.squareItem.position);
    }
    onMouseDrag(event){
        if(paper.Key.isDown('shift')){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.squareItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.squareItem.scale(scale);
            }
        }else{
            this.squareItem.position = event.point.subtract(this.dragOffset);
        }
    }
}

export default Square;