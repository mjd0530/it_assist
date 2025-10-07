import type { CustomAssistant } from '../components/AssistantForm';

const STORAGE_KEY = 'custom_assistants';

export const customAssistantService = {
  getAll: (): CustomAssistant[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading custom assistants:', error);
      return [];
    }
  },

  getById: (id: string): CustomAssistant | undefined => {
    const assistants = customAssistantService.getAll();
    return assistants.find(a => a.id === id);
  },

  create: (assistant: Omit<CustomAssistant, 'id'>): CustomAssistant => {
    const assistants = customAssistantService.getAll();
    const newAssistant: CustomAssistant = {
      ...assistant,
      id: Date.now().toString(),
    };
    assistants.push(newAssistant);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assistants));
    return newAssistant;
  },

  update: (id: string, updates: Omit<CustomAssistant, 'id'>): CustomAssistant | null => {
    const assistants = customAssistantService.getAll();
    const index = assistants.findIndex(a => a.id === id);
    
    if (index === -1) return null;
    
    const updatedAssistant: CustomAssistant = {
      ...updates,
      id,
    };
    assistants[index] = updatedAssistant;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assistants));
    return updatedAssistant;
  },

  delete: (id: string): boolean => {
    const assistants = customAssistantService.getAll();
    const filtered = assistants.filter(a => a.id !== id);
    
    if (filtered.length === assistants.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};

