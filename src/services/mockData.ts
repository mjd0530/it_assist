import type { Message, ChatSession, User, NavigationItem } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
};

export const mockNavigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: 'chat', label: 'Chat', icon: 'MessageSquare', path: '/chat' },
  { id: 'history', label: 'History', icon: 'History', path: '/history' },
  { id: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' },
  { id: 'help', label: 'Help', icon: 'HelpCircle', path: '/help' }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: '2',
    content: 'I need help with React TypeScript best practices',
    role: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: '3',
    content: `I'd be happy to help you with React TypeScript best practices! Here are some key recommendations:

## 1. Type Definitions
- Always define interfaces for your props
- Use generic types for reusable components
- Leverage TypeScript's strict mode

## 2. Component Structure
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

## 3. Hooks and State
- Use proper typing for useState and useEffect
- Create custom hooks with proper return types
- Leverage useCallback and useMemo with proper dependencies

Would you like me to elaborate on any of these points?`,
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 3)
  },
  {
    id: '4',
    content: 'Can you show me more examples of custom hooks?',
    role: 'user',
    timestamp: new Date(Date.now() - 1000 * 60 * 2)
  },
  {
    id: '5',
    content: `Absolutely! Here are some practical custom hook examples:

## useLocalStorage Hook
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

## useDebounce Hook
\`\`\`typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
\`\`\`

These hooks provide reusable logic with proper TypeScript typing!`,
    role: 'assistant',
    timestamp: new Date(Date.now() - 1000 * 60 * 1)
  }
];

