import { CategoryDropdown } from '../CategoryDropdown';
import { ProjectList } from '../projects/ProjectList';

export function Sidebar() {
  return (
    <div className="w-80 h-full bg-gray-50 border-r border-gray-200 flex flex-col overflow-hidden flex-shrink-0">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h1 className="text-xl font-bold mb-4">Listicle Manager</h1>
        <CategoryDropdown />
      </div>

      <div className="flex-1 overflow-hidden min-h-0">
        <ProjectList />
      </div>
    </div>
  );
}
