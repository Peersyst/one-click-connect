import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "1ClickConnect",
    tagline: "1ClickConnect",
    favicon: "img/favicon.ico",

    // Set the production url of your site here
    url: "https://your-docusaurus-site.example.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "Peersyst", // Usually your GitHub org/user name.
    projectName: "one-click-connect", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                    // Useful options to enforce blogging best practices
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/docusaurus-social-card.jpg",
        navbar: {
            title: "1ClickConnect",
            logo: {
                alt: "1ClickConnect Logo",
                src: "img/logo.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "docsSidebar",
                    position: "left",
                    label: "Docs",
                },
                {
                    type: "docSidebar",
                    sidebarId: "guidesSidebar",
                    position: "left",
                    label: "Guides",
                },
                {
                    type: "dropdown",
                    label: "SDKs",
                    position: "left",
                    items: [
                        {
                            type: "html",
                            value: '<div class="dropdown-section">DApp</div>',
                            className: "dropdown-section-header",
                        },
                        {
                            label: "JavaScript",
                            to: "/docs/sdks/dapp/javascript/intro",
                        },
                        {
                            type: "html",
                            value: '<div class="dropdown-section">Wallet</div>',
                            className: "dropdown-section-header",
                        },
                        {
                            label: "JavaScript",
                            to: "/docs/sdks/wallet/javascript/intro",
                        },
                    ],
                },
                {
                    type: "docSidebar",
                    sidebarId: "changeLogSidebar",
                    position: "left",
                    label: "Changelog",
                },
                {
                    href: "https://github.com/Peersyst/one-click-connect",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Docs",
                            to: "/docs/intro",
                        },
                    ],
                },
                {
                    title: "More",
                    items: [
                        {
                            label: "Changelog",
                            to: "/changelog",
                        },
                        {
                            label: "GitHub",
                            href: "https://github.com/Peersyst/one-click-connect",
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} 1ClickConnect.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
