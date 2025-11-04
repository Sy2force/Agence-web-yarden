import Image from 'next/image';
import { IProject } from '../../shared/types';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden border border-white/20">
      <div className="relative h-64 overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-purple-100">
            <span className="text-gray-400 text-lg">Image à venir</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
        
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              ⭐ En vedette
            </span>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <div className="mb-4">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg">
            {project.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{project.title}</h3>
        <p className="text-sm font-medium text-blue-600 mb-3">Client: {project.client}</p>
        <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
        
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Technologies utilisées</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full font-medium border border-gray-300 hover:from-blue-100 hover:to-blue-200 hover:text-blue-800 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Voir le site
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-0 -left-4 w-8 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000 ease-out"></div>
      </div>
    </div>
  );
}
