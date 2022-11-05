<template>
  <PageWrapper contentBackground @back="goBack">

    <BasicTable @register="registerDictDataTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreateDictData"> 新增字典值 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'dictCaption'">
          <a>{dictCaption}</a>
        </template>
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleDictDataEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'center',
                  confirm: handleDeleteDictDataById.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
  <DictDataModal @register="registerDictDataModal" @success="handleSuccess" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { dictDataColumns, searchDictDataFormSchema } from './dictdata.data';
  import { merge } from 'lodash-es';
  import { getDictDataByPage, deleteDictDataById } from '/@/api/demo/dict';
  import { useModal } from '/@/components/Modal';
  import DictDataModal from '/@/views/demo/test/dict/DictDataModal.vue';

  export default defineComponent({
    name: 'DictData',
    components: { PageWrapper, DictDataModal, BasicTable, TableAction },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此处可以得到用户ID
      const query = route.query;
      const [registerDictDataModal, { openModal }] = useModal();
      const { createMessage } = useMessage();
      const [registerDictDataTable, { reload }] = useTable({
        api: getDictDataByPage,
        title: query.dictCaption + '-数据字典值',
        columns: dictDataColumns,
        formConfig: {
          labelWidth: 120,
          schemas: searchDictDataFormSchema,
        },
        beforeFetch: function (params) {
          return {
            pageParam: {
              pageSize: params.pageSize,
              pageNum: params.pageNum,
            },
            requestParam: merge(
              {
                dictCode: query.dictCode,
                tenantId: query.tenantId,
              },
              params,
            ),
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
      // TODO
      // 本页代码仅作演示，实际应当通过userId从接口获得用户的相关资料
      function handleSuccess() {
        reload();
      }

      function handleCreateDictData() {
        openModal(true, { query, isUpdate: false });
      }
      function handleDictDataEdit(record: Recordable) {
        openModal(true, { record, isUpdate: true });
      }
      function handleDeleteDictDataById(record: Recordable) {
        deleteDictDataById.call(null, record.id).then(() => {
          createMessage.success('删除成功');
          //刷新页面
          handleSuccess();
        });
      }
      function changeDictDataStatus(record){

      }
      // 页面左侧点击返回链接时的操作
      function goBack() {
        // 本例的效果时点击返回始终跳转到账号列表页，实际应用时可返回上一页
        go('/test/dict');
      }
      return {
        goBack,
        registerDictDataTable,
        handleSuccess,
        handleCreateDictData,
        handleDictDataEdit,
        handleDeleteDictDataById,
        registerDictDataModal,
        changeDictDataStatus,
        DictDataModal,
      };
    },
  });
</script>

<style></style>
