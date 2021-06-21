<template>
  <div class="main">
    <!-- <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul> -->
      <!-- <el-button type="primary" @click="record">录音</el-button> -->
       <el-upload
  class="upload-demo"
  drag
  action="/api/reply/"
  name="file"
  :on-success="success"
  :on-error	="error"
  :show-file-list="false"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>

</el-upload>
  <p>您说：{{submit_words}}</p>
  <p>我说：{{return_words}}</p>
  </div>
</template>

<script>
  import { ElMessage } from 'element-plus'

export default {
  name: 'HelloWorld',
  data(){
      return {
        audio : new Audio(),
        submit_words:"",
        return_words:"",
        return_files:"",
      }
  },
  methods:{
    record(){
        alert("qlyyds");
    },
    success(response,file,fileList){
      console.log(response.submit_words);
      if(response.err_code==0)
      {
        ElMessage.success('上传成功');
        this.submit_words = response.submit_words;
        this.return_words = response.return_words;
        this.audio.src = "/api/reply/?file="+response.return_files;
        this.audio.play();
      }
       else{
         ElMessage.error('上传失败'+response.error);
       }
        response,file,fileList
    },
    error(err,file,fileList){
      ElMessage.error('上传失败'+err);
        file,fileList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
