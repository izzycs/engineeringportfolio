import { describe, it, expect } from 'vitest';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';

describe('Data Loading', () => {
  it('should load experience data', () => {
    expect(experienceData).toBeDefined();
    expect(Array.isArray(experienceData)).toBe(true);
    expect(experienceData.length).toBeGreaterThan(0);
  });

  it('should have valid experience entries', () => {
    experienceData.forEach((exp) => {
      expect(exp).toHaveProperty('id');
      expect(exp).toHaveProperty('title');
      expect(exp).toHaveProperty('company');
      expect(exp).toHaveProperty('dates');
      expect(exp).toHaveProperty('bullets');
      expect(exp).toHaveProperty('tags');
      expect(Array.isArray(exp.bullets)).toBe(true);
      expect(Array.isArray(exp.tags)).toBe(true);
    });
  });

  it('should load projects data', () => {
    expect(projectsData).toBeDefined();
    expect(Array.isArray(projectsData)).toBe(true);
    expect(projectsData.length).toBeGreaterThan(0);
  });

  it('should have valid project entries', () => {
    projectsData.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('stack');
      expect(Array.isArray(project.stack)).toBe(true);
    });
  });
});
