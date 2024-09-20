'use client'

import { useProviders } from "@/providers";
import HomeForm from "./form";
import If from "@/components/if";
import VoucherHome from "./voucher";
import Loading from "@/components/Loading";


export default function Home() {

  const { profile, session } = useProviders()

  const isRegistred = profile.isRegistred()
  const isLogged = session.isLogged()
  const hasLoaded = profile.hasLoaded()


  return (
    <>
      <If conditional={hasLoaded}>
        <If conditional={!isRegistred}>
          <HomeForm />
        </If>
        <If conditional={isLogged && isRegistred}>
          <VoucherHome key={"voucher"} />
        </If>
      </If>
      <If conditional={!hasLoaded}>
        <Loading />
      </If>
    </>
  );
}
