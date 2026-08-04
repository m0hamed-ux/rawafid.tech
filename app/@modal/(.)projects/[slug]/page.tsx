import { notFound } from "next/navigation";
import { Modal } from "@/components/modal";
import { ProjectDetail } from "@/components/project-detail";
import { projects } from "@/lib/content";

export default async function ProjectModal(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <Modal>
      <ProjectDetail project={project} inModal />
    </Modal>
  );
}
