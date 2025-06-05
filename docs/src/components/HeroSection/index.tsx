import type { ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface HeroSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    className?: string;
    children?: ReactNode;
}

export function HeroSection({ title, description, imageSrc, imageAlt, className, children }: HeroSectionProps): ReactNode {
    return (
        <section className={clsx(styles.heroSection, className)}>
            <img src={imageSrc} alt={imageAlt} className={styles.heroLogo} />
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroDescription}>{description}</p>
            {children}
        </section>
    );
}
