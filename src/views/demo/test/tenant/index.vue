<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增租户 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'dictCaption'">
          <a>{dictCaption}</a>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                onClick: handleEdit.bind(null, record),
                label: '编辑',
              },
              {
                color: 'error',
                label: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDeleteDictById.bind(null, record),
                },
              },
              {
                onClick: handleDictDataDetail.bind(null, record),
                label: '管理数据',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictModal @register="registerDictModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getDictByPage, exportJsonDictData, deleteDictById } from '/@/api/demo/dict';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import DictModal from '/@/views/demo/test/dict/DictModal.vue';
  import DictImport from '/@/views/demo/test/dict/DictImport.vue';
  import { merge } from 'lodash-es';
  import { useGo } from '/@/hooks/web/usePage';
  import { tenantColumns, tenantSearchFormSchema } from '/@/views/demo/test/tenant/tenant.data';
  import {getTenantsByPage} from "/@/api/demo/tenant";
  export default defineComponent({
    name: 'DictManagement',
    components: { DictModal, BasicTable, TableAction },
    setup() {
      const [registerDictModal, { openModal }] = useModal();
      const go = useGo();
      const [registerTable, { reload, getSelectRowKeys, getForm }] = useTable({
        title: '租户列表',
        api: getTenantsByPage,
        columns: tenantColumns,
        formConfig: {
          labelWidth: 120,
          schemas: tenantSearchFormSchema,
        },
        rowSelection: {
          type: 'checkbox',
        },
        beforeFetch: function (params) {
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
        emptyDataIsShowTable: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: true,
        rowKey: 'id',
        showSummary: true,
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
        pagination: true,
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }
      function handleExportJsonDictData() {
        let fieldsValue = getForm().getFieldsValue();
        const param = merge(
          {
            checkIds: getSelectRowKeys(),
          },
          fieldsValue,
        );
        exportJsonDictData.call(null, param);
      }

      function handleImportJsonDictData() {
        DictImport.showData();
      }

      const handleDeleteDictById = (record: Recordable) => {
        deleteDictById.call(this, record.id).then(() => {
          useMessage().createMessage.success('删除成功');
          handleSuccess();
        });
      };

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDictDataDetail(record: Recordable) {
        let uri =
          '/test/dict_data?dictCaption=' +
          record.dictCaption +
          '&dictCode=' +
          record.dictCode +
          '&tenantId=' +
          record.tenantId;
        go(uri);
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleSuccess,
        handleExportJsonDictData,
        handleImportJsonDictData,
        handleDeleteDictById,
        registerDictModal,
        handleDictDataDetail,
      };
    },
  });
</script>
