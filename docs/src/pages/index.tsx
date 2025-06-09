import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { HeroSection } from "../components/HeroSection";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

export default function Home(): ReactNode {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={`Welcome to ${siteConfig.title}`}
            description="1ClickConnect: Fast, simple, and secure dApp and wallet integration for NEAR."
            wrapperClassName={styles.noScroll}
        >
            <main>
                <HeroSection
                    title="1ClickConnect"
                    description="Fast, simple, and secure dApp and wallet integration for NEAR."
                    imageSrc="img/near-logo.webp"
                    imageAlt="1ClickConnect Logo"
                >
                    <HomepageFeatures />
                </HeroSection>
            </main>
        </Layout>
    );
}
