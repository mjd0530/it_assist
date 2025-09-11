// Mock AI service for demonstration
export class AIService {
  private static instance: AIService;
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateResponse(userMessage: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Mock responses based on keywords
    const responses = this.getMockResponses(userMessage);
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getMockResponses(userMessage: string): string[] {
    const message = userMessage.toLowerCase();
    
    if (message.includes('react') || message.includes('typescript')) {
      return [
        `Great question about React and TypeScript! Here's a comprehensive response:

## React TypeScript Best Practices

### 1. Component Props
\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children }) => {
  return (
    <button 
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### 2. Custom Hooks
\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
\`\`\`

Would you like me to elaborate on any specific aspect?`,
        `I'd be happy to help with React TypeScript! Here are some key concepts:

## Type Safety
- Always define interfaces for props
- Use generic types for reusable components
- Leverage TypeScript's strict mode

## Performance
- Use React.memo for expensive components
- Implement useCallback and useMemo properly
- Consider code splitting with React.lazy

## Testing
- Use @testing-library/react with TypeScript
- Mock components with proper typing
- Test both happy paths and edge cases

What specific area would you like to explore further?`
      ];
    }

    if (message.includes('css') || message.includes('styling')) {
      return [
        `CSS and styling questions are my specialty! Here's what I can help with:

## Modern CSS Techniques
- CSS Grid and Flexbox layouts
- CSS Custom Properties (variables)
- CSS-in-JS solutions
- Tailwind CSS utility classes

## Responsive Design
- Mobile-first approach
- Breakpoint strategies
- Fluid typography
- Container queries

## Performance
- Critical CSS
- CSS optimization
- Animation performance
- Bundle size considerations

What specific styling challenge are you facing?`,
        `Great styling question! Here are some modern approaches:

### CSS Grid Layout
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
\`\`\`

### Flexbox Centering
\`\`\`css
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`

### CSS Custom Properties
\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --spacing-unit: 1rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
}
\`\`\`

Would you like me to show more examples?`
      ];
    }

    if (message.includes('javascript') || message.includes('js')) {
      return [
        `JavaScript is a powerful language! Here are some key concepts:

## Modern JavaScript Features
- ES6+ syntax (arrow functions, destructuring, modules)
- Async/await and Promises
- Array methods (map, filter, reduce)
- Template literals and string methods

## Best Practices
- Use const/let instead of var
- Implement proper error handling
- Follow functional programming principles
- Use TypeScript for type safety

## Performance Tips
- Avoid memory leaks
- Use debouncing and throttling
- Implement lazy loading
- Optimize bundle size

What specific JavaScript topic interests you?`,
        `JavaScript fundamentals are essential! Here's a quick overview:

### Async Programming
\`\`\`javascript
// Promises
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/Await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

### Array Methods
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5];

// Map
const doubled = numbers.map(n => n * 2);

// Filter
const evens = numbers.filter(n => n % 2 === 0);

// Reduce
const sum = numbers.reduce((acc, n) => acc + n, 0);
\`\`\`

Need help with a specific JavaScript concept?`
      ];
    }

    // Default responses
    return [
      `That's an interesting question! I'd be happy to help you with that. 

Here's what I can assist you with:
- **Programming**: React, TypeScript, JavaScript, CSS, and more
- **Problem Solving**: Debugging, optimization, best practices
- **Learning**: Concepts, examples, and step-by-step guidance
- **Code Review**: Suggestions for improvement and best practices

Could you provide more details about what you're trying to accomplish? The more specific you are, the better I can help!`,
      
      `I understand you're looking for help with that topic. Let me provide some guidance:

## General Approach
1. **Define the problem clearly** - What exactly are you trying to achieve?
2. **Break it down** - Split complex problems into smaller, manageable parts
3. **Research and learn** - Look for existing solutions and best practices
4. **Implement and test** - Start with a simple solution and iterate
5. **Refactor and optimize** - Improve your code as you learn more

## What I Can Help With
- Code examples and explanations
- Debugging assistance
- Architecture and design patterns
- Performance optimization
- Best practices and conventions

What specific aspect would you like to focus on?`,
      
      `Thanks for your question! I'm here to help you succeed. 

## How I Can Assist
- **Code Examples**: Practical, working code snippets
- **Explanations**: Clear, step-by-step breakdowns
- **Best Practices**: Industry-standard approaches
- **Troubleshooting**: Help with errors and issues
- **Learning Paths**: Structured guidance for complex topics

## Tips for Better Results
- Be specific about your use case
- Share any error messages or code you're working with
- Let me know your experience level with the topic
- Ask follow-up questions if something isn't clear

What would you like to explore first?`
    ];
  }
}

export const aiService = AIService.getInstance();
