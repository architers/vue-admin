<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 添加用户 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
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
                  confirm: handleDeleteById.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <TenantModal @register="registerTenantModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { useGo } from '/@/hooks/web/usePage';
  import { tenantColumns, tenantSearchFormSchema } from '/@/views/demo/test/tenant/tenant.data';
  import { deleteById, getTenantsByPage } from '/@/api/demo/tenant';
  import TenantModal from '/@/views/demo/test/tenant/TenantModal.vue';
  export default defineComponent({
    name: 'UserManagement',
    components: { TenantModal, BasicTable, TableAction },
    setup() {
      const [registerTenantModal, { openModal }] = useModal();
      const go = useGo();
      const [registerTable, { reload }] = useTable({
        title: '租户列表',
        api: getTenantsByPage,
        columns: tenantColumns,
        formConfig: {
          labelWidth: 120,
          schemas: tenantSearchFormSchema,
        },
        beforeFetch: function (params) {
          return {
            pageParam: {
              pageSize: params.pageSize,
              pageNum: params.pageNum,
            },
            requestParam: {
              tenantCode: params.tenantCode,
              status: params.status,
              tenantCaption: params.tenantCaption,
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

      function handleDeleteById(record: Recordable) {
        deleteById.call(null, record.id).then(() => {
          useMessage().createMessage.success('删除成功');
          //刷新页面
          handleSuccess();
        });
      }

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
        handleDeleteById,
        registerTenantModal,
        handleDictDataDetail,
      };
    },
  });
</script>
