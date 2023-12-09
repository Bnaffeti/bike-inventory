export const userRoles = {
  viewer: 'Viewer',
};

const devRoles = [
  'Project Zero Team',
  'IDP_DEV_NCL_PromotionsHQ_Users'
];

export const actionByRoles = {
  viewPricing: [userRoles.viewer, ...devRoles],
  booking: [userRoles.viewer, ...devRoles]
};
