import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const tenantColumns: BasicColumn[] = [
  {
    title: '租户ID',
    dataIndex: 'id',
    ifShow: false,
  },
  {
    title: '租户编码',
    dataIndex: 'tenantCode',
    width: 150,
  },
  {
    title: '租户名称',
    dataIndex: 'tenantCaption',
    width: 150,
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

export const tenantSearchFormSchema: FormSchema[] = [
  {
    field: 'tenantCode',
    label: '租户编码',
    component: 'Input',
    colProps: { span: 8 },
    helpMessage: '模糊匹配',
  },
  {
    field: 'tenantCaption',
    label: '租户名称',
    component: 'Input',
    colProps: { span: 8 },
    helpMessage: '模糊匹配',
    rulesMessageJoinLabel: true,
  },
  {
    field: 'status',
    label: '租户状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
];

export const tenantFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '租户ID',
    component: 'Input',
    required: true,
    show: false,
    defaultValue: ({ values }) => {
      return values.id;
    },
  },
  {
    field: 'tenantCode',
    label: '租户编码',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!(values.id && values.id > 0);
    },
  },
  {
    field: 'tenantCaption',
    label: '租户名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: '备注信息',
    component: 'InputTextArea',
    required: false,
  },
];
