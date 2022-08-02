<template>
<div class='searchBar'>
   <el-col :span="6">
   <img src="@/assets/MSLOGO.png"/>
   </el-col>
  <el-col :span="12">Tools Center </el-col>
    <el-col :span="4"> <el-avatar :size="40" icon="el-icon-user-solid"></el-avatar>
   </el-col>
</div>
</template>

<script>
export default {
    name:'content',
    data(){
        return{
            input: ''
        }
    }
}
</script>

<style>
.el-col{

}
img{
    height:60px;
    float:left
}
.el-avatar{
    margin-top: 10px;
    float:right
}

</style>