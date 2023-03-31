import paper from "paper";


class Line{
    constructor(shape) {
        if(shape){
            this.lineItem=shape;
        }else{
            this.lineItem=new paper.Path.Line({
                from: [200, 100],  // начальная точка
                to: [300, 50],     // конечная точка
                strokeColor:'black',
                strokeWidth: 3,
            });
        }
        this.closestSegment=null;
        this.segemntIndex=null;
        this.dragOffset=null;
        this.lineItem.name='line_'+ +paper.project.activeLayer.children.length+1;
        this.lineItem.onMouseUp=this.onMouseUp.bind(this);
        this.lineItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.lineItem.onMouseDown=this.onMouseDown.bind(this);

    }
    onMouseUp(event){
        this.closestSegment=null;
        this.segemntIndex=null;
    }
    onMouseDown(event){
        const segmentDistances = this.lineItem.segments.map(segment => {
            const distance = segment.point.getDistance(event.point);
            return distance;
        });
        const closestSegmentIndex = segmentDistances.indexOf(Math.min(...segmentDistances));
        const closestSegment1 = this.lineItem.segments[closestSegmentIndex]
        if(event.point.getDistance(closestSegment1.point) <= 10){
            this.closestSegment=closestSegment1;
            this.segemntIndex=closestSegmentIndex;
        }
        this.dragOffset = event.point.subtract(this.lineItem.position);
    }
    onMouseDrag(event){
        if(event.modifiers.shift){
                this.closestSegment.point.x=event.point.x;
                this.lineItem.smooth();
        }else{
            if(this.closestSegment){
                this.closestSegment.point=event.point;
                this.lineItem.smooth();
            }else{
                this.lineItem.position = event.point.subtract(this.dragOffset);
            }
        }

    }

}

export default Line;