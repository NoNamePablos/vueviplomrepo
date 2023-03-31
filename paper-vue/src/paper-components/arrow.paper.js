import paper from "paper";

class Arrow{
    constructor(shape) {
        this.arrowSize = 20;
        if(shape){
            this.startPoint = shape.children[1].firstSegment.point;
            this.endPoint = shape.children[1].lastSegment.point;
            this.arrowVector = this.endPoint.subtract(this.startPoint);
            this.arrowVector.length -= this.arrowSize;
            this.line = new paper.Path.Line(this.startPoint, this.endPoint);
            this.line.strokeColor = 'black';
            this.line.strokeWidth = 2;
            this.arrow = new paper.Path([
                this.endPoint,
                this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(135)),
                this.endPoint,
                this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(-135))
            ]);
            this.arrow.fillColor = 'black';
            this.arrow.strokeColor = 'black';
            this.arrow.strokeWidth = 2;
        }else{
            this.startPoint =new paper.Point(20, 20);
            this.endPoint = new paper.Point(80, 80);
            this.arrowVector = this.endPoint.subtract(this.startPoint);
            this.arrowVector.length -= this.arrowSize;
            this.line = new paper.Path.Line(this.startPoint, this.endPoint);
            this.line.strokeColor = 'black';
            this.line.strokeWidth = 2;
            this.arrow = new paper.Path([
                this.endPoint,
                this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(135)),
                this.endPoint,
                this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(-135))
            ]);
            this.arrow.fillColor = 'black';
            this.arrow.strokeColor = 'black';
            this.arrow.strokeWidth = 2;
        }
        this.groupItem=new paper.Group([this.arrow,this.line]);
        this.closestSegment=null;
        this.segemntIndex=null;
        this.groupItem.name="arrow_"+ +paper.project.activeLayer.children.length+1;
        this.dragOffset=null;
        this.groupItem.onMouseUp=this.onMouseUp.bind(this);
        this.groupItem.onMouseDown=this.onMouseDown.bind(this);
        this.groupItem.onMouseDrag=this.onMouseDrag.bind(this);
    }
    onMouseUp(event){
        this.closestSegment=null;
        this.segemntIndex=null;
    }
    onMouseDown(event){
        const arrowPath = this.groupItem.children[0]; // первый элемент группы - наконечник стрелки
        const arrowPoint = arrowPath.segments[0].point; // первая точка наконечника
        const distanceToArrow=event.point.getDistance(arrowPoint);
        if(distanceToArrow<=10){
            const segmentDistances =arrowPath.segments.map(segment=>{
                const distance=segment.point.getDistance(event.point);
                return distance;
            })
            const closestSegmentIndex=segmentDistances.indexOf(Math.min(...segmentDistances))
            const closestSegment1 = arrowPath.segments[closestSegmentIndex];
            if (closestSegment1.previous == null || closestSegment1.next == null) {
                // ближайший сегмент является сегментом, крепящим наконечник
                this.closestSegment =closestSegment1;
                this.segemntIndex=closestSegmentIndex;
            }

        }
        this.dragOffset = event.point.subtract(this.groupItem.position);
    }
    onMouseDrag(event) {
        if (this.closestSegment) {
            let segment = this.closestSegment;
            // Перемещаем сегмент вместе с наконечником
            segment.point = event.point;
            // Обновляем позицию наконечника стрелки в соответствии с новым положением сегмента
            this.startPoint = this.line.firstSegment.point;
            this.endPoint = event.point;
            this.line.lastSegment.point=this.endPoint;
            this.arrowVector = this.endPoint.subtract(this.startPoint);
            this.arrowVector.length -= this.arrowSize;
            this.arrow.segments[0].point = this.endPoint;
            this.arrow.segments[1].point = this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(135));
            this.arrow.segments[2].point = this.endPoint;
            this.arrow.segments[3].point = this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(-135));
        }else{
            this.groupItem.position = event.point.subtract(this.dragOffset);
        }

    }
}

export default Arrow;