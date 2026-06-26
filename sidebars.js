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
        {
          type: 'category',
          label: 'Autoagendamento',
          items: [
            'features/autoagendamento/intro',
            'features/autoagendamento/overview',
            'features/autoagendamento/use-cases',
            'features/autoagendamento/integracoes',
            'features/autoagendamento/duvidas',
          ],
        },
      ],
    },
  ],
};

module.exports = sidebars;
