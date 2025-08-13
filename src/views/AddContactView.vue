<script setup>
import { useRouter } from 'vue-router';
import ContactForm from '../components/ContactForm.vue';
import { addContact } from '../store/contacts';

const router = useRouter();

function handleSave(data) {
  const id = addContact(data);
  router.push(`/contacts/${id}`);
}

function handleCancel() {
  router.push('/');
}
</script>

<template>
  <ContactForm submitLabel="Create" @save="handleSave" @cancel="handleCancel" />
</template>
