// https://nextra.site/docs/docs-theme/theme-configuration
import { useRouter } from "next/router";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

const logo = (
  <svg
    className="nextra-logo"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 646 96"
    height="20"
    fill="none"
  >
    <g clipPath="url(#a)">
      <path
        fill="url(#b)"
        d="m108.53 75.69-17.72 19a4.099 4.099 0 0 1-3 1.31h-84a2.06 2.06 0 0 1-1.51-3.46l17.7-19a4.1 4.1 0 0 1 3-1.31h84a2.05 2.05 0 0 1 1.53 3.46ZM90.81 37.42a4.14 4.14 0 0 0-3-1.31h-84a2.06 2.06 0 0 0-1.51 3.46L20 58.58a4.14 4.14 0 0 0 3 1.31h84a2.06 2.06 0 0 0 1.5-3.46L90.81 37.42Zm-87-13.65h84a4.098 4.098 0 0 0 3-1.31l17.72-19a2.052 2.052 0 0 0-.387-3.14A2.05 2.05 0 0 0 107 0H23a4.1 4.1 0 0 0-3 1.31l-17.7 19a2.06 2.06 0 0 0 1.51 3.46Z"
      />
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        d="M210.94 40.6H166V25.8h56.62V11h-56.77A14.768 14.768 0 0 0 151 25.69v15a14.768 14.768 0 0 0 14.85 14.71h45v14.8h-58.78V85h58.87a14.766 14.766 0 0 0 13.695-9.044 14.76 14.76 0 0 0 1.155-5.646v-15a14.769 14.769 0 0 0-14.85-14.71ZM298 11h-45.11a14.773 14.773 0 0 0-13.731 9.035A14.752 14.752 0 0 0 238 25.69v44.62c.01 1.943.404 3.865 1.159 5.656A14.77 14.77 0 0 0 252.89 85H298a14.768 14.768 0 0 0 14.85-14.69V25.69a14.76 14.76 0 0 0-4.383-10.42A14.76 14.76 0 0 0 298 11Zm-.11 59.2H253V25.8h44.87l.02 44.4ZM456 11h-44a14.768 14.768 0 0 0-14.85 14.69V85h15V60.69h43.8V85h15V25.69A14.766 14.766 0 0 0 456 11Zm-.11 34.89h-43.8V25.8h43.8v20.09ZM631.15 11h-44a14.768 14.768 0 0 0-14.85 14.69V85h15V60.69H631V85h15V25.69a14.76 14.76 0 0 0-4.383-10.42A14.771 14.771 0 0 0 631.15 11ZM631 45.89h-43.8V25.8H631v20.09ZM544 70.2h-6l-21.45-53a9.887 9.887 0 0 0-9.16-6.2h-13.31a9.845 9.845 0 0 0-9.131 6.035 9.86 9.86 0 0 0-.769 3.765V85h15V25.8h6l21.44 53a9.915 9.915 0 0 0 9.2 6.16h13.31a9.843 9.843 0 0 0 6.98-2.85 9.853 9.853 0 0 0 2.92-6.95V11H544v59.2ZM341.1 11h-15v59.31a14.763 14.763 0 0 0 4.4 10.438A14.775 14.775 0 0 0 341 85h45V70.2h-44.9V11Z"
      />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1="10.81"
        x2="98.89"
        y1="98.29"
        y2="-1.01"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset=".08" stopColor="#9945FF" />
        <stop offset=".3" stopColor="#8752F3" />
        <stop offset=".5" stopColor="#5497D5" />
        <stop offset=".6" stopColor="#43B4CA" />
        <stop offset=".72" stopColor="#28E0B9" />
        <stop offset=".97" stopColor="#19FB9B" />
      </linearGradient>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h646v96H0z" />
      </clipPath>
    </defs>
  </svg>
);

