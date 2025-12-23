
import { GalleryColumns } from "@/components/columns/gallery-columns";
import { DataTable } from "@/components/data-table";
import NavigationButton from "@/components/NavigationButton"
import { deleteImageAction } from "./(actions)/deleteImage";
import { gallery } from "@/types";
import { getAllImages } from "@/app/models/db/lib/services/gallery";
export default async function SettingsTable() {
  const gallery = await getAllImages();

  
  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Images</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of your Images.
        </h2>
      </div>
      {/* Table container */}
      <DataTable columns={GalleryColumns} data={gallery.data as gallery[]} routeName="gallery" deleteAction={deleteImageAction}/>
      <NavigationButton
            routeName="newImage"
            value="Add New Image"
          />
    </main>
  );
}
