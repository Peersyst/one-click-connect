import config from "@site/docusaurus.config";

export const homeCardsData = [
    {
        headerImageSrc: "img/guides.png",
        headerImageAlt: "NEAR Protocol",
        title: "Guides",
        description: "This section has step-by-step guides to help you through the project.",
        links: [
            {
                label: "Introduction",
                href: `${config.baseUrl}/docs/guides/intro`,
            },
            {
                label: "Integrate Dapp",
                href: `${config.baseUrl}/docs/guides/integrate_dapp`,
            },
            {
                label: "Integrate Wallet",
                href: `${config.baseUrl}/docs/guides/integrate_wallet`,
            },
        ],
    },
    {
        headerImageSrc: "img/sdk.png",
        headerImageAlt: "DApp SDK (JavaScript)",
        title: "DApp SDK (JavaScript)",
        description: "Learn how to integrate the DApp SDK into your JavaScript applications.",
        links: [
            {
                label: "Introduction",
                href: `${config.baseUrl}/docs/sdks/dapp/javascript/intro`,
            },
            {
                label: "Installation",
                href: `${config.baseUrl}/docs/sdks/dapp/javascript/installation`,
            },
            {
                label: "Clients",
                href: `${config.baseUrl}/docs/sdks/dapp/javascript/clients`,
            },
        ],
    },
    {
        headerImageSrc: "img/wallet.png",
        headerImageAlt: "Wallet SDK (JavaScript)",
        title: "Wallet SDK (JavaScript)",
        description: "Integrate the Wallet SDK into your JavaScript wallet for seamless communication.",
        links: [
            {
                label: "Introduction",
                href: `${config.baseUrl}/docs/sdks/wallet/javascript/intro`,
            },
            {
                label: "Installation",
                href: `${config.baseUrl}/docs/sdks/wallet/javascript/installation`,
            },
            {
                label: "Client",
                href: `${config.baseUrl}/docs/sdks/wallet/javascript/client`,
            },
        ],
    },
];
