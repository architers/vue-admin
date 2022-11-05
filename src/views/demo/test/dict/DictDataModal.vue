<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDictDataModal"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addDictData, editDictData } from '/@/api/demo/dict';
  import BasicModal from '/@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '/@/components/Modal';
  import { dictDataFormSchema } from '/@/views/demo/test/dict/dictdata.data';

  export default defineComponent({
    name: 'DictModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: dictDataFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDictDataModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if(isUpdate.value){
          setFieldsValue({
            ...data.record,
          });
        } else {
          setFieldsValue({
            ...data.query,
          });
        }

      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典值' : '编辑字典值'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (isUpdate.value) {
            editDictData
              .call(null, values)
              .then(() => {
                useMessage().createMessage.success('编辑成功');
                closeModal();
                emit('success');
              })
          } else {
            addDictData
              .call(null, values)
              .then(() => {
                useMessage().createMessage.success('添加成功');
                closeModal();
                emit('success');
              })
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerDictDataModal,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
