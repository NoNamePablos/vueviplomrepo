import paper from "paper"

const PaperDirecrive={
    mounted(el){
        paper.setup(el);
    },
    unmounted(el){
        paper.view.remove();
    }
}
export default PaperDirecrive;