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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900/20 border-2 border-blue-500/50 rounded-xl max-w-3xl w-full text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div className="flex-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-2">
              {project.title}
            </h2>
            <p className="text-gray-400 text-sm">Featured Project</p>
          </div>
          <button
            onClick={() => setSelectedProject(null)}
            className="text-gray-400 hover:text-white text-3xl leading-none transition-colors hover:rotate-90 duration-300 ml-4"
          >
            ×
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Project Screenshot */}
          <div className="relative group rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">🖼️</div>
                <p className="text-gray-500 font-medium">Project Screenshot</p>
                <p className="text-gray-600 text-sm mt-1">Coming Soon</p>
              </div>
            </div>
            {/* Gradient overlay for visual interest */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none"></div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <span className="text-xl">📝</span>
              About This Project
            </h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <span className="text-xl">🛠️</span>
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200 border border-blue-400/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Screenshots Placeholder */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
              <span className="text-xl">📸</span>
              Gallery
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center hover:border-blue-500/50 transition-all"
                >
                  <span className="text-gray-600 text-sm">Screenshot {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Action Buttons */}
        <div className="p-6 border-t border-gray-800 bg-gray-950/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={project.link}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all font-semibold text-center shadow-lg hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] duration-200 flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🚀</span>
              <span>Visit Project</span>
            </a>
            <a
              href={project.github}
              className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-blue-500 rounded-lg transition-all font-semibold text-center shadow-lg hover:scale-[1.02] active:scale-[0.98] duration-200 flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💻</span>
              <span>View Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
