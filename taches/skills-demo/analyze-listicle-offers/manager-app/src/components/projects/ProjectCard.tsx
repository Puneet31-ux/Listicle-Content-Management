import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { Progress } from '../ui/Progress';
import { CATEGORY_INFO, type Project } from '../../types';
import { formatDate, timeAgo } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
  isSelected: boolean;
  onClick: () => void;
}

export function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
  const categoryInfo = CATEGORY_INFO[project.category];

  return (
    <Card
      hover
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-all',
        isSelected && 'ring-2 ring-blue-500 shadow-md'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{categoryInfo.icon}</span>
              <span className={cn('text-xs px-2 py-0.5 rounded-full text-white', categoryInfo.color)}>
                {categoryInfo.label}
              </span>
            </div>
            <CardTitle className="text-base line-clamp-2">{project.name}</CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2 space-y-2">
        <Progress
          value={project.progress.answered}
          max={project.progress.total}
        />

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{project.progress.answered}/{project.progress.total} answered</span>
          <span className="font-medium">{project.progress.percentage}%</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <span>{project.status.replace('-', ' ')}</span>
          <span title={formatDate(project.updatedAt)}>{timeAgo(project.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
