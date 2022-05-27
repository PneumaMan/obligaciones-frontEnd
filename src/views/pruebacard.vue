<template>
    <div class="">
        <div class="container">

            </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            isActive1: true,
            isActive2: false,            
        }
    },
    methods:{
        change(){
            this.isActive1 = !this.isActive1
            this.isActive2 = !this.isActive2     
        }
    }
}
</script>