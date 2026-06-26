// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DH Platform Docs',
  tagline: 'Documentation for Detail Lab development',
  favicon: 'img/favicon.ico',
  url: 'https://docs.detaillab.com',
  baseUrl: '/',

  organizationName: 'driverhub',
  projectName: 'dh-platform-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/driverhub/dh-platform/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/driverhub/dh-platform/tree/main/docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'DH Platform',
        logo: {
          alt: 'DH Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            label: 'Docs',
          },
          {
            href: 'https://github.com/driverhub/dh-platform',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Features',
                to: '/docs/features',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/driverhub/dh-platform',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DH Platform. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'typescript', 'javascript'],
      },
    }),
};

module.exports = config;
