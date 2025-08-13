<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getContactById, deleteContact } from '../store/contacts';

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const contact = getContactById(id);

const fullName = computed(() =>
  contact ? `${contact.firstName} ${contact.lastName}`.trim() : ''
);

function onDelete() {
  if (!contact) return;
  if (confirm('Delete this contact?')) {
    deleteContact(contact.id);
    router.push('/');
  }
}
</script>

<template>
  <section v-if="contact" class="card">
    <h2 style="margin-top:0">{{ fullName }}</h2>
    <p><strong>Email:</strong> {{ contact.email || '—' }}</p>
    <p><strong>Phone:</strong> {{ contact.phone || '—' }}</p>
    <p><strong>Company:</strong> {{ contact.company || '—' }}</p>
    <p><strong>Address:</strong> {{ contact.address || '—' }}</p>
    <p><strong>Notes:</strong> {{ contact.notes || '—' }}</p>

    <div class="actions" style="margin-top:12px">
      <router-link class="btn" :to="`/contacts/${contact.id}/edit`">Edit</router-link>
      <button class="btn" @click="onDelete">Delete</button>
      <router-link class="btn" to="/">Back</router-link>
    </div>
  </section>

  <section v-else class="card">
    <p>Contact not found.</p>
    <router-link class="btn" to="/">Back to list</router-link>
  </section>
</template>
