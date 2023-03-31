import paper from "paper";


class Text{
    constructor(shape) {
        if(shape){
            this.textItem=shape;
        }else{
            this.textItem=new paper.PointText({
                point:paper.view.center,
                content:"Text",
                justification: 'center',
                fontSize:20,
                fillColor:'black',
            })
            this.textItem.position=paper.view.center;
        }
        this.selected=false;
        this.dragOffset=null;
        this.textItem.name='text_'+ +paper.project.activeLayer.children.length+1;
        this.textItem.onMouseDrag=this.onMouseDrag.bind(this);
        this.textItem.onMouseDown=this.onMouseDown.bind(this);
        this.textItem.onDoubleClick=this.onDoubleCLick.bind(this);
    }
    onDoubleCLick(event){
        let isTextEnter=false;
        let textInput=document.createElement('input');
        textInput.type = 'text';
        textInput.style.position = 'absolute';
        textInput.style.top = this.textItem.point.y + 'px';
        textInput.style.left = this.textItem.point.x + 'px';
        textInput.style.width = '200px';
        textInput.style.height = '20px';
        textInput.style.border = '1px solid black';
        textInput.style.fontFamily = 'Arial';
        textInput.style.fontSize = '20px';
        textInput.style.fontWeight = 'bold';
        textInput.style.padding = '5px';
        textInput.value = this.textItem.content;
        document.body.appendChild(textInput);
//todo внешний клик
        textInput.onkeypress=(event)=>{
            isTextEnter=true;
            if(event.key==='Enter'){
                this.textItem.content=textInput.value;
                textInput.remove();
            }
        }

    }
    onMouseDown(event){

        this.dragOffset = event.point.subtract(this.textItem.position);
    }
    onMouseDrag(event){
        this.textItem.position = event.point.subtract(this.dragOffset);
    }

}

export default Text;