import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion } from "next-auth/react";

type LoginProviderI = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null


export default LoginProviderI