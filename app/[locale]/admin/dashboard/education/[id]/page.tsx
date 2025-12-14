import { editEducationAction } from "../(actions)/editEducation";
import EditEducationForm from "@/components/education/EditEducation";
import { NewEducation } from "@/types";
import { getEducationById } from "@/app/models/db/lib/services/education";

async function Page(prop: { params: Promise<{ id: string }> }) {
  const params = await prop.params;
  const education = await getEducationById(params.id);
  console.log("education: ",education);
  
  return (
    

      <main>
        <EditEducationForm education={education.data as NewEducation} action={editEducationAction} />
      </main>
  );
}

export default Page;
