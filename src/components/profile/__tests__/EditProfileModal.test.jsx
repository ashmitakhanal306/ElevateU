import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EditProfileModal from '../EditProfileModal';
import * as profileService from '../../../services/profileService';

// Mock profileService to prevent actual network/delay side effects during tests
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

  /**
   * Test 1: Renders pre-filled profile data in modal inputs.
   * Why it matters: Ensures students see their current profile information ready for editing when opening the modal.
   */
  it('renders modal with current profile data pre-filled in input fields', () => {
    render(<EditProfileModal {...defaultProps} />);

    // Personal info
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Alex Rivera');
    expect(screen.getByLabelText(/email address/i)).toHaveValue('alex.rivera@example.com');
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('9876543210');
    expect(screen.getByLabelText(/location/i)).toHaveValue('San Francisco, CA');

    // Existing skill chips
    expect(screen.getByText(/React · Advanced/i)).toBeInTheDocument();
    expect(screen.getByText(/Node.js · Intermediate/i)).toBeInTheDocument();
  });

  /**
   * Test 2: Typing in the name input updates its value.
   * Why it matters: Verifies form input binding operates properly as user types.
   */
  it('updates input value when user types in the Full name field', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Alex Morgan');

    expect(nameInput).toHaveValue('Alex Morgan');
  });

  /**
   * Test 3: Adding a new skill adds it to the visible skills list.
   * Why it matters: Confirms dynamic chip additions update local modal state and visual list immediately.
   */
  it('adds a new skill chip to the visible list when user types a skill name and clicks Add', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    const skillInput = screen.getByLabelText(/skill name/i);
    const addButton = screen.getByRole('button', { name: /add skill/i });

    await user.type(skillInput, 'TypeScript');
    await user.click(addButton);

    // Verify TypeScript chip appears in the list with default 'Beginner' level
    expect(screen.getByText(/TypeScript · Beginner/i)).toBeInTheDocument();
    // Input field should be cleared after adding
    expect(skillInput).toHaveValue('');
  });

  /**
   * Test 4: Removing a skill chip removes it from the visible skills list.
   * Why it matters: Verifies user can delete unwanted skills before saving.
   */
  it('removes a skill chip when clicking its remove (X) button', async () => {
    const user = userEvent.setup();
    render(<EditProfileModal {...defaultProps} />);

    expect(screen.getByText(/React · Advanced/i)).toBeInTheDocument();

    const removeReactBtn = screen.getByRole('button', { name: /remove React/i });
    await user.click(removeReactBtn);

    expect(screen.queryByText(/React · Advanced/i)).not.toBeInTheDocument();
    // Node.js should still remain
    expect(screen.getByText(/Node.js · Intermediate/i)).toBeInTheDocument();
  });

  /**
   * Test 5: Clicking "Save changes" calls updateProfile and triggers onSave with updated payload.
   * Why it matters: Verifies submission flow calls service and propagates saved changes back to parent component.
   */
  it('calls updateProfile and onSave callback with modified data when Save changes is clicked', async () => {
    const user = userEvent.setup();
    vi.spyOn(profileService, 'updateProfile').mockResolvedValue({
      success: true,
      profile: {
        ...initialProfile,
        personal: { ...initialProfile.personal, name: 'Alex Updated' },
      },
    });

    render(<EditProfileModal {...defaultProps} />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.clear(nameInput);
    await user.type(nameInput, 'Alex Updated');

    const saveButton = screen.getByRole('button', { name: /save changes/i });
    await user.click(saveButton);

    expect(profileService.updateProfile).toHaveBeenCalledTimes(1);
    expect(profileService.updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        personal: expect.objectContaining({ name: 'Alex Updated' }),
      })
    );

    expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Test 6: Clicking "Cancel" closes the modal without saving changes.
   * Why it matters: Prevents accidental profile mutations when user aborts editing.
   */
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
