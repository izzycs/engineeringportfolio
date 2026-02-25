import { useStore } from '../store/useStore';
import projectsData from '../data/projects.json';

export function ProjectModal() {
  const selectedProject = useStore((state) => state.selectedProject);
  const setSelectedProject = useStore((state) => state.setSelectedProject);

  if (!selectedProject) return null;

  const project = projectsData.find((p) => p.id === selectedProject);
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="bg-gray-900 border border-blue-500 rounded-lg p-6 max-w-2xl w-full mx-4 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{project.title}</h2>
          <button
            onClick={() => setSelectedProject(null)}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-gray-300 mb-4">{project.description}</p>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="bg-blue-900 text-blue-200 px-3 py-1 rounded text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={project.link}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
          <a
            href={project.github}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        {/* TODO: Replace with actual project screenshots/images */}
        <div className="mt-4 bg-gray-800 h-48 rounded flex items-center justify-center text-gray-500">
          Project Screenshot Placeholder
        </div>
      </div>
    </div>
  );
}
