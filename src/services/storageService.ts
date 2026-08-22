import { MemeProject } from '../types';

const STORAGE_KEY_PROJECT = 'memeforge_autosave_project';
const STORAGE_KEY_RECENT = 'memeforge_recent_projects';

export function saveProjectToStorage(project: MemeProject): void {
  try {
    const serialized = JSON.stringify({
      ...project,
      timestamp: Date.now()
    });
    localStorage.setItem(STORAGE_KEY_PROJECT, serialized);
  } catch (e) {
    console.warn('Failed to auto-save project to localStorage (quota exceeded or private mode):', e);
  }
}

export function loadProjectFromStorage(): MemeProject | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECT);
    if (!raw) return null;
    return JSON.parse(raw) as MemeProject;
  } catch (e) {
    console.warn('Failed to parse saved project from localStorage:', e);
    return null;
  }
}

export function clearProjectStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_PROJECT);
  } catch (e) {
    console.warn('Failed to clear localStorage project:', e);
  }
}

export function exportProjectJson(project: MemeProject): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${project.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.memeforge`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseProjectFile(file: File): Promise<MemeProject> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && Array.isArray(json.elements)) {
          resolve(json as MemeProject);
        } else {
          reject(new Error('Invalid MemeForge project file format.'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read project file.'));
    reader.readAsText(file);
  });
}
