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
          label: 'Planos de Assinatura',
          items: [
            'features/subscription-plans/intro',
            'features/subscription-plans/overview',
            'features/subscription-plans/use-cases',
            'features/subscription-plans/free-plan',
            'features/subscription-plans/paid-plan',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
