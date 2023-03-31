import paper from "paper";

class Arrow90{
    constructor(shape) {
        this.closestSegment=null;
        this.segemntIndex=null;
        this.closestSegmentLine=null;
        this.closestSegmentIndexLine=null;
        if(shape){
            this.lineOne=shape.children[1];
            this.lineTwo=shape.children[2];
            this.arrow=shape.children[0];
            this.groupItem=shape;
        }else{
            this.startPoint = new paper.Point(20, 20);
            this.endPoint = new paper.Point(20, 80);
            this.arrowVector = this.endPoint.subtract(this.startPoint);
            this.arrowSize = 20;
            this.arrowVector.length -= this.arrowSize;
// Создаем линию между начальной и конечной точками
            this.lineOne = new paper.Path.Line(this.startPoint, this.endPoint);
            this.lineOne.strokeColor = 'black';
            this.lineOne.strokeWidth = 2;


// Создаем стрелку
            this.arrow = new paper.Path([
                this.endPoint,
                this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(135)),
                this.endPoint,
                this.endPoint.add(this.arrowVector.normalize(this.arrowSize).rotate(-135))
            ]);
            this.arrow.fillColor = 'black';
            this.arrow.strokeColor = 'black';
            this.arrow.strokeWidth = 2;

            this.lineTwo= new paper.Path.Line([80, 20], [20, 20]);
            this.lineTwo.strokeColor='black';
            this.lineTwo.strokeWidth=2;
            this.groupItem=new paper.Group([this.arrow,this.lineOne,this.lineTwo]);

        }
        this.groupItem.name="arrow90_"+ +paper.project.activeLayer.children.length+1;
        this.dragOffset=null;
        this.groupItem.onMouseUp=this.onMouseUp.bind(this);
        this.groupItem.onMouseDown=this.onMouseDown.bind(this);
        this.groupItem.onMouseDrag=this.onMouseDrag.bind(this);
    }
    onMouseUp(event){
        this.closestSegment=null;
        this.segemntIndex=null;
        this.closestSegmentLine=null;
        this.closestSegmentIndexLine=null;
    }
    onMouseDown(event){

        const arrowPath = this.groupItem.children[0]; // первый элемент группы - наконечник стрелки
        const arrowPoint = arrowPath.segments[0].point; // первая точка наконечника
        const distanceToArrow=event.point.getDistance(arrowPoint);
        const line=this.groupItem.children[this.groupItem.children.length-1];
        const segmentDistancesLine = line.segments.map(segment => {
            const distance = segment.point.getDistance(event.point);
            return distance;
        });
        const closestSegmentIndexArrowLine = segmentDistancesLine.indexOf(Math.min(...segmentDistancesLine));
        const closestSegmentLineArrow = line.segments[closestSegmentIndexArrowLine]
        if(event.point.getDistance(closestSegmentLineArrow.point) <= 10){
           this.closestSegmentLine=closestSegmentLineArrow;
            this.closestSegmentIndexLine=closestSegmentIndexArrowLine;
        }
        else if(distanceToArrow<=10){
            const segmentDistances =arrowPath.segments.map(segment=>{
                const distance=segment.point.getDistance(event.point);
                return distance;
            })
            const closestSegmentIndex=segmentDistances.indexOf(Math.min(...segmentDistances))
            const closestSegment1 = arrowPath.segments[closestSegmentIndex];
            if (closestSegment1.previous == null || closestSegment1.next == null) {
                this.closestSegment =closestSegment1;
                this.segemntIndex=closestSegmentIndex;
            }

        }
        this.dragOffset = event.point.subtract(this.groupItem.position);

    }
    onMouseDrag(event){
        if(event.modifiers.shift){
            console.log("shift");
            if(this.closestSegmentLine!=null){

                this.closestSegmentLine.point.x=event.point.x;
            }else{
                let startPoint = this.lineOne.firstSegment.point;
                let endPoint = event.point;
                let endPointY=endPoint.y;
                this.lineOne.lastSegment.point.y=endPointY;
                let arrowVector = this.lineOne.lastSegment.point.subtract(startPoint);
                let arrowSize = 20;
                arrowVector.length -= arrowSize;
                this.arrow.segments[0].point = this.lineOne.lastSegment.point;
                this.arrow.segments[1].point = this.lineOne.lastSegment.point.add(arrowVector.normalize(arrowSize).rotate(135));
                this.arrow.segments[2].point = this.lineOne.lastSegment.point;
                this.arrow.segments[3].point = this.lineOne.lastSegment.point.add(arrowVector.normalize(arrowSize).rotate(-135));
            }
        }
        else{
            if(this.closestSegmentLine!=null){
                this.closestSegmentLine.point=event.point;

            }
            else if (this.closestSegment
            ) {

                let segment = this.closestSegment;
                // Перемещаем сегмент вместе с наконечником
                segment.point = event.point;
                // Обновляем позицию наконечника стрелки в соответствии с новым положением сегмента

                let startPoint = this.lineOne.firstSegment.point;
                let endPoint = event.point;
                this.lineOne.lastSegment.point=endPoint;
                let arrowVector = endPoint.subtract(startPoint);
                let arrowSize = 20;
                arrowVector.length -= arrowSize;
                this.arrow.segments[0].point = endPoint;
                this.arrow.segments[1].point = endPoint.add(arrowVector.normalize(arrowSize).rotate(135));
                this.arrow.segments[2].point = endPoint;
                this.arrow.segments[3].point = endPoint.add(arrowVector.normalize(arrowSize).rotate(-135));
            }else{
                this.groupItem.position = event.point.subtract(this.dragOffset);
            }
        }
    }
}

export default Arrow90;