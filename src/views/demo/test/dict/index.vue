<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增字典 </a-button>
        <a-button type="primary" @click="handleCreate"> 批量删除 </a-button>
        <a-button type="primary" @click="handleCreate"> 导入(json) </a-button>
        <a-button type="primary" @click="handleExportJsonDictData"> 导出(json) </a-button>
      </template>
      <template #bodyCell="{ column, record }" >


        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDeleteDictById.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {getDictByPage, exportJsonDictData, deleteDictById} from '/@/api/demo/dict';

  import { useDrawer } from '/@/components/Drawer';
  import DictDrawer from './DictDrawer.vue';

  import { columns, searchFormSchema } from './dict.data';
  import {ExportDictParams} from "/@/api/demo/model/dictModel";
  import {createMessage, useMessage} from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'DictManagement',
    components: { BasicTable, DictDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '数据字典列表',
        api: getDictByPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        beforeFetch:function (params) {
          return {
            pageParam: {
              pageSize: params.pageSize,
              pageNum: params.pageNum,
            },
            requestParam: {
              dictCode: params.dictCode,
              status: params.status,
              dictCaption: params.dictCaption,
            },
          };
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        rowKey: 'id',
        showSummary: true,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
        pagination: true,
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }
      function handleExportJsonDictData(){
        exportJsonDictData.apply(null);
      }

      const handleDeleteDictById = (record: Recordable) =>{
          deleteDictById.call(this,record.id).then(()=>{
            useMessage().createMessage.success("删除成功");
            handleSuccess();
          })
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleSuccess,
        handleExportJsonDictData,
        handleDeleteDictById
      };
    },
  });
</script>
