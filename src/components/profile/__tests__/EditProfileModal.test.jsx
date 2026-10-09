import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditProfileModal from '../EditProfileModal';
import * as profileService from '../../../services/profileService';

vi.mock('../../../services/profileService', () => ({
  updateProfile: vi.fn(),
}));

describe('EditProfileModal Component', () => {
  const initialProfile = {
    personal: {
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      phone: '9876543210',
      location: 'San Francisco, CA',
    },
    education: [
      { id: 'edu-1', degree: 'B.S. CS', institution: 'State University', year: '2024', grade: '3.8 CGPA' },
    ],
    skills: [
      { id: 'sk-1', name: 'React', level: 'Advanced' },
      { id: 'sk-2', name: 'Node.js', level: 'Intermediate' },
    ],
    interests: ['Web Development'],
    careerGoals: ['Frontend Engineer'],
    experience: [],
  };

  const defaultProps = {
    profile: initialProfile,
    onClose: vi.fn(),
    onSave: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal with current profile data pre-filled in input fields (Step 1)', () => {
    render(<EditProfileModal {...defaultProps} />);
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Alex Rivera');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('alex.rivera@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('9876543210');
    expect(screen.getByLabelText(/location/i)).toHaveValue('San Francisco, CA');
  });

  it('updates input value when user types in the Full name field', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Alex Morgan');

    expect(nameInput).toHaveValue('Alex Morgan');
  });

  it('adds a new skill chip to the visible list when user types a skill name and clicks Add', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    // Navigate to Skills step (Step 3)
    await user.click(screen.getByRole('button', { name: /next/i })); // Go to Education
    await user.click(screen.getByRole('button', { name: /next/i })); // Go to Skills

    const skillInput = screen.getByLabelText(/skill name/i);
    const addButton = screen.getByRole('button', { name: /add skill/i });

    await user.type(skillInput, 'TypeScript');
    await user.click(addButton);

    expect(screen.getByText(/TypeScript · Beginner/i)).toBeInTheDocument();
    expect(skillInput).toHaveValue('');
  });

  it('removes a skill chip when clicking its remove (X) button', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    // Navigate to Skills step (Step 3)
    await user.click(screen.getByRole('button', { name: /next/i })); // Go to Education
    await user.click(screen.getByRole('button', { name: /next/i })); // Go to Skills

    expect(screen.getByText(/React · Advanced/i)).toBeInTheDocument();

    const removeReactBtn = screen.getByRole('button', { name: /remove React/i });
    await user.click(removeReactBtn);

    expect(screen.queryByText(/React · Advanced/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Node.js · Intermediate/i)).toBeInTheDocument();
  });

  it('calls updateProfile and onSave callback with modified data when Complete Profile is clicked', async () => {
    const user = userEvent.setup();
    vi.spyOn(profileService, 'updateProfile').mockResolvedValue({
      success: true,
      profile: {
        ...initialProfile,
        personal: { ...initialProfile.personal, name: 'Alex Updated' },
      },
    });

    render(<EditProfileModal {...defaultProps} />);

    // Step 1: Update name
    const nameInput = screen.getByLabelText(/full name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Alex Updated');

    // Navigate through steps
    await user.click(screen.getByRole('button', { name: /next/i })); // -> Education
    await user.click(screen.getByRole('button', { name: /next/i })); // -> Skills
    await user.click(screen.getByRole('button', { name: /next/i })); // -> Goals

    // Step 4: Complete
    const completeButton = screen.getByRole('button', { name: /complete profile/i });
    await user.click(completeButton);

    expect(profileService.updateProfile).toHaveBeenCalledTimes(1);
    expect(profileService.updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        personal: expect.objectContaining({ name: 'Alex Updated' }),
      })
    );

    expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('closes modal without calling updateProfile or onSave when Cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, ' Changed');

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(profileService.updateProfile).not.toHaveBeenCalled();
    expect(defaultProps.onSave).not.toHaveBeenCalled();
  });
});
