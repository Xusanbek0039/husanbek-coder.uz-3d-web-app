"use client";
import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { FloatingDock } from "../ui/floating-dock";
import Link from "next/link";
import { Link as LocaleLink } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { localizeProject } from "@/data/projects-i18n";

import SmoothScroll from "../smooth-scroll";
import projects, { Project } from "@/data/projects";
import SectionHeading from "../ui/section-heading";
import ProjectFilter, {
  countByKind,
  matchesFilter,
  type ProjectFilterValue,
} from "@/components/projects/project-filter";
import ProjectMeta from "@/components/projects/project-meta";
import { toCardData, type ProjectCardData } from "@/components/projects/card-data";

const ProjectsSection = () => {
  const t = useTranslations("projectsSection");
  const locale = useLocale();
  const [filter, setFilter] = React.useState<ProjectFilterValue>("all");
  const counts = React.useMemo(() => countByKind(projects), []);
  const visible = projects.filter((p) => matchesFilter(p.kinds, filter));

  return (
    <section id="projects" aria-labelledby="projects-title" className="max-w-7xl mx-auto px-4 md:min-h-[130vh]">
      <SectionHeading id="projects-title" className="pt-16">
        {t("title")}
      </SectionHeading>
      <ProjectFilter value={filter} onChange={setFilter} counts={counts} className="mt-10 mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6">
        {visible.map((project) => (
          <Modall
            key={project.id}
            project={localizeProject(project, locale)}
            card={toCardData(project, locale)}
          />
        ))}
      </div>
    </section>
  );
};

const Modall = ({ project, card }: { project: Project; card: ProjectCardData }) => {
  const t = useTranslations("projectsSection");
  return (
    <div className="flex flex-col items-center justify-start mb-12">
      <Modal>
        <ModalTrigger
          className="bg-transparent flex justify-center group/modal-btn p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
        >
          <div
            className="relative w-[400px] max-w-full h-auto rounded-lg overflow-hidden"
            style={{ aspectRatio: "3/2" }}
          >
            <Image
              className="absolute w-full h-full top-0 left-0 object-cover hover:scale-[1.05] transition-all"
              src={project.src}
              alt={t("screenshotAlt", { title: project.title })}
              width={400}
              height={267}
            />
            <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
              <div className="flex flex-col h-full items-start justify-end p-6">
                <h3 className="text-lg text-left text-white">{project.title}</h3>
                <span className="text-xs bg-white text-black rounded-lg w-fit px-2">
                  {project.category}
                </span>
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody className="md:max-w-4xl md:max-h-[80%] overflow-auto">
          <SmoothScroll isInsideModal={true}>
            <ModalContent>
              <ProjectContents project={project} />
            </ModalContent>
          </SmoothScroll>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              {t("back")}
            </button>
            <LocaleLink
              href={`/projects/${project.id}`}
              className="px-2 py-1 text-center bg-gray-200 text-black dark:bg-black dark:border-neutral-700 dark:text-white border border-gray-300 rounded-md text-sm w-28"
            >
              {t("details")}
            </LocaleLink>
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
              >
                {t("visit")}
              </Link>
            )}
          </ModalFooter>
        </ModalBody>
      </Modal>
      <ProjectMeta project={card} className="w-[400px] max-w-full mt-3 px-1" />
    </div>
  );
};
export default ProjectsSection;

const ProjectContents = ({ project }: { project: Project }) => {
  const t = useTranslations("projectsSection");
  return (
    <>
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
        {project.title}
      </h4>
      <div className="flex flex-col md:flex-row md:justify-evenly max-w-screen overflow-hidden md:overflow-visible">
        <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
          <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
            {t("frontend")}
          </p>
          {project.skills.frontend?.length > 0 && (
            <FloatingDock items={project.skills.frontend} />
          )}
        </div>
        {project.skills.backend?.length > 0 && (
          <div className="flex flex-row md:flex-col-reverse justify-center items-center gap-2 text-3xl mb-8">
            <p className="text-sm mt-1 text-neutral-600 dark:text-neutral-500">
              {t("backend")}
            </p>
            <FloatingDock items={project.skills.backend} />
          </div>
        )}
      </div>
      {/* <div className="flex justify-center items-center">
        {project.screenshots.map((image, idx) => (
          <motion.div
            key={"images" + idx}
            style={{
              rotate: Math.random() * 20 - 10,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            whileTap={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
            }}
            className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
          >
            <Image
              src={`${project.src.split("1.png")[0]}${image}`}
              alt="screenshots"
              width="500"
              height="500"
              className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            />
          </motion.div>
        ))}
      </div> */}
      {project.content}
    </>
  );
};
