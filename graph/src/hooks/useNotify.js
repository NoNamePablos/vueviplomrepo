import {onMounted, ref} from "vue";

export const useNotify=()=>{
    const notification=ref([]);
    const appendNotify=(str)=>{
        notification.value.push(str);
    }
    const handleCopied=(value)=>{
        appendNotify(value.text);
    }
    return {
        notification,
        appendNotify,
        handleCopied,
    }
}
