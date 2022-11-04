import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典编码',
    dataIndex: 'dictCode',
    width: 200,
  },
  {
    title: '字典名称',
    dataIndex: 'dictCaption',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 180,
  },
  {
    title: '更新人',
    dataIndex: 'updateBy',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictCaption',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'dictCode',
    label: '字典编码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 5 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'dictCode',
    label: '字典编码',
    required: true,
    component: 'Input',
  },
];
