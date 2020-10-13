<template>
    <div>
        <h1>{{id ? '修改' : '创建'}}英雄</h1>
        <el-form @submit.native.prevent="save" label-width="120px">
            <el-tabs type="border-card" value="skill">
                <el-tab-pane label="基础信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="modal.name"></el-input>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="modal.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="modal.categories" multiple>
                            <el-option v-for="item in categories" :label="item.name" :key="item._id" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'"
                            :show-file-list="false" :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="modal.avatar" :src="modal.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="难度">
                        <el-rate v-model="modal.scores.difficulty" show-score text-color="#ff9900"
                            :style="{marginTop:'.7rem'}">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate v-model="modal.scores.skill" show-score text-color="#ff9900"
                            :style="{marginTop:'.7rem'}">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate v-model="modal.scores.attack" show-score text-color="#ff9900"
                            :style="{marginTop:'.7rem'}">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate v-model="modal.scores.survive" show-score text-color="#ff9900"
                            :style="{marginTop:'.7rem'}">
                        </el-rate>
                    </el-form-item>
                    <el-form-item label="顺丰出装">
                        <el-select v-model="modal.items1" multiple>
                            <el-option v-for="item in items" :label="item.name" :key="item._id" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="modal.items2" multiple>
                            <el-option v-for="item in items" :label="item.name" :key="item._id" :value="item._id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="modal.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="modal.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战技巧">
                        <el-input type="textarea" v-model="modal.teamTips"></el-input>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skill">
                    <el-button @click="modal.skills.push({})" type="primary" size="small"><i
                            class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col :md="12" v-for="(item,index) in modal.skills" :key="index">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input v-model="item.desc"></el-input>
                            </el-form-item>
                            <el-form-item label="提示">
                                <el-input v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'"
                                    :show-file-list="false" :on-success="res => $set(item,'icon',res.imgSrc)"
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" size="small" @click="modal.skills.splice(index,1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-button type="primary" native-type="submit" size="normal" :style="{margin:'2rem'}">保存</el-button>
        </el-form>
    </div>
</template>


<script>
    export default {
        props: ['id'],
        data() {
            return {
                modal: {
                    name: '',
                    avatar: '',
                    categories: '', //这里指的是某个英雄对应的哪一个分类,
                    scores: {},
                    skills: []
                },
                categories: '', //所有分类的类型
                items: [] //说有物品的列表
            }
        },
        mounted() {
            this.id && this.fetch() //默认读取修改的内容
            this.fetchCategories() //获取所有英雄类型
            this.fetchItems() //获取所有物品的列表
        },
        watch: {
            $route: {
                handler: function (val, oldVal) {
                    debugger
                    if (val.name === 'HeroCreate') {
                        for (let key in this.modal) {
                            this.modal[key] = ''
                        }
                    }
                },
                // 深度观察监听
                deep: true
            },
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.$set(this.modal, 'avatar', res.imgSrc)
            },
            handleAvatarSuccess2(res, file) {
                debugger
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
                    result = await this.$http.put(`/reset/heros/${this.id}`, this.modal)
                } else {
                    result = await this.$http.post('reset/heros', this.modal)
                }

                if (result.status === 200) {
                    this.$router.push('/heros/list')
                    this.$message({
                        type: 'success',
                        message: '成功'
                    })
                }
            },
            async fetch() {
                //获取某一个id下的item 信息
                const result = await this.$http.get(`/reset/heros/${this.id}`)
                this.modal = Object.assign({}, this.modal, result.data)
            },

            async fetchCategories() {
                const result = await this.$http.get(`/reset/categories`)
                this.categories = result.data
            },
            async fetchItems() {
                //获取装备列表
                const result = await this.$http.get('/reset/items')
                if (result.status === 200) {
                    this.items = result.data
                }
            }
        }
    }
</script>
