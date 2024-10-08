"use client";
import { LayoutProvider } from "../layout/context/layoutcontext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import Layout from "@/layout/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          id="theme-css"
          href={`/themes/lara-light-indigo/theme.css`}
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <PrimeReactProvider>
            <LayoutProvider>
              <Layout>{children}</Layout>
            </LayoutProvider>
          </PrimeReactProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
