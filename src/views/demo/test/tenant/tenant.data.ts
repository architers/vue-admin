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
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '字典编码ID',
    required: false,
    component: 'Input',
    show: false,
  },
  {
    field: 'dictCode',
    label: '字典编码',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return values.id && values.id > 0;
    },
  },
  {
    field: 'dictCaption',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];
