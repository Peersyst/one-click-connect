import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { HeroSection } from "../components/HeroSection";
import { CardWithHeader } from "../components/CardWithHeader";
import config from "@site/docusaurus.config";

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    const cardsData = [
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

    return (
        <Layout
            title={`Welcome to ${siteConfig.title}`}
            description="1ClickConnect: Fast, simple, and secure dApp and wallet integration for NEAR."
        >
            <main>
                <HeroSection
                    title="1ClickConnect"
                    description="Fast, simple, and secure dApp and wallet integration for NEAR."
                    imageSrc="img/near-logo.webp"
                    imageAlt="1ClickConnect Logo"
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "1.5rem",
                            flexWrap: "nowrap",
                            width: "100%",
                            maxWidth: "1200px",
                            margin: "0 auto",
                        }}
                    >
                        {cardsData.map((card) => (
                            <CardWithHeader
                                key={card.title}
                                headerImageSrc={card.headerImageSrc}
                                headerImageAlt={card.headerImageAlt}
                                title={card.title}
                                description={card.description}
                                links={card.links}
                            />
                        ))}
                    </div>
                </HeroSection>
            </main>
        </Layout>
    );
}
