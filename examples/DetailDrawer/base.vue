<template>
  <div class="">
    <el-button type="primary" @click="add">新增</el-button>
    <el-button type="success" @click="edit">修改</el-button>
    <el-button type="success" @click="query">查看</el-button>
    <DetailDrawer
      :id="id"
      v-model="show"
      size="800"
      baseurl="dessert"
      title="个人信息"
      :type="type"
      :fields="fields"
      :data.sync="data"
      :form="{ labelWidth: '100px' }"
      @on-ok="onOk"
    />
  </div>
</template>

<script>
import { CREATE, READ, UPDATE } from '@/const/buttons';
import {
  SimpleInput,
  SelectInput,
  DateInput,
  SwitchInput,
  RadioInput,
  CheckboxInput,
  NumberInput,
  TextAreaInput,
} from '@/utils/form';

export default {
  data() {
    return {
      id: '',
      show: false,
      type: '',
      data: {},
      fields: [
        new SimpleInput({ prop: 'name', label: '姓名' }),
        new SelectInput({
          prop: 'province',
          label: '省份',
          options: [
            { label: '河南', value: 'henan' },
            { label: '北京', value: 'beijing' },
            { label: '上海', value: 'shanghai' },
            { label: '广州', value: 'guangzhou' },
            { label: '深圳', value: 'shenzhen' },
          ],
        }),
        new DateInput({ prop: 'birthday', label: '出生年月' }),
        new SwitchInput({ prop: 'adult', label: '是否成年' }),
        new CheckboxInput({
          prop: 'food',
          label: '食物',
          options: [
            { value: '选项1', label: '黄金糕' },
            { value: '选项2', label: '双皮奶' },
            { value: '选项3', label: '蚵仔煎' },
            { value: '选项4', label: '龙须面' },
            { value: '选项5', label: '北京烤鸭' },
          ],
        }),
        new RadioInput({
          prop: 'country',
          label: '国籍',
          options: [
            { value: 'cn', label: '中国' },
            { value: 'us', label: '美国' },
            { value: 'jp', label: '日本' },
          ],
        }),
        new NumberInput({ prop: 'age', label: '年龄', input: { min: 0, max: 1000 } }),
        new TextAreaInput({ prop: 'remark', label: '备注' }),
      ],
    };
  },
  created() {},
  methods: {
    add() {
      this.id = '';
      this.show = true;
      this.type = CREATE;
    },
    edit() {
      this.id = 'sdji923sf';
      this.show = true;
      this.type = UPDATE;
    },
    query() {
      this.id = 'sdji923sf';
      this.show = true;
      this.type = READ;
    },
    onOk() {
      console.log('操作完毕');
    },
  },
};
</script>

<style lang="scss" scoped></style>
