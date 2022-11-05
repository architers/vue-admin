<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerDictModal"
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
  import BasicModal from '/@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '/@/components/Modal';
  import { tenantFormSchema } from '/@/views/demo/test/tenant/tenant.data';
  import { addTenant, editTenant } from '/@/api/demo/tenant';

  export default defineComponent({
    name: 'DictModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: tenantFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDictModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增租户' : '编辑租户'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (isUpdate.value) {
            editTenant.call(null, values).then(() => {
              useMessage().createMessage.success('编辑成功');
              closeModal();
              emit('success');
            });
          } else {
            addTenant.call(null, values).then(() => {
              useMessage().createMessage.success('添加成功');
              closeModal();
              emit('success');
            });
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerDictModal,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
