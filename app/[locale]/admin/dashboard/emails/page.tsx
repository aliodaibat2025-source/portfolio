import { emailsColumns } from "@/components/columns/email-columns";
import { DataTable } from "@/components/data-table";
import { deleteEmailAction } from "./(actions)/deleteEmail";
import { getAllEmails } from "@/app/models/db/lib/services/contact";
export default async function UsersTable() {
  const emails = (await getAllEmails()).data ;
  console.log("emails: ",emails);
  
  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Email</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Recivied Emails.
        </h2>
      </div>

      {/* Table container */}
      <DataTable columns={emailsColumns} data={emails} routeName="emails" deleteAction={deleteEmailAction}/>
    </main>
  );
}
