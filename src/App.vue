<template>
  <div id="app">
  
    <el-container>
      <el-header><Header /></el-header>
      <el-container>

        <el-aside ><Sidebar /><Sidelist /></el-aside>
        <el-main><Readme /></el-main>
        
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./layout/header.vue";
import Sidebar from "./layout/sidebar.vue";
import Sidelist from "./layout/sidelist.vue";
import Readme from "./layout/readme.vue";
export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Readme,
    Sidelist,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.title {
  color: #fff;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.849);
}
span {
  line-height: 100%;
  /* font-size: 50px; */
  float: left;
}

.el-header,
.el-footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  margin-top: 20px;
  margin-left: 30px;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;

  height: 90vh;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
