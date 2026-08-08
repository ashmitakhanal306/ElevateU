/**
 * hitlManager.js — Day 5: Human-In-The-Loop (HITL) Action Approval Manager.
 * Intercepts side-effect operations (e.g. updating profile target role, applying to jobs)
 * and requires explicit user confirmation via UI widget before execution.
 */

export const HITL_ACTION_TYPES = {
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  APPLY_JOB: 'APPLY_JOB',
  SAVE_RESUME_SECTION: 'SAVE_RESUME_SECTION'
};

class HitlManager {
  /**
   * Checks if an action requires Human-In-The-Loop user approval.
   * 
   * @param {string} actionType
   * @param {Object} payload
   * @returns {Object} Pending HITL Approval Card object
   */
  createPendingAction(actionType, payload) {
    return {
      id: `hitl-${Date.now()}`,
      actionType,
      payload,
      status: 'PENDING', // 'PENDING' | 'APPROVED' | 'REJECTED'
      promptMessage: this.getPromptMessage(actionType, payload)
    };
  }

  getPromptMessage(actionType, payload) {
    switch (actionType) {
      case HITL_ACTION_TYPES.UPDATE_PROFILE:
        return `Confirm updating your primary Target Role to **"${payload.targetRole}"**?`;
      case HITL_ACTION_TYPES.APPLY_JOB:
        return `Confirm submitting application to **${payload.company}** for **"${payload.roleTitle}"**?`;
      case HITL_ACTION_TYPES.SAVE_RESUME_SECTION:
        return `Confirm saving optimized ATS bullet points into your profile resume?`;
      default:
        return `Confirm executing action "${actionType}"?`;
    }
  }

  async executeApprovedAction(hitlAction) {
    console.info('[HITL] User APPROVED action:', hitlAction);
    // In production, execute the side-effect operation (e.g. update profile service)
    return { success: true, message: `Action "${hitlAction.actionType}" executed successfully!` };
  }
}

export const hitlManager = new HitlManager();