const config: DocsThemeConfig = {
  docsRepositoryBase:
    "https://github.com/solana-foundation/solana-com/tree/main/src/pages/quickstart",
  logo,
  logoLink: "/quickstart",
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig();
    const { asPath } = useRouter();

    // Dynamic title setup based on the path
    const title =
      asPath === "/"
        ? pageTitle // Use default pageTitle if on the homepage
        : `${pageTitle} – Solana NotDocs`;

    const socialCard =
      asPath === "/" || !pageTitle
        ? "https://nextra.site/og.jpeg"
        : `https://nextra.site/api/og?title=${encodeURIComponent(pageTitle)}`;

    return (
      <>
        <title>{title}</title>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Make beautiful websites with Next.js & MDX."
        />
        <meta
          name="og:description"
          content="Make beautiful websites with Next.js & MDX."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="nextra.site" />
        <meta name="twitter:url" content="https://nextra.site" />
        <meta
          name="og:title"
          content={title ? title + " – Nextra" : "Nextra"}
        />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Nextra" />
        <link
          rel="icon"
          href="https://solana.com/favicon-32x32.png"
          type="image/png"
          sizes="32x32"
        />
      </>
    );
  },
  project: {
    link: "https://github.com/ZYJLiu/notdocs",
  },
  chat: {
    link: "https://solana.stackexchange.com/",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 105 124"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M88 80H99V124H0V80H11V113H88V80Z"
          fill="#bbb"
        />
        <path
          d="M22.9879 76.73L77.0129 88.085L79.2839 77.285L25.2589 65.925L22.9879 76.73ZM30.1369 50.861L80.1829 74.169L84.8449 64.16L34.7979 40.852L30.1369 50.861ZM43.9849 26.308L86.4129 61.639L93.4789 53.154L51.0509 17.824L43.9849 26.308ZM71.3719 0.192001L62.5119 6.782L95.4599 51.082L104.32 44.493L71.3719 0.192001ZM22 102H77V91H22V102Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  docsRepositoryBase: "https://github.com/ZYJLiu/notdocs/tree/main",
  footer: {
    component: false,
  },
  // footer: {
  //   content: (
  //     <div>
  //       <a
  //         href="https://nextra.site"
  //         target="_blank"
  //         rel="noreferrer"
  //         className="flex items-center gap-2 text-xs"
  //       >
  //         Powered by{" "}
  //         <svg
  //           viewBox="0 0 361 70"
  //           fill="currentColor"
  //           className="h-3 shrink-0"
  //         >
  //           <path d="M114.913 33.2763v28.7642h-11.57V12.9496h11.059v8.3416h.575c1.129-2.7485 2.93-4.9325 5.401-6.5518 2.493-1.6193 5.572-2.429 9.237-2.429 3.388 0 6.339.7244 8.853 2.1733 2.535 1.4489 4.496 3.5476 5.88 6.2962 1.407 2.7486 2.099 6.0831 2.078 10.0035v31.2571h-11.57V32.5732c0-3.2813-.852-5.8487-2.557-7.7024-1.683-1.8537-4.016-2.7806-6.999-2.7806-2.024 0-3.824.4475-5.401 1.3424-1.556.8736-2.781 2.1413-3.676 3.8032-.873 1.662-1.31 3.6755-1.31 6.0405Zm61.407 29.723c-4.922 0-9.172-1.0227-12.752-3.0681-3.558-2.0668-6.296-4.9858-8.214-8.7572-1.917-3.7926-2.876-8.2563-2.876-13.3913 0-5.0497.959-9.4815 2.876-13.2954 1.939-3.8353 4.645-6.8182 8.118-8.9489 3.473-2.152 7.553-3.228 12.241-3.228 3.026 0 5.881.4901 8.565 1.4702 2.706.9588 5.093 2.4503 7.159 4.4744 2.088 2.0242 3.729 4.6023 4.922 7.7344 1.193 3.1108 1.79 6.8182 1.79 11.1221v3.5476h-40.238v-7.7983h29.148c-.021-2.2159-.501-4.1868-1.438-5.9126-.938-1.7472-2.248-3.1215-3.931-4.1229-1.662-1.0014-3.601-1.5021-5.817-1.5021-2.365 0-4.443.5753-6.232 1.7258-1.79 1.1293-3.186 2.6208-4.187 4.4745-.98 1.8324-1.481 3.8459-1.502 6.0405v6.8075c0 2.8551.522 5.3054 1.566 7.3508 1.044 2.0242 2.503 3.5796 4.378 4.6662 1.875 1.0654 4.07 1.598 6.584 1.598 1.683 0 3.207-.2343 4.57-.7031 1.364-.49 2.546-1.2038 3.548-2.1413 1.001-.9375 1.758-2.0987 2.269-3.4837l10.803 1.2145c-.682 2.8551-1.982 5.348-3.9 7.4787-1.896 2.1094-4.325 3.75-7.286 4.9219-2.962 1.1506-6.35 1.7258-10.164 1.7258Zm34.777-50.0497 9.908 18.1215 10.067-18.1215h12.241l-14.798 24.5455 15.054 24.5454h-12.177l-10.387-17.674-10.291 17.674h-12.273l14.957-24.5454-14.574-24.5455h12.273Zm63.878 0v8.9489h-28.221v-8.9489h28.221ZM253.722 1.18825h11.569V47.2749c0 1.5554.235 2.7486.704 3.5795.49.8097 1.129 1.3637 1.917 1.662s1.662.4474 2.621.4474c.724 0 1.385-.0532 1.981-.1598.618-.1065 1.087-.2024 1.407-.2876l1.949 9.0447c-.618.2131-1.502.4475-2.652.7031-1.13.2557-2.515.4049-4.155.4475-2.898.0852-5.508-.3516-7.831-1.3104-2.322-.9801-4.165-2.4929-5.529-4.5383-1.342-2.0455-2.003-4.6023-1.981-7.6705V1.18825Zm29.129 60.85225V12.9496h11.218v8.1818h.512c.895-2.8338 2.429-5.0177 4.602-6.5518 2.173-1.5554 4.677-2.3331 7.511-2.3331 1.321 0 2.535.1598 3.643.4794 1.108.3196 2.088.7564 2.94 1.3104l-3.579 9.588c-.618-.2983-1.3-.5433-2.046-.7351-.745-.1917-1.587-.2876-2.524-.2876-2.003 0-3.814.4474-5.434 1.3423-1.619.8949-2.908 2.1414-3.867 3.7394-.937 1.5767-1.406 3.4091-1.406 5.4971v28.8601h-11.57Zm51.222.863c-3.856 0-7.308-.9908-10.355-2.9723-3.047-1.9816-5.454-4.858-7.223-8.6293-1.768-3.7713-2.652-8.3523-2.652-13.7429 0-5.4546.894-10.0568 2.684-13.8068 1.811-3.7713 4.251-6.6158 7.319-8.5334 3.068-1.9389 6.488-2.9084 10.259-2.9084 2.877 0 5.242.4901 7.095 1.4702 1.854.9588 3.324 2.12 4.411 3.4836 1.087 1.3424 1.928 2.6101 2.525 3.8033h.479v-8.1179h11.602v49.0909h-11.378v-7.7343h-.703c-.597 1.1931-1.46 2.4609-2.589 3.8032-1.129 1.321-2.621 2.4503-4.474 3.3878-1.854.9375-4.187 1.4063-7 1.4063Zm3.228-9.4922c2.451 0 4.539-.6605 6.265-1.9816 1.725-1.3423 3.036-3.2066 3.931-5.593s1.342-5.1669 1.342-8.3416c0-3.1747-.447-5.934-1.342-8.2777-.874-2.3438-2.174-4.1655-3.9-5.4652-1.704-1.2997-3.803-1.9496-6.296-1.9496-2.578 0-4.73.6712-6.456 2.0135s-3.025 3.196-3.899 5.5611c-.873 2.365-1.31 5.071-1.31 8.1179 0 3.0682.437 5.8061 1.31 8.2138.895 2.3863 2.205 4.272 3.931 5.6569 1.747 1.3636 3.889 2.0455 6.424 2.0455Z" />
  //           <path
  //             d="m64.8833 1.81335-2.8464 2.84638C47.1274 19.5692 22.9543 19.5692 8.04485 4.65972L5.19848 1.81335c-.93479-.93478-2.45037-.93478-3.38515 0-.93479.93478-.93478 2.45037 0 3.38515L4.6597 8.04487c14.9095 14.90953 14.9095 39.08263 0 53.99213l-2.84637 2.8463c-.93479.9348-.93479 2.4504 0 3.3852.93478.9348 2.45037.9348 3.38515 0l2.84637-2.8464c14.90955-14.9095 39.08255-14.9095 53.99205 0l2.8464 2.8464c.9348.9348 2.4504.9348 3.3852 0 .9347-.9348.9347-2.4504 0-3.3852l-2.8464-2.8463c-14.9095-14.9095-14.9095-39.0826 0-53.99213l2.8464-2.84637c.9347-.93478.9347-2.45037 0-3.38515-.9348-.93478-2.4504-.93478-3.3852 0Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       </a>
  //     </div>
  //   ),
  // },
  editLink: {
    content: "Help improve this page on GitHub →",
  },
  feedback: {
    content: "Question? Give us feedback →",
    labels: "feedback",
  },
  sidebar: {
    defaultMenuCollapseLevel: 4,
    toggleButton: true,
  },
  darkMode: true,
  toc: {
    backToTop: true,
  },
  nextThemes: {
    defaultTheme: "dark",
  },
  // banner: {
  //   dismissible: true,
  //   key: "nextra-banner",
  //   text: "This is a dismissible banner",
  // },
};

export default config;
