import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { changeDictDataStatus } from '/@/api/demo/dict';
export const dictDataColumns: BasicColumn[] = [
  {
    title: '字典编码',
    dataIndex: 'dictCode',
    width: 200,
  },
  {
    title: '字典值名称',
    dataIndex: 'dataCaption',
    width: 200,
  },
  {
    title: '字典值编码',
    dataIndex: 'dataCode',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 150,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          changeDictDataStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`修改字典值状态成功`);
            })
            .catch(() => {
              createMessage.error('修改字典值状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
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

export const searchDictDataFormSchema: FormSchema[] = [
  {
    field: 'dataCode',
    label: '字典值编码',
    component: 'Input',
    colProps: { span: 8 },
    helpMessage: '前缀匹配',
  },
  {
    field: 'dataCaption',
    label: '字典值名称',
    component: 'Input',
    colProps: { span: 8 },
    helpMessage: '模糊匹配',
    rulesMessageJoinLabel: true,
  },
];

export const dictDataFormSchema: FormSchema[] = [
  {
    label: '字典编码',
    field: 'dictCode',
    component: 'Input',
    required: true,
    show: false,
  },
  {
    label: '主键ID',
    field: 'id',
    component: 'Input',
    required: false,
    show: false,
  },
  {
    label: '字典值名称',
    field: 'dataCaption',
    component: 'Input',
    required: true,
  },
  {
    label: '字典值编码',
    field: 'dataCode',
    show: true,
    required: true,
    component: 'Input',
  },
  {
    label: '状态',
    field: 'status',
    component: 'Select',
    required: true,
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
