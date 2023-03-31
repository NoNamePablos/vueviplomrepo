import paper from "paper";


class Romb{
    constructor(shape) {
        if(shape){
            this.rombItem=shape;
        }else{
            this.segments= [
                new paper.Point(100, 100),
                new paper.Point(150, 50),
                new paper.Point(200, 100),
                new  paper.Point(150, 150),
            ];
            this.rombItem=new paper.Path({
                segments: this.segments,
                closed:true,
                strokeColor:'black',
                fillColor:"white",
                strokeWidth:3,
            });
        }
        this.dragOffset=null;
        this.rombItem.name='romb_'+ +paper.project.activeLayer.children.length+1;
        this.rombItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.rombItem.onMouseDown=this.onMouseDown.bind(this);

    }
    onMouseDown(event){
        this.dragOffset = event.point.subtract(this.rombItem.position);
    }
    onMouseDrag(event){
        if(paper.Key.isDown('shift')){
            let scale =1.1;
            let delta = event.delta;
            if (delta.x < 0 && delta.y < 0) {

                this.rombItem.scale(1/scale);

            }else if (delta.x > 0 && delta.y > 0) {
                // движение мыши вниз-вправо, увеличиваем элемент
                this.rombItem.scale(scale);
            }
        }else{
            this.rombItem.position = event.point.subtract(this.dragOffset);
        }
    }

}

export default Romb;