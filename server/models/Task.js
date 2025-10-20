import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    default: 'default',
    index: true // 为多用户支持做准备
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    default: ''
  },
  dueAt: {
    type: Number,
    default: null
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Number,
    default: () => Date.now()
  },
  updatedAt: {
    type: Number,
    default: () => Date.now()
  }
});

// 创建复合索引以提高查询性能
taskSchema.index({ userId: 1, completed: 1 });
taskSchema.index({ userId: 1, createdAt: -1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;

