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
  if(!useDetails) return 

  const subAccount = await db.subAccount.findUnique({
    where : {
      id: params.subaccountId
    }
  })
  if(!subAccount) return 

  const agencyDetails = await db.agency.findUnique({
    where: {id: subAccount.agencyId},
    include: {SubAccount: true}
  })
  if(!agencyDetails) return 



  return <div>SubaccountSettingpage</div>;
};

export default SubaccountSettingpage;
