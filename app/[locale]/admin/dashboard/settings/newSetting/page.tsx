
import { createSettingAction } from "../(fetch)/createNewSetting";
import CreateNewSetting from "@/components/settings/createNewSettingFrom";
import { getSettingsData } from "@/app/models/db/lib/services/settings";
import { newSetting } from "@/types";

async function Page() {
  const settings = await getSettingsData();
  const existingKeys = settings
    .map((s:newSetting) => s.key_name_en?.trim().toLowerCase())
    .filter((key): key is string => Boolean(key)); // remove undefined values

  return (
    <>

      <CreateNewSetting action={createSettingAction} existingKeys={existingKeys} />
    </>
  );
}

export default Page;
