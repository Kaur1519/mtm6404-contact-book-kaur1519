<script setup>
import { reactive } from 'vue';

const props = defineProps({
  initial: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: 'Save' },
});
const emit = defineEmits(['save', 'cancel']);

const form = reactive({
  firstName: props.initial.firstName || '',
  lastName: props.initial.lastName || '',
  email: props.initial.email || '',
  phone: props.initial.phone || '',
  company: props.initial.company || '',
  address: props.initial.address || '',
  notes: props.initial.notes || '',
});

const errors = reactive({ firstName: '', lastName: '', email: '' });

function validate() {
  errors.firstName = form.firstName.trim() ? '' : 'First name is required';
  errors.lastName = form.lastName.trim() ? '' : 'Last name is required';
  errors.email = /\S+@\S+\.\S+/.test(form.email) ? '' : 'Valid email is required';
  return !errors.firstName && !errors.lastName && !errors.email;
}

function onSubmit(e) {
  e.preventDefault();
  if (!validate()) return;
  emit('save', { ...form });
}
</script>

<template>
  <form class="card" @submit="onSubmit">
    <div class="row">
      <div class="field">
        <label>First Name *</label>
        <input class="input" v-model="form.firstName" placeholder="Ramandeep" />
        <small v-if="errors.firstName" class="error">{{ errors.firstName }}</small>
      </div>
      <div class="field">
        <label>Last Name *</label>
        <input class="input" v-model="form.lastName" placeholder="Kaur" />
        <small v-if="errors.lastName" class="error">{{ errors.lastName }}</small>
      </div>
    </div>

    <div class="row">
      <div class="field">
        <label>Email *</label>
        <input class="input" v-model="form.email" type="email" placeholder="name@example.com" />
        <small v-if="errors.email" class="error">{{ errors.email }}</small>
      </div>
      <div class="field">
        <label>Phone</label>
        <input class="input" v-model="form.phone" placeholder="+1 613 555 1234" />
      </div>
    </div>

    <div class="row">
      <div class="field">
        <label>Company</label>
        <input class="input" v-model="form.company" placeholder="Company" />
      </div>
      <div class="field">
        <label>Address</label>
        <input class="input" v-model="form.address" placeholder="Address" />
      </div>
    </div>

    <div class="field">
      <label>Notes</label>
      <textarea class="input" rows="4" v-model="form.notes" placeholder="Anything else..."></textarea>
    </div>

    <div class="actions">
      <button class="btn primary" type="submit">{{ submitLabel }}</button>
      <button class="btn" type="button" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<style scoped>
.field { flex:1; min-width:240px; display:flex; flex-direction:column; gap:6px; }
label { font-size:12px; color:#6b7280; }
.error { color:#b91c1c; }
</style>
