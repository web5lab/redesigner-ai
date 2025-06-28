import { createSelector } from "@reduxjs/toolkit";

const globalSelector = (state) => state.global;

export const UserSelector = createSelector(
  [globalSelector],
  (global) => global.User
);

export const websiteSelector = createSelector(
  [globalSelector],
  (global) => global.websites
);

export const editiorPageSelector = createSelector(
  [globalSelector],
  (global) => global.selctedPageForEditing
);

export const templateSelector = createSelector(
  [globalSelector],
  (global) => global.templates
);

export const publicTemplatesSelector = createSelector(
  [globalSelector],
  (global) => global.publicTemplates
);

export const totalTemplatesPagesSelector = createSelector(
  [globalSelector],
  (global) => global.totalPages
);
