<template>
  <div class="workblock">
      <br />
      <el-row :gutter="10">
        <el-col :span="1"></el-col>
        <el-col :span="2">
          <el-avatar :size="85" :font-size="35">Kirigaya</el-avatar>
        </el-col>
        <el-col :span="10"><h1>StupidChatBot1.0测试</h1></el-col>
      </el-row>

      <el-divider></el-divider>
      <div style="font-size:14px">
        <h3>录音时长：{{recorder&&recorder.duration}}</h3>
        <br />

        <el-button type="primary" @click="handleStart">开始录音</el-button>
        <el-button type="info" @click="handlePause">暂停录音</el-button>
        <el-button type="success" @click="handleResume">继续录音</el-button>
        <el-button type="warning" @click="handleStop">停止录音</el-button>
        <br />
        <br />
        <h3>播放时长：{{recorder&&(playTime>recorder.duration?recorder.duration:playTime)}}</h3>
        <br />
        <el-button type="primary" @click="handlePlay">播放录音</el-button>
        <el-button type="info" @click="handlePausePlay">暂停播放</el-button>
        <el-button type="success" @click="handleResumePlay">继续播放</el-button>
        <el-button type="warning" @click="handleStopPlay">停止播放</el-button>
        <el-button type="error" @click="handleDestroy">销毁录音</el-button>
      </div>
      <br>
        <el-button style="margin-left:5px;" type="primary" @click="uploadRecord">上传</el-button>
        <el-button style="margin-left:5px;" type="default" @click="uploadRecordModal=false">取消</el-button>
      <br />
      <br />

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
    <div class="el-upload__text">将wav文件拖到此处，或<em>点击上传</em></div>
  </el-upload>

  <el-divider></el-divider>
  <el-row :gutter="10">
    <el-col :span="7"></el-col>
    <el-col :span="5"><el-tag size="100">语音识别结果</el-tag></el-col>

    <el-col :span="5"><el-tag type="success">{{submit_words}}</el-tag></el-col>
    <el-col :span="7"></el-col>
  </el-row>

  <br />

  <el-row :gutter="10">
    <el-col :span="7"></el-col>
    <el-col :span="5"><el-tag type="warning">聊天机器人的回应</el-tag></el-col>

    <el-col :span="5"><el-tag type="danger">{{return_words}}</el-tag></el-col>
    <el-col :span="7"></el-col>
  </el-row>

  <br />
  <br />

  <div class="block" >
    <span class="demonstration">打个分吧（反正打了我也不会看:D）</span>
    <el-rate v-model="value1"></el-rate>
  </div>

  </div>

  
</template>


<script>
import { ElMessage } from 'element-plus'
import Recorder from 'js-audio-recorder'
import axios from 'axios'; 
export default {
  name: 'HelloWorld',
  data(){
      return {
        audio : new Audio(),
        submit_words:"",
        return_words:"",
        return_files:"",
        recorder :new Recorder({
              sampleBits: 16,                 // 采样位数，支持 8 或 16，默认是16
              sampleRate: 16000,              // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
              numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
              // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
                }),
      }
  },
 
  methods:{
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
    },
    handleStart () {
      this.recorder = new Recorder()
      Recorder.getPermission().then(() => {
        console.log('开始录音')
        this.recorder.start() // 开始录音
      }, (error) => {
        console.log(`${error.name} : ${error.message}`)
      })
    },
    handlePause () {
      console.log('暂停录音')
      this.recorder.pause() // 暂停录音
    },
    handleResume () {
      console.log('恢复录音')
      this.recorder.resume() // 恢复录音
    },
    handleStop () {
      console.log('停止录音')
      this.recorder.stop() // 停止录音
    },
    handlePlay () {
      console.log('播放录音')
      this.recorder.play() // 播放录音

      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    handlePausePlay () {
      console.log('暂停播放')
      this.recorder.pausePlay() // 暂停播放

      // 播放时长
      this.playTime = this.recorder.getPlayTime()
      this.time = null
    },
    handleResumePlay () {
      console.log('恢复播放')
      this.recorder.resumePlay() // 恢复播放

      // 播放时长
      this.timer = setInterval(() => {
        try {
          this.playTime = this.recorder.getPlayTime()
        } catch (error) {
          this.timer = null
        }
      }, 100)
    },
    handleStopPlay () {
      console.log('停止播放')
      this.recorder.stopPlay() // 停止播放

      // 播放时长
      this.playTime = this.recorder.getPlayTime()
      this.timer = null
    },
    handleDestroy () {
      console.log('销毁实例')
      this.recorder.destroy() // 毁实例
      this.timer = null
    },
    uploadRecord () {
      if (this.recorder == null || this.recorder.duration === 0) {
        this.$Message.error('请先录音')
        return false
      }
      this.recorder.pause() // 暂停录音
      this.timer = null
      console.log('上传录音')// 上传录音
      var formData = new FormData()
      var blob = this.recorder.getWAVBlob()//获取wav格式音频数据
      var newbolb = new Blob([blob], { type: 'audio/wav' })
      var fileOfBlob = new File([newbolb], new Date().getTime() + '.wav')
      formData.append('file', fileOfBlob)
      // axios.post(this.resource, formData).then(res => {
      //   console.log(res.data.data[0].url)
      //   this.uploadRecordModal = false
      // })
      axios.post('api/reply/', formData)
      .then((response) => {
        ElMessage.success('上传成功');
        console.log(response);
        this.submit_words = response.data.submit_words;
        this.return_words = response.data.return_words;
        this.audio.src = "/api/reply/?file="+response.data.return_files;
        this.audio.play();
      })
    },
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
