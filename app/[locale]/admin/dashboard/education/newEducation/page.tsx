import { createEducationAction } from "../(actions)/createEducation";
import CreateEducationForm  from "@/components/education/CreateNewEducation";

async function Page() {
  return (
    <>

      <CreateEducationForm action={createEducationAction}  />
    </>
  );
}

export default Page;
