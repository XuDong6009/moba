<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}物品</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="modal.name"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="modal.icon" :src="modal.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                modal: {
                    name: '',
                    icon: ''
                }
            }
        },
        mounted() {
            this.id && this.fetch() //默认读取修改的内容
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    if (val.name === 'ItemCreate') {
                        this.modal = {}
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.$set(this.modal,'icon',res.imgSrc)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            async save() {
                if (!this.modal.parent) {
                    delete this.modal.parent //删除parent属性
                }
                let result;
                if (this.id) {
                    result = await this.$http.put(`/reset/items/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('reset/items', this.modal)
                }

                if (result.status === 200) {
                    this.$router.push('/items/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                //获取某一个id下的item 信息
                const result = await this.$http.get(`/reset/items/${this.id}`)
                this.modal = result.data
            }
        }
    }
</script>