/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Features',
      items: [
        'features/index',
        {
          type: 'category',
          label: 'Subscription Plans',
          items: [
            'features/subscription-plans/intro',
            'features/subscription-plans/overview',
            'features/subscription-plans/free-plan',
            'features/subscription-plans/paid-plan',
            {
              type: 'category',
              label: 'Architecture Decisions',
              items: [
                'features/subscription-plans/decisions/feature-flags',
                'features/subscription-plans/decisions/ui-blocking-patterns',
                'features/subscription-plans/decisions/error-messages',
              ],
            },
            {
              type: 'category',
              label: 'Database Schema',
              items: [
                'features/subscription-plans/schemas/subscription',
                'features/subscription-plans/schemas/usage-tracking',
              ],
            },
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
