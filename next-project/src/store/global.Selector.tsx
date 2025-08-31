import { createSelector } from "@reduxjs/toolkit"
import { RootState } from './index'

const globalSelector = (state: RootState) => state.global

export const UserSelector = createSelector(
  [globalSelector],
  (global) => global.User
)

export const chatSelector = createSelector(
  [globalSelector],
  (global) => global.chatHistory
)

export const websiteSelector = createSelector(
  [globalSelector],
  (global) => global.websites
)

export const editorPageSelector = createSelector(
  [globalSelector],
  (global) => global.selectedPageForEditing
)

export const templateSelector = createSelector(
  [globalSelector],
  (global) => global.templates
)

export const publicTemplatesSelector = createSelector(
  [globalSelector],
  (global) => global.publicTemplates
)

export const totalTemplatesPagesSelector = createSelector(
  [globalSelector],
  (global) => global.totalPages
)

export const websiteQueueSelector = createSelector(
  [globalSelector],
  (global) => global.websiteQueue
)

export const fullScreenPreviewSelector = createSelector(
  [globalSelector],
  (global) => global.fullScreenPreview
)