// Thread-specific conversations
export const threadConversations: Record<number, Message[]> = {
  0: [], // Default empty thread for first-time use experience
  1: [ // Windows Update deployment strategy
    {
      id: '1',
      content: 'I need help planning a Windows Update deployment strategy for our organization. We have about 200 devices across different departments.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      id: '2',
      content: `I'll help you create a comprehensive Windows Update deployment strategy. Here's a phased approach:

## Phase 1: Assessment & Preparation
- **Inventory Analysis**: Categorize devices by department, criticality, and update requirements
- **Network Bandwidth**: Ensure sufficient bandwidth for simultaneous downloads
- **Testing Environment**: Set up a pilot group (10-15 devices) for initial testing

## Phase 2: Deployment Groups
- **IT Department** (5-10 devices): First to receive updates
- **Non-Critical Users** (50-75 devices): Second wave
- **Critical Systems** (25-50 devices): Third wave with additional monitoring
- **Remote Workers** (remaining devices): Final wave with VPN considerations

## Phase 3: Scheduling
- **Maintenance Windows**: Schedule during off-hours (8 PM - 6 AM)
- **Departmental Coordination**: Avoid updates during peak business hours
- **Rollback Plan**: Prepare for quick rollback if issues arise

Would you like me to elaborate on any specific phase?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 2)
    },
    {
      id: '3',
      content: 'What about handling devices that are offline or in remote locations?',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 5)
    },
    {
      id: '4',
      content: `Great question! Here's how to handle offline and remote devices:

## Remote Device Management
- **VPN Requirements**: Ensure devices connect to VPN for updates
- **Bandwidth Throttling**: Implement QoS to prevent network congestion
- **Offline Updates**: Use WSUS offline updates or USB deployment for critical patches

## Offline Device Strategy
- **Scheduled Check-ins**: Configure devices to check for updates when they come online
- **Deferred Updates**: Allow up to 7 days for offline devices to catch up
- **Manual Intervention**: Create a process for devices that miss multiple update cycles

## Monitoring & Reporting
- **Update Compliance Dashboard**: Track which devices are up-to-date
- **Alert System**: Notify IT when devices are more than 30 days behind
- **Automated Remediation**: Scripts to force updates on non-compliant devices

This approach ensures 95%+ compliance while maintaining business continuity.`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 8)
    }
  ],
  2: [ // BIOS update troubleshooting
    {
      id: '1',
      content: 'We\'re having issues with BIOS updates on some of our Lenovo ThinkPad devices. The updates are failing with error code 0x80070002. Any suggestions?',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36)
    },
    {
      id: '2',
      content: `Error 0x80070002 typically indicates a file not found or corruption issue. Here's a systematic troubleshooting approach:

## Immediate Steps
1. **Verify BIOS File Integrity**: Re-download the BIOS update from Lenovo's official support site
2. **Check System Requirements**: Ensure the BIOS version is compatible with your specific ThinkPad model
3. **Run System File Checker**: Execute \`sfc /scannow\` to repair any corrupted system files

## Advanced Troubleshooting
- **Disable Secure Boot**: Temporarily disable Secure Boot in BIOS settings
- **Clear TPM**: Reset TPM settings if TPM-related issues are suspected
- **Battery Check**: Ensure device is connected to AC power and battery is above 20%

## Alternative Methods
- **Lenovo Vantage**: Use Lenovo Vantage app for automatic BIOS updates
- **Manual Flash**: Use Lenovo's BIOS update utility in DOS mode
- **Windows Update**: Check if the BIOS update is available through Windows Update

What specific ThinkPad models are you experiencing this with?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36 + 1000 * 60 * 3)
    },
    {
      id: '3',
      content: 'We\'re seeing this on ThinkPad X1 Carbon Gen 9 and ThinkPad T14 Gen 2 models. The updates work fine on other models.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36 + 1000 * 60 * 6)
    },
    {
      id: '4',
      content: `Those specific models have known issues with certain BIOS versions. Here's the targeted solution:

## Model-Specific Fixes
**ThinkPad X1 Carbon Gen 9:**
- Known issue with BIOS 1.45-1.47 versions
- Use BIOS 1.48 or later for stability
- If stuck on older version, use Lenovo's emergency BIOS recovery

**ThinkPad T14 Gen 2:**
- Issue with Intel Management Engine (IME) conflicts
- Update IME driver first, then attempt BIOS update
- Use Lenovo System Update tool for proper sequence

## Recommended Action Plan
1. **Check Current BIOS Versions**: Document current versions on affected devices
2. **Staged Rollout**: Update 2-3 devices first to verify fix
3. **Backup Strategy**: Create BIOS backup before updating
4. **Rollback Plan**: Keep previous BIOS version available

## Prevention
- **Driver Dependencies**: Always update chipset drivers before BIOS
- **Power Management**: Disable sleep/hibernation during updates
- **Network Stability**: Ensure stable network connection for Lenovo Vantage updates

This should resolve the 0x80070002 errors on those specific models.`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36 + 1000 * 60 * 10)
    }
  ],
  3: [ // Network driver compatibility issues
    {
      id: '1',
      content: 'We\'re experiencing network connectivity issues after updating to Windows 11. Some users are getting "Network adapter not found" errors. This seems to be related to driver compatibility.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
    },
    {
      id: '2',
      content: `This is a common issue with Windows 11 upgrades. Here's how to resolve network driver compatibility problems:

## Immediate Diagnosis
1. **Device Manager Check**: Look for network adapters with yellow warning icons
2. **Driver Status**: Check if drivers show "Code 28" or "Code 31" errors
3. **Network Adapter Details**: Note the exact model and current driver version

## Resolution Steps
**Step 1: Rollback Driver**
- Right-click network adapter → Properties → Driver tab → Roll Back Driver
- This often resolves compatibility issues immediately

**Step 2: Manual Driver Update**
- Download latest drivers from manufacturer's website (Intel, Realtek, etc.)
- Use "Have Disk" method to install specific driver version
- Avoid Windows Update for network drivers initially

**Step 3: Compatibility Mode**
- Install drivers in Windows 10 compatibility mode
- Right-click installer → Properties → Compatibility → Windows 10

## Prevention for Future Updates
- **Driver Backup**: Create system restore point before major updates
- **Compatibility Check**: Use Windows 11 compatibility checker
- **Staged Rollout**: Test on pilot devices first

What network adapter models are you seeing issues with?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 4)
    },
    {
      id: '3',
      content: 'We\'re seeing issues with Intel Wi-Fi 6 AX201 and Realtek PCIe GbE Family Controller. The Intel adapter completely disappears from Device Manager after the Windows 11 update.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 7)
    },
    {
      id: '4',
      content: `Those are known problematic adapters with Windows 11. Here's the specific solution:

## Intel Wi-Fi 6 AX201 Fix
**Root Cause**: Windows 11 changed how it handles Intel Wi-Fi drivers
**Solution**:
1. **Download Intel Driver & Support Assistant**
2. **Install Intel Wi-Fi Driver 22.40.0 or later**
3. **Disable Windows Driver Updates**: Prevent Windows from overwriting with incompatible drivers
4. **Registry Fix**: Add \`ExcludeWUDriversInQualityUpdate\` = 1 in registry

## Realtek PCIe GbE Controller Fix
**Root Cause**: Realtek drivers not fully compatible with Windows 11
**Solution**:
1. **Download Realtek LAN Driver 10.50.511.2021 or later**
2. **Uninstall current driver completely**
3. **Install new driver in compatibility mode**
4. **Disable power management** for the adapter

## Emergency Network Access
If devices are completely offline:
- **USB-to-Ethernet adapter** for temporary connectivity
- **Mobile hotspot** for driver downloads
- **Offline driver installation** via USB

## Deployment Script
I can provide a PowerShell script to automate this fix across multiple devices. Would you like me to share that?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48 + 1000 * 60 * 12)
    }
  ],
  4: [ // Laptop battery optimization settings
    {
      id: '1',
      content: 'Our users are complaining about poor battery life on their laptops. We need to implement power management policies to extend battery life while maintaining productivity.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60)
    },
    {
      id: '2',
      content: `I'll help you create comprehensive battery optimization policies. Here's a multi-layered approach:

## Group Policy Settings
**Power Management Policies:**
- **Sleep Settings**: 15 minutes for display, 30 minutes for sleep
- **CPU Throttling**: Enable power throttling on battery
- **Background Apps**: Restrict non-essential background applications
- **Windows Updates**: Pause updates on battery power

## Hardware Optimizations
**Display Settings:**
- **Brightness**: Auto-adjust based on ambient light
- **Refresh Rate**: Reduce to 60Hz on battery
- **GPU Switching**: Force integrated graphics on battery

**Network Optimizations:**
- **Wi-Fi Power**: Enable power saving mode
- **Bluetooth**: Disable when not in use
- **Ethernet**: Disable when on battery

## Application Management
**Startup Programs**: Disable non-essential startup items
**Background Services**: Optimize Windows services for battery life
**Browser Settings**: Enable power saving modes in browsers

Would you like me to provide specific Group Policy templates for these settings?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60 + 1000 * 60 * 3)
    },
    {
      id: '3',
      content: 'Yes, please provide the Group Policy templates. Also, we have a mix of Lenovo ThinkPads and Dell Latitudes. Do the settings need to be different for each manufacturer?',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60 + 1000 * 60 * 6)
    },
    {
      id: '4',
      content: `Great question! Here are manufacturer-specific optimizations:

## Lenovo ThinkPad Optimizations
**Lenovo Vantage Settings:**
- **Battery Conservation Mode**: Enable (limits charge to 80%)
- **Intelligent Cooling**: Enable for better thermal management
- **Power Manager**: Set to "Maximum Battery Life" profile

**ThinkPad-Specific Policies:**
- **TrackPoint Sensitivity**: Reduce on battery
- **Keyboard Backlight**: Auto-off after 30 seconds
- **Dock Settings**: Optimize for battery when undocked

## Dell Latitude Optimizations
**Dell Power Manager:**
- **Battery Health**: Enable "Primarily AC Use" mode
- **Thermal Management**: Set to "Quiet" mode on battery
- **ExpressCharge**: Disable to reduce heat generation

**Latitude-Specific Policies:**
- **Dell Optimizer**: Enable battery optimization features
- **Ambient Light Sensor**: Enable for automatic brightness
- **ExpressCharge**: Configure for battery health

## Universal Group Policy Template
\`\`\`xml
<!-- Battery Optimization Policy -->
<PolicyDefinitions>
  <Policy name="BatteryOptimization">
    <SleepTimeout>30</SleepTimeout>
    <DisplayTimeout>15</DisplayTimeout>
    <CPUThrottling>Enabled</CPUThrottling>
    <BackgroundApps>Restricted</BackgroundApps>
  </Policy>
</PolicyDefinitions>
\`\`\`

## Expected Results
- **30-40% battery life improvement** on average
- **Reduced heat generation** and fan noise
- **Maintained productivity** with smart optimizations

Would you like the complete PowerShell deployment script for these policies?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60 + 1000 * 60 * 10)
    }
  ]
};

// Deployment Assistant conversations
export const deploymentConversations: Record<string, Message[]> = {
  'new-workflow': [
    {
      id: '1',
      content: 'I need to create a new deployment workflow for our Windows updates. We have about 150 devices that need to be updated with the latest security patches.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '2',
      content: `I'll help you create a comprehensive deployment workflow for Windows updates. Based on your device count, here's a recommended approach:

## Workflow Strategy
**Phase 1: Pre-deployment Assessment**
- Run system scan to identify current patch levels
- Categorize devices by criticality and update requirements
- Create test group with 10-15 devices for validation

**Phase 2: Staged Deployment**
- **Wave 1**: IT department devices (5-10 devices)
- **Wave 2**: Non-critical business users (50-75 devices)  
- **Wave 3**: Critical systems with monitoring (25-50 devices)
- **Wave 4**: Remote workers and remaining devices

**Phase 3: Monitoring & Validation**
- Real-time deployment status tracking
- Automated rollback triggers for failed updates
- Post-deployment validation and reporting

Would you like me to help you configure the specific update policies for each phase?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 3)
    },
    {
      id: '3',
      content: 'Yes, let\'s start with the update policies. I want to ensure we have proper testing before rolling out to production devices.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 6)
    },
    {
      id: '4',
      content: `Excellent approach! Here's a detailed policy configuration for your new workflow:

## Update Policy Configuration

### Test Group Policy
- **Update Source**: Windows Update for Business
- **Deferral Settings**: 0 days for feature updates, 7 days for quality updates
- **Installation Schedule**: Automatic during business hours (9 AM - 5 PM)
- **Restart Behavior**: Automatic restart with 15-minute warning
- **Rollback Window**: 10 days for automatic rollback

### Production Group Policy  
- **Update Source**: WSUS with approval workflow
- **Deferral Settings**: 30 days for feature updates, 14 days for quality updates
- **Installation Schedule**: Maintenance windows (8 PM - 6 AM)
- **Restart Behavior**: Scheduled restart with 2-hour warning
- **Rollback Window**: 30 days for manual rollback

### Critical Systems Policy
- **Update Source**: Manual approval required
- **Deferral Settings**: 60 days for feature updates, 30 days for quality updates
- **Installation Schedule**: Pre-approved maintenance windows only
- **Restart Behavior**: Manual restart with IT notification
- **Rollback Window**: 60 days with immediate rollback capability

Should I proceed with creating this workflow configuration?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 10)
    }
  ],
  'latam-workflow': [
    {
      id: '1',
      content: 'We need to set up a deployment workflow specifically for our LATAM region. The time zones and network conditions are different from our main office.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
    },
    {
      id: '2',
      content: `I'll help you configure a LATAM-specific deployment workflow. Let me address the unique considerations for this region:

## LATAM Deployment Considerations

### Time Zone Management
- **Primary Time Zones**: UTC-3 to UTC-6 (Argentina, Brazil, Mexico, etc.)
- **Deployment Windows**: 10 PM - 6 AM local time for each country
- **Business Hours**: 8 AM - 6 PM local time (avoid deployments)

### Network Optimization
- **Bandwidth Throttling**: Implement QoS to prevent network saturation
- **Peer-to-Peer Updates**: Enable Delivery Optimization for faster downloads
- **Regional WSUS**: Consider local WSUS server for better performance

### Compliance Requirements
- **Data Residency**: Ensure updates don't violate local data protection laws
- **Audit Logging**: Enhanced logging for regulatory compliance
- **Approval Workflows**: Multi-level approval for critical updates

Would you like me to configure the specific time zones and network settings for your LATAM deployment?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 1000 * 60 * 4)
    },
    {
      id: '3',
      content: 'Yes, please configure the time zones. We have offices in São Paulo, Mexico City, and Buenos Aires.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 1000 * 60 * 7)
    },
    {
      id: '4',
      content: `Perfect! Here's the time zone configuration for your LATAM offices:

## LATAM Time Zone Configuration

### São Paulo, Brazil (UTC-3)
- **Deployment Window**: 10:00 PM - 6:00 AM (UTC-3)
- **Business Hours**: 8:00 AM - 6:00 PM (UTC-3)
- **Peak Network Usage**: 12:00 PM - 2:00 PM (lunch break)

### Mexico City, Mexico (UTC-6)
- **Deployment Window**: 10:00 PM - 6:00 AM (UTC-6)
- **Business Hours**: 8:00 AM - 6:00 PM (UTC-6)
- **Peak Network Usage**: 1:00 PM - 3:00 PM (lunch break)

### Buenos Aires, Argentina (UTC-3)
- **Deployment Window**: 10:00 PM - 6:00 AM (UTC-3)
- **Business Hours**: 8:00 AM - 6:00 PM (UTC-3)
- **Peak Network Usage**: 12:00 PM - 2:00 PM (lunch break)

## Coordinated Deployment Strategy
- **Staggered Rollout**: 2-hour intervals between regions
- **Network Monitoring**: Real-time bandwidth usage tracking
- **Fallback Schedule**: Weekend deployments if weekday windows fail

The system will automatically adjust deployment times based on daylight saving time changes in each region.`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4 + 1000 * 60 * 12)
    }
  ],
  'pst-bios-workflow': [
    {
      id: '1',
      content: 'We need to create a specialized workflow for PST BIOS updates. These updates are critical and require careful handling due to the risk of bricking devices.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
    },
    {
      id: '2',
      content: `BIOS updates require special handling due to their critical nature. Here's a comprehensive PST BIOS update workflow:

## PST BIOS Update Workflow

### Pre-Update Validation
- **Hardware Compatibility Check**: Verify BIOS version compatibility
- **Power Requirements**: Ensure AC power connection and >50% battery
- **System State**: Confirm no pending Windows updates or restarts
- **Backup Creation**: Create system restore point and BIOS backup

### Risk Mitigation
- **Staged Rollout**: Maximum 5 devices per batch
- **Rollback Preparation**: Keep previous BIOS version readily available
- **Emergency Recovery**: USB recovery media prepared for each device model
- **Monitoring**: Real-time status updates during update process

### Update Process
- **Manual Approval**: Each device requires explicit IT approval
- **Scheduled Windows**: Updates only during pre-approved maintenance windows
- **Progress Tracking**: Detailed logging of each update step
- **Validation**: Post-update system functionality verification

Would you like me to configure the specific BIOS update policies and validation steps?`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 5)
    },
    {
      id: '3',
      content: 'Yes, please configure the validation steps. We have ThinkPad X1 Carbon Gen 9 and ThinkPad T14 Gen 2 models that need BIOS updates.',
      role: 'user' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 8)
    },
    {
      id: '4',
      content: `I'll configure the validation steps for your specific ThinkPad models:

## Model-Specific BIOS Validation

### ThinkPad X1 Carbon Gen 9
**Pre-Update Checks:**
- Current BIOS version: 1.45 or later required
- Intel Management Engine: Version 15.0.30.1736 or later
- Power state: AC connected, battery >50%
- System temperature: <70°C

**Update Process:**
- Use Lenovo Vantage for automatic updates
- Fallback: Lenovo BIOS Update Utility
- Expected duration: 8-12 minutes
- Critical: Do not interrupt power during update

**Post-Update Validation:**
- BIOS version verification
- Boot sequence confirmation
- Hardware component recognition
- Network connectivity test

### ThinkPad T14 Gen 2
**Pre-Update Checks:**
- Current BIOS version: 1.50 or later required
- Intel Management Engine: Version 15.0.30.1736 or later
- Power state: AC connected, battery >50%
- System temperature: <70°C

**Update Process:**
- Use Lenovo System Update tool
- Fallback: Manual BIOS flash utility
- Expected duration: 10-15 minutes
- Critical: Ensure stable network connection

**Post-Update Validation:**
- BIOS version verification
- TPM functionality check
- Hardware component recognition
- Performance benchmark validation

Both models will have automatic rollback enabled if validation fails.`,
      role: 'assistant' as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 + 1000 * 60 * 15)
    }
  ]
};

export const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'React TypeScript Best Practices',
    messages: mockMessages,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    updatedAt: new Date(Date.now() - 1000 * 60 * 1)
  },
  {
    id: '2',
    title: 'CSS Grid Layout Help',
    messages: [
      {
        id: '1',
        content: 'How do I create a responsive grid layout?',
        role: 'user' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1)
      },
      {
        id: '2',
        content: 'I can help you with CSS Grid! Here are the basics...',
        role: 'assistant' as const,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1 + 1000 * 30)
      }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 1 + 1000 * 30)
  }
];
