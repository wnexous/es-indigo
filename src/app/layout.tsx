
import { MetadataConfig } from "@/config/metadata";
import Providers from "@/providers";
import AuthProvider from "@/providers/Auth.provider";
import "@/styles/index.css";
import EmbedBrowserDetector from "@/vendors/EmbedBrowserDetector";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { getServerSession, Session } from "next-auth";
import { PrimeReactProvider } from 'primereact/api';
export const metadata: Metadata = MetadataConfig


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession({
    callbacks: {
      session(params) {
        try {
          //@ts-ignore
          params.session.user = { ...params.session.user, roles: params?.token?.roles }
        } catch (error) { }
        return params.session
      },
    }
  }).catch(err => { console.log("erro ao obter sessao"); }) as Session | null



  return (
    <html lang="en" >
      <body className="min-h-screen dark" key={"bodyelement"} data-mode="dark">
        <SpeedInsights />
        <Providers key={"providers"}>
          <AuthProvider session={session} key={"authprovider"}>
            <PrimeReactProvider >
              <EmbedBrowserDetector>
                {children}
              </EmbedBrowserDetector>
            </PrimeReactProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
