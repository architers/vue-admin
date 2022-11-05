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
  import { formSchema } from './dict.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addDict, editDict } from '/@/api/demo/dict';
  import BasicModal from '/@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '/@/components/Modal';

  export default defineComponent({
    name: 'DictModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典' : '编辑字典'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (isUpdate.value) {
            editDict.call(null, values).then(() => {
              useMessage().createMessage.success('编辑成功');
              closeModal();
              emit('success');
            });
          } else {
            addDict.call(null, values).then(() => {
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
