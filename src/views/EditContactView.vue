<script setup>
import { useRoute, useRouter } from 'vue-router';
import ContactForm from '../components/ContactForm.vue';
import { getContactById, updateContact } from '../store/contacts';

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const contact = getContactById(id);

function handleSave(data) {
  if (!contact) return;
  updateContact(id, data);
  router.push(`/contacts/${id}`);
}

function handleCancel() {
  router.push(`/contacts/${id}`);
}
</script>

<template>
  <section v-if="contact">
    <ContactForm :initial="contact" submitLabel="Update" @save="handleSave" @cancel="handleCancel" />
  </section>
  <section v-else class="card">
    <p>Contact not found.</p>
    <router-link class="btn" to="/">Back to list</router-link>
  </section>
</template>
