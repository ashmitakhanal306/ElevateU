import React from 'react';
import { User } from 'lucide-react';
import Input from '../ui/Input';

export default function ProfileBasicsStep({ editData, setPersonal, validationErrors }) {
  return (
    <section className="animate-fade-in-up">
      <div className="flex items-center gap-2 font-bold text-sm text-secondary border-b border-border pb-3 mb-4">
        <User className="h-4 w-4 shrink-0" />
        Personal Information
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full name *"
          value={editData.personal.name}
          onChange={(e) => setPersonal('name', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
          placeholder="Your full name (alphabets only)"
          error={validationErrors.name}
        />
        <Input
          label="Email address"
          type="email"
          value={editData.personal.email}
          onChange={(e) => setPersonal('email', e.target.value)}
          placeholder="you@example.com"
        />
        <Input
          label="Phone number *"
          type="tel"
          value={editData.personal.phone}
          onChange={(e) => setPersonal('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="e.g. 9876543210 (10 digits numeric)"
          error={validationErrors.phone}
        />
        <Input
          label="Location *"
          value={editData.personal.location}
          onChange={(e) => setPersonal('location', e.target.value)}
          placeholder="City, State"
          error={validationErrors.location}
        />
      </div>
    </section>
  );
}
