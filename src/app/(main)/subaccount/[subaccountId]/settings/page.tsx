import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

const SubaccountSettingpage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;
  const useDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  return <div>SubaccountSettingpage</div>;
};

export default SubaccountSettingpage;
