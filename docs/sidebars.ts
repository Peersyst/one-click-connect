import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    docsSidebar: ["intro", "what_is_occ"],
    tutorialsSidebar: ["tutorials/intro"],
    changeLogSidebar: ["changelog/v0.1.x"],
    dappJavascriptSidebar: [
        "sdks/dapp/javascript/intro",
        "sdks/dapp/javascript/installation",
        "sdks/dapp/javascript/clients",
        "sdks/dapp/javascript/errors",
        "sdks/dapp/javascript/testing",
        "sdks/dapp/javascript/report_an_issue",
    ],
    walletJavascriptSidebar: [
        "sdks/wallet/javascript/intro",
        "sdks/wallet/javascript/installation",
        "sdks/wallet/javascript/client",
        "sdks/wallet/javascript/errors",
        "sdks/wallet/javascript/testing",
        "sdks/wallet/javascript/report_an_issue",
    ],
};

export default sidebars;
