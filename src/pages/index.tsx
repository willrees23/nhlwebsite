/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { ToastAction } from "@radix-ui/react-toast";
import { RefreshCwIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Layout from "~/components/Layout";
import StateBadge from "~/components/statebadge";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useToast } from "~/components/ui/use-toast";
import { nhlFont } from "~/lib/fonts";
import { Convert as ResultConvert } from "~/lib/nhlresult";
import { Convert as ScoresConvert } from "~/lib/scoresResult";
import {
  cn,
  dayOfWeekNumOfMonth,
  getDateInAmericanFormat,
  getLastSunday,
  getLastSundayDate,
} from "~/lib/utils";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Layout pageTitle="NHL Unofficial"></Layout>
    </>
  );
}
