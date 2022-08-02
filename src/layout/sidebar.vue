<template>
  <div>
    <el-col>
      <el-row :gutter="20">
        <el-col :span="22"
          ><el-input placeholder="Tools Filter" v-model="filterText">
          </el-input> </el-col
      ></el-row>
      <div class="tree">
        <el-row :gutter="20"
          ><el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
          >
          </el-tree>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
import { getAllData,getDetail } from "../api/api";
import eventBus from "../bus.js";
export default {
  data() {
    return {
      filterText: "",
      data1: [
        //test
        {
          label: "Tool",
          path: "123123",
          children: [
            {
              label: "DS",

              children: [
                {
                  label: "ADperf",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          label: "OS",
          children: [
            {
              label: "DND",
              children: [
                {
                  label: "Bootstat",
                },
                {
                  id: 10,
                  label: "Fvebootlog",
                },
                {
                  id: 11,
                  label: "NetFxRepairTool",
                },
                {
                  id: 12,
                  label: "Verbose.Windows",
                },
                {
                  id: 13,
                  label: "WuLog",
                },
              ],
            },
            {
              id: 6,
              label: "Perf",
            },
            {
              id: 7,
              label: "UEX",
            },
          ],
        },
        {
          id: 3,
          label: "Other",
          children: [
            {
              id: 7,
              label: "Procmon",
            },
            {
              id: 8,
              label: "Script",
            },
          ],
        },
      ],
      tree1: [
        //测试
        {
          label: "Tool",
          children: [
            {
              label: "DS",
              children: [
                { label: "ADperf", children: [] },
                { label: "ADS_DatabaseAnalyzer_public", children: [] },
                { label: "AD_ESR", children: [] },
                { label: "AD_GetRemoteToken", children: [] },
                { label: "AD_NAT", children: [] },
                { label: "AD_PERF", children: [] },
                { label: "AD_Replfix", children: [] },
                { label: "AD_usnmon", children: [] },
                { label: "AD_Utils", children: [] },
                { label: "AUTH", children: [{ label: "Auth", children: [] }] },
                { label: "DFSRMiner", children: [] },
                { label: "IdnaIdentify", children: [] },
                { label: "MilkTea", children: [] },
                { label: "PKI_Credential_Roaming", children: [] },
                {
                  label: "PKI_CRUtil",
                  children: [
                    {
                      label: "Sample_Output",
                      children: [{ label: "CredRoamLogs", children: [] }],
                    },
                  ],
                },
                {
                  label: "PKI_Tools",
                  children: [{ label: "PKITools", children: [] }],
                },
                { label: "Script_Logcollection", children: [] },
                {
                  label: "TSSv2",
                  children: [
                    { label: "ADS_Videos", children: [] },
                    {
                      label: "Archive",
                      children: [
                        {
                          label: "Beta_Signed_210708",
                          children: [
                            { label: "BIN", children: [] },
                            { label: "BINx64", children: [] },
                            { label: "BINx86", children: [] },
                            { label: "config", children: [] },
                            { label: "scripts", children: [] },
                            { label: "xray", children: [] },
                          ],
                        },
                      ],
                    },
                    { label: "For_TSSv2_Devs", children: [] },
                    {
                      label: "Hackathon_2021",
                      children: [{ label: "TrainingSessions", children: [] }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      curPath : ''
    };
  },
  mounted() {
    getAllData().then((res) => {
      this.data.push(res.data);
      // console.log(data);
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    handleNodeClick(data) {
      console.log('clickData',data);
      this.curPath = data.current_path
      getDetail(this.curPath).then((res2)=>{
        eventBus.$emit("getContent", res2.data);
      })
      // eventBus.$emit("getContent", data.label);
    },
  },
};
</script>

<style>
.tree {
  overflow-x: hidden;
  height: 500px;
 margin: 0;
 padding: 0;
}
/* .el-tree{
 display: inline-block;
  min-width: 100%;
  overflow: hidden;
}
.el-tree>.el-tree-node{
  display:inline-block;
  min-width: 100%;
  overflow: hi;
} */

.el-input {
  margin-bottom: 6px;
  margin-top: 10px;
}
.tree {
  height: 300px;
}
</style>