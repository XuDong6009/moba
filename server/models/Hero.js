//创建CategoryModel

//1.引入mongoose
const mongoose = require('mongoose')
//2.创建约束 Schema
const schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    title: {
        type: String
    },
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Categofy'
    }], //多个分类
    scores: {
        difficulty: {
            type: Number
        },
        skill: {
            type: Number
        },
        attack: {
            type: Number
        },
        survive: {
            type: Number
        },
    },
    skills: [{
        icon: {
            type: String
        },
        name: {
            type: String
        },
        desc: {
            type: String
        },
        tips: {
            type: String
        },
    }],
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    usageTips: {
        type: String,
    },
    battleTips: {
        type: String,
    },
    teamTips: {
        type: String,
    },
    parenters: [{
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Hero'
        },
        description: {
            type: String
        }
    }]

})

//3.创建模型 与集合对应可以操作集合
const model = mongoose.model('Hero', schema)

//4.默认暴露
module.exports = model