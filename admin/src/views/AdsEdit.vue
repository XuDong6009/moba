<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}广告</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="modal.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                 <el-button @click="modal.items.push({})" type="primary" size="small"><i
                            class="el-icon-plus"></i>添加广告</el-button>
                 <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,index) in modal.items" :key="index">
                            <el-form-item label="跳转链接">
                                <el-input v-model="item.targetUrl"></el-input>
                            </el-form-item>
                            <el-form-item label="图标" style="margin-top:0.5rem">
                                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'"
                                    :show-file-list="false" :on-success="res => $set(item,'imgSrc',res.imgSrc)">
                                    <img v-if="item.imgSrc" :src="item.imgSrc" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" size="small" @click="modal.items.splice(index,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        VueEditor
    } from "vue2-editor";
    export default {
        components: {
            VueEditor
        },
        props: ['id'],
        data() {
            return {
                modal: {
                    name: '',
                    items: []
                },
            }
        },
        mounted() {
            this.id && this.fetch() //默认读取修改的内容
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    if (val.name === 'AdsCreate') {
                        this.modal.title = ''
                        this.modal.categories = []
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                var formData = new FormData();
                formData.append("file", file);
                const result = await this.$http.post('/upload', formData)
                Editor.insertEmbed(cursorLocation, "image", result.data.imgSrc);
                resetUploader();
            },
            async save() {
                let result;
                if (this.id) {
                    result = await this.$http.put(`/reset/ads/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('reset/ads', this.modal)
                }

                if (result.status === 200) {
                    this.$router.push('/ads/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                //获取某一个id下的item 信息
                const result = await this.$http.get(`/reset/ads/${this.id}`)
                this.modal = result.data
            },
        }
    }
</script>

<style>

</style>