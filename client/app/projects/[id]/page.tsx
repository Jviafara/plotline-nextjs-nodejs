import { Suspense } from "react";
import ProjectClient from "./ProjectClient";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="p-6">Loading project...</div>}>
      <ProjectClient params={params} />
    </Suspense>
  );
}
