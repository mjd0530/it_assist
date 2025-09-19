// AI service with multiple provider support
export class AIService {
  private static instance: AIService;
  private readonly HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
  private readonly OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';
  private conversationContext: { [threadId: string]: string[] } = {};
  private deviceData: any = {};
  
  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateResponse(userMessage: string, threadId: string = 'default'): Promise<string> {
    // Use mock responses by default for demo purposes
    // Uncomment the API calls below if you want to use real AI services
    
    // // Try OpenAI first if API key is available
    // if (this.OPENAI_API_KEY) {
    //   try {
    //     return await this.generateOpenAIResponse(userMessage);
    //   } catch (error) {
    //     console.warn('OpenAI API failed, falling back to Hugging Face:', error);
    //   }
    // }

    // // Try Hugging Face if API key is available
    // if (this.HUGGINGFACE_API_KEY) {
    //   try {
    //     return await this.generateHuggingFaceResponse(userMessage);
    //   } catch (error) {
    //     console.warn('Hugging Face API failed, falling back to mock responses:', error);
    //   }
    // }

    // Use mock responses for demo experience with conversation context
    return this.getDynamicMockResponse(userMessage, threadId);
  }

  private async generateOpenAIResponse(userMessage: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are Lenovo IT Assist, a helpful AI assistant specialized in IT support, device management, and technical troubleshooting. Provide clear, concise, and helpful responses.'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  private async generateHuggingFaceResponse(userMessage: string): Promise<string> {
    // Use a better model for chat responses
    const API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-large';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: userMessage,
        parameters: {
          max_length: 200,
          temperature: 0.7,
          do_sample: true,
          pad_token_id: 50256,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle the response format from Hugging Face
    if (Array.isArray(data) && data.length > 0) {
      const generatedText = data[0].generated_text || data[0].text;
      // Clean up the response by removing the original input if it's included
      return generatedText.replace(userMessage, '').trim() || 'I apologize, but I could not generate a response.';
    }
    
    return data.generated_text || data.text || 'I apologize, but I could not generate a response.';
  }

  private async getDynamicMockResponse(userMessage: string, threadId: string): Promise<string> {
    // Simulate realistic API delay (1-3 seconds)
    const delay = 1000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Update conversation context
    if (!this.conversationContext[threadId]) {
      this.conversationContext[threadId] = [];
    }
    this.conversationContext[threadId].push(userMessage);
    
    // Generate dynamic response based on context
    const response = this.generateContextualResponse(userMessage, threadId);
    return response;
  }

  private generateContextualResponse(userMessage: string, threadId: string): string {
    const message = userMessage.toLowerCase();
    const context = this.conversationContext[threadId] || [];
    const isFollowUp = context.length > 1;
    
    // Generate dynamic data
    const deviceId = this.generateDeviceId();
    const errorCode = this.generateErrorCode();
    const timestamp = this.generateTimestamp();
    const model = this.generateModel();
    const location = this.generateLocation();
    
    // BSOD Analysis with dynamic data
    if (message.includes('bsod') || message.includes('blue screen') || message.includes('crash')) {
      if (isFollowUp && context[context.length - 2].toLowerCase().includes('bsod')) {
        return this.generateBSODFollowUp(deviceId, errorCode, model);
      }
      return this.generateBSODAnalysis(deviceId, errorCode, model, timestamp);
    }

    // BIOS Updates with dynamic data
    if (message.includes('bios') || message.includes('firmware') || message.includes('update')) {
      if (isFollowUp && context[context.length - 2].toLowerCase().includes('bios')) {
        return this.generateBIOSFollowUp(deviceId, model);
      }
      return this.generateBIOSUpdate(deviceId, model, timestamp);
    }

    // Network Issues with dynamic data
    if (message.includes('network') || message.includes('wifi') || message.includes('ethernet') || message.includes('connectivity')) {
      if (isFollowUp && context[context.length - 2].toLowerCase().includes('network')) {
        return this.generateNetworkFollowUp(deviceId, location);
      }
      return this.generateNetworkAnalysis(deviceId, location, timestamp);
    }

    // Battery Issues with dynamic data
    if (message.includes('battery') || message.includes('power') || message.includes('charging')) {
      if (isFollowUp && context[context.length - 2].toLowerCase().includes('battery')) {
        return this.generateBatteryFollowUp(deviceId, model);
      }
      return this.generateBatteryAnalysis(deviceId, model, timestamp);
    }

    // Performance Issues
    if (message.includes('slow') || message.includes('performance') || message.includes('lag')) {
      return this.generatePerformanceAnalysis(deviceId, model, timestamp);
    }

    // Security Issues
    if (message.includes('security') || message.includes('virus') || message.includes('malware')) {
      return this.generateSecurityAnalysis(deviceId, model, timestamp);
    }

    // Driver Issues
    if (message.includes('driver') || message.includes('hardware')) {
      return this.generateDriverAnalysis(deviceId, model, timestamp);
    }

    // Device Lifecycle Management
    if (message.includes('lifecycle') || message.includes('asset') || message.includes('inventory') || message.includes('warranty')) {
      return this.generateDeviceLifecycleAnalysis(deviceId, model, timestamp);
    }

    // Fleet Analytics
    if (message.includes('fleet') || message.includes('analytics') || message.includes('dashboard') || message.includes('report') || message.includes('chart') || message.includes('graph')) {
      return this.generateFleetAnalytics(deviceId, model, timestamp);
    }

    // Compliance and Governance
    if (message.includes('compliance') || message.includes('governance') || message.includes('policy') || message.includes('audit')) {
      return this.generateComplianceAnalysis(deviceId, model, timestamp);
    }

    // Software Deployment
    if (message.includes('deployment') || message.includes('software') || message.includes('application') || message.includes('install')) {
      return this.generateSoftwareDeploymentAnalysis(deviceId, model, timestamp);
    }

    // General help or support
    if (message.includes('help') || message.includes('support') || message.includes('issue')) {
      return this.generateGeneralHelp(deviceId, model);
    }

    // Default contextual response
    return this.generateDefaultResponse(userMessage, deviceId, model, isFollowUp);
  }

  // Dynamic data generation methods
  private generateDeviceId(): string {
    const prefixes = ['LNV', 'TPD', 'THK', 'LEN'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}-${number}`;
  }

  private generateErrorCode(): string {
    const codes = ['0x0000001A', '0x0000003B', '0x0000007E', '0x0000008E', '0x000000D1', '0x000000F4'];
    return codes[Math.floor(Math.random() * codes.length)];
  }

  private generateTimestamp(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  private generateModel(): string {
    const models = [
      'ThinkPad X1 Carbon Gen 9',
      'ThinkPad T14s Gen 2',
      'ThinkPad E15 Gen 3',
      'ThinkPad P15 Gen 2',
      'ThinkPad L15 Gen 2',
      'ThinkPad X13 Gen 2',
      'ThinkPad T15p Gen 2',
      'ThinkPad E14 Gen 3',
      'ThinkPad P1 Gen 4',
      'ThinkPad X1 Yoga Gen 6',
      'ThinkPad T16 Gen 1',
      'ThinkPad L13 Yoga Gen 2'
    ];
    return models[Math.floor(Math.random() * models.length)];
  }

  private generateLocation(): string {
    const locations = [
      'Corporate HQ - Building A',
      'Regional Office - Austin',
      'Regional Office - Seattle',
      'Manufacturing Plant - Detroit',
      'Sales Office - New York',
      'R&D Center - San Jose',
      'Distribution Center - Dallas',
      'Remote Worker - Home Office',
      'Executive Floor - HQ',
      'IT Operations Center',
      'Customer Support Center',
      'Training Facility'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  private generateFleetStats(): any {
    return {
      totalDevices: Math.floor(Math.random() * 5000) + 10000, // 10k-15k devices
      activeDevices: Math.floor(Math.random() * 1000) + 9500,
      offlineDevices: Math.floor(Math.random() * 200) + 50,
      pendingUpdates: Math.floor(Math.random() * 500) + 200,
      criticalIssues: Math.floor(Math.random() * 50) + 5,
      warrantyExpiring: Math.floor(Math.random() * 100) + 20,
      endOfLife: Math.floor(Math.random() * 200) + 50
    };
  }

  private generateDepartment(): string {
    const departments = [
      'Engineering',
      'Sales',
      'Marketing',
      'Finance',
      'HR',
      'Operations',
      'Customer Support',
      'Executive',
      'IT',
      'Legal',
      'Compliance',
      'Manufacturing'
    ];
    return departments[Math.floor(Math.random() * departments.length)];
  }

  // Dynamic response generators
  private generateBSODAnalysis(deviceId: string, errorCode: string, model: string, timestamp: string): string {
    const crashCount = Math.floor(Math.random() * 5) + 1;
    const affectedUsers = Math.floor(Math.random() * 20) + 5;
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    const location = this.generateLocation();
    
    return `🔍 **Enterprise BSOD Fleet Analysis** - ${timestamp}

**Device Information:**
- Device ID: ${deviceId}
- Model: ${model}
- Department: ${department}
- Location: ${location}
- Error Code: ${errorCode}
- Crash Count: ${crashCount} incidents in last 24 hours

**Fleet Impact Assessment:**
- **Total Similar Incidents**: ${affectedUsers} devices across enterprise
- **Affected Departments**: ${department}, Engineering, Sales
- **Geographic Spread**: ${location}, Regional Office - Austin, Corporate HQ
- **Fleet Health**: ${fleetStats.totalDevices} total devices, ${fleetStats.criticalIssues} critical issues

**Enterprise Analysis:**
This ${errorCode} error pattern indicates a potential fleet-wide driver compatibility issue. Analysis shows:
- **Root Cause**: Intel Graphics driver incompatibility with recent Windows Update KB5012592
- **Risk Level**: HIGH - Affecting multiple business units
- **Business Impact**: Productivity loss estimated at ${Math.floor(Math.random() * 20) + 10} hours per affected user

**Immediate Enterprise Actions:**
1. **Fleet-wide Driver Update**: Deploy Intel Graphics Driver 30.0.101.1404 to all affected models
2. **Emergency Patch**: Apply registry fix to prevent further crashes
3. **Monitoring**: Enable enhanced crash reporting across enterprise

**Deployment Strategy:**
- **Phase 1**: Critical users (${department}, Executive) - Immediate deployment
- **Phase 2**: High-priority departments - Within 24 hours
- **Phase 3**: Remaining fleet - Within 72 hours

**Compliance & Risk:**
- **SLA Impact**: Potential breach of 99.9% uptime SLA
- **Security Risk**: Crashes may indicate potential security vulnerabilities
- **Audit Trail**: All incidents logged for compliance reporting

Would you like me to:
- Generate enterprise-wide deployment plan?
- Create executive summary for management?
- Schedule automated fleet remediation?`;
  }

  private generateBSODFollowUp(deviceId: string, errorCode: string, model: string): string {
    const solutions = [
      `Based on our previous analysis of ${deviceId}, I've identified the specific fix:

**Targeted Solution for ${errorCode}:**
1. **Immediate Fix**: Disable hardware acceleration in Chrome/Edge
2. **Driver Update**: Install Intel Graphics Driver 30.0.101.1404
3. **Registry Fix**: Apply memory management optimization

**Success Rate**: 94% resolution rate for this specific error code on ${model}

Would you like me to generate the automated fix script?`,

      `Following up on the ${errorCode} issue with ${deviceId}:

**Progress Update:**
- Memory diagnostic completed: No hardware issues detected
- Driver compatibility check: Intel Graphics driver needs update
- System optimization: 3 registry entries need adjustment

**Recommended Action Plan:**
1. Deploy driver update to affected devices (${deviceId} and 23 similar devices)
2. Schedule maintenance window for registry fixes
3. Monitor for 48 hours post-fix

**Risk Assessment**: Low risk - Standard procedure with 98% success rate

Should I proceed with the automated deployment?`
    ];
    return solutions[Math.floor(Math.random() * solutions.length)];
  }

  private generateBIOSUpdate(deviceId: string, model: string, timestamp: string): string {
    const currentVersion = `N2HET${Math.floor(Math.random() * 50) + 20}W`;
    const newVersion = `N2HET${Math.floor(Math.random() * 50) + 70}W`;
    const criticalUpdates = Math.floor(Math.random() * 5) + 1;
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    const location = this.generateLocation();
    
    return `🔧 **Enterprise BIOS Management Analysis** - ${timestamp}

**Device Information:**
- Device ID: ${deviceId}
- Model: ${model}
- Department: ${department}
- Location: ${location}
- Current BIOS: ${currentVersion}
- Available Update: ${newVersion}

**Enterprise Fleet Status:**
- **Total Devices**: ${fleetStats.totalDevices} in enterprise
- **Devices Needing BIOS Update**: ${fleetStats.pendingUpdates} (${Math.floor(fleetStats.pendingUpdates / fleetStats.totalDevices * 100)}% of fleet)
- **Critical Security Patches**: ${criticalUpdates} vulnerabilities addressed
- **Compliance Status**: ${criticalUpdates > 3 ? 'NON-COMPLIANT' : 'AT RISK'}

**Security & Compliance Impact:**
- **CVE-2023-${Math.floor(Math.random() * 9000) + 1000}**: Intel ME vulnerability (CRITICAL)
- **CVE-2023-${Math.floor(Math.random() * 9000) + 1000}**: UEFI bootkit vulnerability (HIGH)
- **Regulatory Compliance**: SOX, HIPAA, PCI-DSS requirements
- **Risk Assessment**: ${criticalUpdates > 3 ? 'CRITICAL - Immediate action required' : 'HIGH - Schedule within 48 hours'}

**Enterprise Deployment Strategy:**
1. **Phase 1 - Critical Systems** (${department}, Executive): Immediate deployment
2. **Phase 2 - Production Systems**: Scheduled maintenance window
3. **Phase 3 - Standard Users**: Automated deployment during off-hours

**Business Impact Analysis:**
- **Downtime per Device**: 5-8 minutes (automatic restart)
- **Productivity Impact**: Minimal with proper scheduling
- **Security Risk**: ${criticalUpdates > 3 ? 'CRITICAL - Potential data breach' : 'HIGH - Compliance violation'}
- **Cost of Delay**: Estimated $${Math.floor(Math.random() * 50000) + 10000} per day

**Automated Deployment Options:**
- **SCCM Integration**: Deploy via System Center Configuration Manager
- **Intune Deployment**: Cloud-based management for remote devices
- **Lenovo Vantage**: Automated BIOS updates with user consent
- **Maintenance Windows**: Schedule during business hours or off-hours

**Compliance & Audit:**
- **Change Management**: ITIL-compliant change process
- **Audit Trail**: Complete deployment logging
- **Rollback Plan**: Automated rollback capability
- **Success Metrics**: 99.5% deployment success rate

Would you like me to:
- Create enterprise deployment schedule?
- Generate compliance risk assessment?
- Set up automated fleet deployment?`;
  }

  private generateBIOSFollowUp(deviceId: string, model: string): string {
    const updateStatus = Math.random() > 0.5 ? 'completed' : 'in progress';
    
    if (updateStatus === 'completed') {
      return `✅ **BIOS Update Completed Successfully**

**Device**: ${deviceId} (${model})
**Update Time**: ${this.generateTimestamp()}
**Duration**: 4 minutes 23 seconds

**Post-Update Status:**
- System boot time: Improved by 18%
- Battery life: Extended by 12%
- Thermal performance: Optimized
- All security patches: Applied

**Verification Results:**
- Hardware functionality: ✅ All tests passed
- Driver compatibility: ✅ No issues detected
- System stability: ✅ 24-hour monitoring recommended

**Next Steps:**
- Monitor system performance for 48 hours
- Update device inventory records
- Notify user of completion

The update has been successfully applied to ${deviceId}. Is there anything else you'd like me to check?`;
    } else {
      return `⏳ **BIOS Update in Progress**

**Device**: ${deviceId} (${model})
**Current Status**: Update in progress (Step 3 of 5)
**Estimated Time Remaining**: 2 minutes

**Update Progress:**
- ✅ Pre-update backup completed
- ✅ System compatibility verified
- 🔄 BIOS flash in progress (60% complete)
- ⏳ Driver verification pending
- ⏳ System restart pending

**Important Notes:**
- Do not power off the device during update
- System will automatically restart when complete
- Update process is irreversible once started

**Monitoring:**
I'm actively monitoring the update process. You'll receive a notification when complete.

Would you like me to continue monitoring or is there anything else I can help with?`;
    }
  }

  private generateNetworkAnalysis(deviceId: string, location: string, timestamp: string): string {
    const signalStrength = Math.floor(Math.random() * 40) + 20; // 20-60%
    const speed = Math.floor(Math.random() * 50) + 25; // 25-75 Mbps
    const issues = Math.floor(Math.random() * 3) + 1;
    
    return `🌐 **Network Connectivity Analysis** - ${timestamp}

**Device Details:**
- Device ID: ${deviceId}
- Location: ${location}
- Connection Type: WiFi 6 (802.11ax)

**Current Status:**
- Signal Strength: ${signalStrength}% (${signalStrength > 50 ? 'Good' : 'Poor'})
- Download Speed: ${speed} Mbps
- Latency: ${Math.floor(Math.random() * 20) + 5}ms
- Connection Stability: ${Math.floor(Math.random() * 20) + 80}%

**Issues Detected:**
${issues === 1 ? '- Intermittent disconnections during peak hours' : 
  issues === 2 ? '- Slow DNS resolution (2.3s average)\n- High packet loss (3.2%)' :
  '- Driver compatibility issues\n- Channel congestion on 2.4GHz\n- Authentication timeouts'}

**Root Cause Analysis:**
- Access Point: ${location} AP-${Math.floor(Math.random() * 10) + 1}
- Channel Utilization: ${Math.floor(Math.random() * 30) + 60}%
- Interference Sources: ${Math.floor(Math.random() * 3) + 1} nearby devices

**Recommended Solutions:**
1. **Immediate**: Switch to 5GHz band (if available)
2. **Short-term**: Update WiFi driver to latest version
3. **Long-term**: Deploy additional access point in ${location}

**Network Optimization:**
- DNS servers: Switch to 8.8.8.8 and 1.1.1.1
- MTU size: Reduce to 1400 bytes
- Power management: Disable WiFi power saving

Would you like me to implement these fixes automatically?`;
  }

  private generateNetworkFollowUp(deviceId: string, location: string): string {
    const fixStatus = Math.random() > 0.3 ? 'successful' : 'partial';
    
    if (fixStatus === 'successful') {
      return `✅ **Network Issue Resolved**

**Device**: ${deviceId} at ${location}
**Resolution Time**: ${Math.floor(Math.random() * 10) + 2} minutes

**Applied Fixes:**
- ✅ WiFi driver updated to version 22.190.0.4
- ✅ Switched to 5GHz band (Channel 149)
- ✅ DNS servers updated to 8.8.8.8, 1.1.1.1
- ✅ Power management optimized

**Performance Improvement:**
- Signal Strength: Improved from 35% to 85%
- Download Speed: Increased from 28 Mbps to 156 Mbps
- Latency: Reduced from 45ms to 12ms
- Connection Stability: Now at 98%

**Verification:**
- Speed test completed: ✅ 156 Mbps down, 89 Mbps up
- Ping test: ✅ 12ms average latency
- Connection stability: ✅ No disconnections in 15 minutes

The network connectivity issues for ${deviceId} have been successfully resolved. Is there anything else you'd like me to check?`;
    } else {
      return `⚠️ **Partial Network Resolution**

**Device**: ${deviceId} at ${location}
**Status**: Some improvements made, additional action needed

**Completed Actions:**
- ✅ WiFi driver updated
- ✅ DNS servers optimized
- ⚠️ Still experiencing intermittent connectivity

**Remaining Issues:**
- Signal strength: 45% (improved from 35%)
- Occasional disconnections during peak hours
- Channel congestion on available bands

**Next Steps:**
1. **Immediate**: Move device closer to access point
2. **Short-term**: Schedule access point maintenance
3. **Long-term**: Deploy additional WiFi 6 access point

**Alternative Solutions:**
- Use Ethernet connection if available
- Enable WiFi 6E if supported
- Implement network load balancing

Would you like me to schedule the access point maintenance or explore other options?`;
    }
  }

  private generateBatteryAnalysis(deviceId: string, model: string, timestamp: string): string {
    const batteryHealth = Math.floor(Math.random() * 30) + 70; // 70-100%
    const cycles = Math.floor(Math.random() * 500) + 200;
    const capacity = Math.floor(Math.random() * 20) + 80; // 80-100%
    
    return `🔋 **Battery Health Analysis** - ${timestamp}

**Device Information:**
- Device ID: ${deviceId}
- Model: ${model}
- Battery Type: Li-Polymer 57Wh

**Current Status:**
- Battery Health: ${batteryHealth}% (${batteryHealth > 85 ? 'Excellent' : batteryHealth > 70 ? 'Good' : 'Fair'})
- Charge Cycles: ${cycles} cycles
- Current Capacity: ${capacity}% of original
- Current Charge: ${Math.floor(Math.random() * 40) + 30}%

**Performance Metrics:**
- Average Battery Life: ${Math.floor(Math.random() * 3) + 6} hours (normal use)
- Charging Time: ${Math.floor(Math.random() * 30) + 60} minutes (0-100%)
- Power Draw: ${Math.floor(Math.random() * 5) + 8}W (idle), ${Math.floor(Math.random() * 10) + 25}W (active)

**Issues Detected:**
${batteryHealth < 80 ? '- Battery degradation detected (${batteryHealth}% health)\n- Consider replacement within 6 months' : 
  '- No significant issues detected\n- Battery performing within normal parameters'}

**Optimization Recommendations:**
1. **Power Settings**: Enable battery saver mode
2. **Background Apps**: Close unnecessary applications
3. **Display**: Reduce brightness to 70%
4. **Charging**: Use original Lenovo charger for optimal performance

**Battery Care Tips:**
- Avoid deep discharges (keep above 20%)
- Don't leave plugged in at 100% for extended periods
- Calibrate battery monthly (full charge/discharge cycle)

Would you like me to implement these optimizations or schedule a battery replacement?`;
  }

  private generateBatteryFollowUp(deviceId: string, model: string): string {
    const optimizationStatus = Math.random() > 0.2 ? 'successful' : 'needs_attention';
    
    if (optimizationStatus === 'successful') {
      return `✅ **Battery Optimization Complete**

**Device**: ${deviceId} (${model})
**Optimization Time**: ${Math.floor(Math.random() * 5) + 2} minutes

**Applied Optimizations:**
- ✅ Battery saver mode enabled
- ✅ Background app restrictions configured
- ✅ Display brightness optimized (70%)
- ✅ Power plan set to "Balanced"
- ✅ USB selective suspend enabled

**Performance Improvements:**
- Battery life: Extended by ${Math.floor(Math.random() * 20) + 15}%
- Power consumption: Reduced by ${Math.floor(Math.random() * 15) + 10}%
- Charging efficiency: Improved by 8%
- Heat generation: Reduced by 12%

**Current Status:**
- Battery Health: ${Math.floor(Math.random() * 10) + 85}%
- Estimated Runtime: ${Math.floor(Math.random() * 2) + 7} hours
- Charging Status: Optimal

**Monitoring:**
I'll continue monitoring battery performance for the next 24 hours to ensure optimal operation.

The battery optimization for ${deviceId} has been successfully completed. Is there anything else you'd like me to check?`;
    } else {
      return `⚠️ **Battery Optimization Results**

**Device**: ${deviceId} (${model})
**Status**: Optimization applied, but battery replacement recommended

**Completed Actions:**
- ✅ Power settings optimized
- ✅ Background processes reduced
- ✅ Display settings adjusted

**Current Battery Status:**
- Health: ${Math.floor(Math.random() * 15) + 65}% (Below optimal)
- Cycles: ${Math.floor(Math.random() * 200) + 800} (High usage)
- Performance: Degraded by 25% from original

**Recommendation:**
Based on the analysis, I recommend scheduling a battery replacement within the next 30 days. The current battery is showing signs of significant wear.

**Replacement Options:**
1. **Warranty Service**: Covered under extended warranty
2. **On-site Service**: Technician visit scheduled
3. **Self-service**: Battery shipped for user replacement

**Cost**: ${Math.random() > 0.5 ? 'Covered under warranty' : '$89.99 + labor'}

Would you like me to schedule the battery replacement or explore warranty options?`;
    }
  }

  private generatePerformanceAnalysis(deviceId: string, model: string, timestamp: string): string {
    const cpuUsage = Math.floor(Math.random() * 40) + 60; // 60-100%
    const memoryUsage = Math.floor(Math.random() * 30) + 70; // 70-100%
    const diskUsage = Math.floor(Math.random() * 20) + 80; // 80-100%
    
    return `⚡ **Performance Analysis Report** - ${timestamp}

**Device Details:**
- Device ID: ${deviceId}
- Model: ${model}
- Analysis Duration: 15 minutes

**Current Performance Metrics:**
- CPU Usage: ${cpuUsage}% (${cpuUsage > 80 ? 'High' : 'Normal'})
- Memory Usage: ${memoryUsage}% (${memoryUsage > 85 ? 'Critical' : 'High'})
- Disk Usage: ${diskUsage}% (${diskUsage > 90 ? 'Critical' : 'High'})
- Temperature: ${Math.floor(Math.random() * 10) + 65}°C

**Performance Issues Identified:**
${cpuUsage > 80 ? '- High CPU usage detected\n' : ''}${memoryUsage > 85 ? '- Memory pressure causing slowdowns\n' : ''}${diskUsage > 90 ? '- Disk space critically low\n' : ''}- Background processes consuming resources

**Top Resource Consumers:**
1. **Chrome.exe**: ${Math.floor(Math.random() * 20) + 15}% CPU, ${Math.floor(Math.random() * 30) + 20}% Memory
2. **Teams.exe**: ${Math.floor(Math.random() * 15) + 8}% CPU, ${Math.floor(Math.random() * 25) + 15}% Memory
3. **Windows Defender**: ${Math.floor(Math.random() * 10) + 5}% CPU, ${Math.floor(Math.random() * 15) + 10}% Memory

**Optimization Recommendations:**
1. **Immediate**: Close unnecessary browser tabs and applications
2. **Short-term**: Clear temporary files and browser cache
3. **Long-term**: Add additional RAM (current: 8GB, recommended: 16GB)

**Automated Fixes Available:**
- Clear system temporary files
- Optimize startup programs
- Update device drivers
- Defragment storage (if HDD)

**Expected Improvements:**
- Boot time: 25% faster
- Application launch: 40% faster
- Overall responsiveness: 35% improvement

Would you like me to apply these optimizations automatically?`;
  }

  private generateSecurityAnalysis(deviceId: string, model: string, timestamp: string): string {
    const threats = Math.floor(Math.random() * 3);
    const lastScan = Math.floor(Math.random() * 7) + 1;
    
    return `🔒 **Security Analysis Report** - ${timestamp}

**Device Information:**
- Device ID: ${deviceId}
- Model: ${model}
- Security Status: ${threats === 0 ? 'Secure' : 'Attention Required'}

**Security Status:**
- Windows Defender: ${threats === 0 ? '✅ Active and up-to-date' : '⚠️ Requires attention'}
- Firewall: ✅ Enabled and configured
- Windows Updates: ✅ Latest security patches installed
- Last Full Scan: ${lastScan} days ago

**Threats Detected:**
${threats === 0 ? '- No active threats detected\n- System is secure' : 
  threats === 1 ? '- 1 potentially unwanted program detected\n- Low risk, recommend removal' :
  threats === 2 ? '- 2 suspicious files in quarantine\n- Medium risk, immediate action recommended' :
  '- 3+ threats detected\n- High risk, immediate action required'}

**Security Recommendations:**
1. **Immediate**: ${threats > 0 ? 'Remove detected threats' : 'Schedule regular security scans'}
2. **Short-term**: Enable real-time protection
3. **Long-term**: Implement endpoint detection and response (EDR)

**Compliance Status:**
- Encryption: ✅ BitLocker enabled
- Password Policy: ✅ Compliant
- Software Inventory: ✅ Up-to-date
- Network Security: ✅ VPN configured

**Next Steps:**
${threats > 0 ? 'I recommend running a full system scan and removing detected threats immediately.' : 
  'Your system appears secure. I recommend scheduling weekly security scans.'}

Would you like me to run a full security scan or implement additional security measures?`;
  }

  private generateDriverAnalysis(deviceId: string, model: string, timestamp: string): string {
    const outdatedDrivers = Math.floor(Math.random() * 5) + 1;
    const criticalDrivers = Math.floor(Math.random() * 2) + 1;
    
    return `🔧 **Driver Analysis Report** - ${timestamp}

**Device Details:**
- Device ID: ${deviceId}
- Model: ${model}
- Scan Duration: 8 minutes

**Driver Status Summary:**
- Total Drivers: ${Math.floor(Math.random() * 20) + 45}
- Up-to-date: ${Math.floor(Math.random() * 10) + 40}
- Outdated: ${outdatedDrivers}
- Critical Updates: ${criticalDrivers}

**Critical Driver Issues:**
${criticalDrivers === 1 ? '- Intel Graphics Driver: Version 27.20.100.8681 (Current: 30.0.101.1404)' :
  '- Intel Graphics Driver: Version 27.20.100.8681 (Current: 30.0.101.1404)\n- Realtek Audio Driver: Version 6.0.9285.1 (Current: 6.0.9373.1)'}

**Outdated Drivers:**
1. **Network Adapter**: Intel Wi-Fi 6 AX201 - Update available
2. **USB Controller**: Intel USB 3.0 eXtensible Host Controller - Update available
3. **Audio Device**: Realtek High Definition Audio - Update available
${outdatedDrivers > 3 ? '4. **Bluetooth**: Intel Bluetooth - Update available\n5. **Touchpad**: Synaptics TouchPad - Update available' : ''}

**Impact Assessment:**
- Performance: ${outdatedDrivers > 3 ? 'Significant impact' : 'Moderate impact'}
- Stability: ${criticalDrivers > 1 ? 'High risk of crashes' : 'Low risk'}
- Security: ${criticalDrivers > 0 ? 'Security vulnerabilities present' : 'No security issues'}

**Update Recommendations:**
1. **Priority 1**: Update critical drivers immediately
2. **Priority 2**: Update network and audio drivers
3. **Priority 3**: Update remaining drivers during maintenance window

**Automated Update Options:**
- **Immediate Update**: Update all drivers now (15-20 minutes)
- **Scheduled Update**: Update during next maintenance window
- **Selective Update**: Choose specific drivers to update

**Risk Assessment**: Low risk - Standard driver update procedure

Would you like me to proceed with the driver updates?`;
  }

  private generateGeneralHelp(deviceId: string, model: string): string {
    const helpTopics = [
      'enterprise fleet management',
      'device lifecycle optimization',
      'compliance and governance',
      'software deployment automation',
      'security and risk management'
    ];
    const randomTopic = helpTopics[Math.floor(Math.random() * helpTopics.length)];
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    
    return `🏢 **Enterprise IT Management Assistant**

I'm your Lenovo Enterprise IT Assist, specialized in large-scale fleet management and enterprise operations.

**Enterprise Capabilities:**
- **Fleet Management**: Monitor and manage ${fleetStats.totalDevices} devices across enterprise
- **Device Lifecycle**: Asset management, warranty tracking, and replacement planning
- **Compliance & Governance**: SOX, HIPAA, PCI-DSS, GDPR compliance monitoring
- **Software Deployment**: Automated deployment via SCCM, Intune, and Lenovo Vantage
- **Security Management**: Enterprise security policies and risk assessment

**Enterprise Services:**
- **Fleet Analytics**: Comprehensive reporting and dashboard analytics
- **Asset Management**: Inventory tracking, depreciation, and budget planning
- **Compliance Auditing**: Automated compliance monitoring and reporting
- **Deployment Automation**: Zero-touch deployments and self-service portals
- **Risk Management**: Security assessment and incident response

**Current Fleet Status:**
- **Total Devices**: ${fleetStats.totalDevices} under management
- **Active Devices**: ${fleetStats.activeDevices} (${Math.floor(fleetStats.activeDevices / fleetStats.totalDevices * 100)}%)
- **Critical Issues**: ${fleetStats.criticalIssues} requiring immediate attention
- **Pending Updates**: ${fleetStats.pendingUpdates} devices need updates

**Department Focus:**
- **${department}**: ${Math.floor(Math.random() * 500) + 200} devices, specialized requirements
- **Executive Tier**: Premium support and priority handling
- **Engineering**: High-performance computing and specialized software
- **Sales**: Mobile workforce and CRM integration

**Enterprise Features:**
- **Multi-location Support**: Corporate HQ, regional offices, remote workers
- **Automated Monitoring**: 24/7 fleet health monitoring and alerting
- **Cost Optimization**: Budget planning and ROI analysis
- **Scalability**: Support for enterprise growth and expansion

What enterprise IT challenge can I help you solve? I'm ready to assist with ${randomTopic} or any other enterprise IT management needs!`;
  }

  private generateDefaultResponse(userMessage: string, deviceId: string, model: string, isFollowUp: boolean): string {
    const responses = [
      `I understand you're asking about "${userMessage}". Let me help you with that.

**Device Context**: ${deviceId} (${model})
**Analysis**: I can assist with various IT support topics including device troubleshooting, performance optimization, security management, and more.

**What I can help with:**
- Device-specific issues for ${model}
- System diagnostics and troubleshooting
- Performance optimization
- Security and compliance
- Software deployment and updates

Could you provide more details about what you're trying to accomplish? The more specific you are, the better I can help!`,

      `Thanks for your question about "${userMessage}". I'm here to help with your IT support needs.

**Current Device**: ${deviceId} (${model})
**Status**: ${isFollowUp ? 'Continuing previous conversation' : 'New inquiry'}

**My Capabilities:**
- **Diagnostic Analysis**: System health and performance monitoring
- **Troubleshooting**: Step-by-step problem resolution
- **Best Practices**: IT management recommendations
- **Reporting**: Generate detailed analysis reports

**Popular Topics:**
- BSOD crash analysis and prevention
- BIOS update management
- Network connectivity issues
- Battery and power optimization
- Driver compatibility problems

What specific aspect would you like me to focus on? I'm ready to provide detailed assistance!`,

      `I'm ready to help with "${userMessage}". As your Lenovo IT Assist, I can provide comprehensive support.

**Device Information**: ${deviceId} (${model})
**Support Level**: Full diagnostic and troubleshooting capabilities

**How I Can Assist:**
- Analyze device performance and health
- Troubleshoot specific technical issues
- Provide recommendations for improvements
- Generate reports and insights
- Suggest automation opportunities

**Getting Started:**
You can ask me about:
- Specific device issues you're experiencing
- System performance optimization
- Security and compliance questions
- Software deployment strategies
- Hardware troubleshooting

What would you like me to analyze or help you with today? I'm here to make your IT management easier and more efficient!`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Enterprise-focused response generators
  private generateDeviceLifecycleAnalysis(deviceId: string, model: string, timestamp: string): string {
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    const location = this.generateLocation();
    const purchaseDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28));
    const warrantyExpiry = new Date(purchaseDate.getTime() + (3 * 365 * 24 * 60 * 60 * 1000)); // 3 years
    const daysUntilWarrantyExpiry = Math.floor((warrantyExpiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    return `📊 **Enterprise Device Lifecycle Management** - ${timestamp}

**Device Asset Information:**
- Device ID: ${deviceId}
- Model: ${model}
- Department: ${department}
- Location: ${location}
- Purchase Date: ${purchaseDate.toLocaleDateString()}
- Warranty Status: ${daysUntilWarrantyExpiry > 0 ? `Active (${daysUntilWarrantyExpiry} days remaining)` : 'Expired'}
- Asset Tag: ${department.toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}

**Fleet Lifecycle Overview:**
- **Total Assets**: ${fleetStats.totalDevices} devices under management
- **Warranty Expiring Soon**: ${fleetStats.warrantyExpiring} devices (next 90 days)
- **End of Life**: ${fleetStats.endOfLife} devices (beyond 5 years)
- **Replacement Needed**: ${Math.floor(Math.random() * 50) + 20} devices

**Asset Health Assessment:**
- **Hardware Condition**: ${Math.random() > 0.3 ? 'Good' : 'Fair'} (${Math.floor(Math.random() * 30) + 70}% remaining life)
- **Performance Rating**: ${Math.random() > 0.4 ? 'Optimal' : 'Degraded'} (${Math.floor(Math.random() * 20) + 80}% of original)
- **Security Compliance**: ${Math.random() > 0.2 ? 'Compliant' : 'Needs Attention'}
- **Software Currency**: ${Math.random() > 0.3 ? 'Current' : 'Outdated'}

**Financial Analysis:**
- **Original Cost**: $${Math.floor(Math.random() * 2000) + 1000}
- **Depreciation**: ${Math.floor(Math.random() * 60) + 20}% (${Math.floor(Math.random() * 3) + 2} years old)
- **Current Value**: $${Math.floor(Math.random() * 800) + 200}
- **Replacement Cost**: $${Math.floor(Math.random() * 2500) + 1200}

**Lifecycle Recommendations:**
${daysUntilWarrantyExpiry < 90 ? '🚨 **URGENT**: Warranty expires in ' + daysUntilWarrantyExpiry + ' days - Schedule replacement' : 
  daysUntilWarrantyExpiry < 180 ? '⚠️ **PLAN**: Warranty expires in ' + daysUntilWarrantyExpiry + ' days - Plan replacement' :
  '✅ **STABLE**: Warranty active for ' + daysUntilWarrantyExpiry + ' days'}

**Asset Management Actions:**
1. **Immediate**: Update asset inventory records
2. **Short-term**: Schedule hardware refresh for EOL devices
3. **Long-term**: Implement automated lifecycle tracking

**Budget Planning:**
- **Q1 Replacement Budget**: $${Math.floor(Math.random() * 100000) + 50000}
- **Q2-Q4 Planning**: ${Math.floor(Math.random() * 200) + 100} devices scheduled for replacement
- **Cost Optimization**: Consider extended warranty vs. replacement

Would you like me to:
- Generate asset replacement schedule?
- Create budget planning report?
- Set up automated lifecycle alerts?`;
  }

  private generateFleetAnalytics(deviceId: string, model: string, timestamp: string): string {
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    const location = this.generateLocation();
    const uptime = Math.floor(Math.random() * 5) + 95; // 95-99%
    const supportTickets = Math.floor(Math.random() * 100) + 50;
    
    return `📈 **Enterprise Fleet Analytics Dashboard** - ${timestamp}

**Fleet Overview:**
- **Total Devices**: ${fleetStats.totalDevices} across enterprise
- **Active Devices**: ${fleetStats.activeDevices} (${Math.floor(fleetStats.activeDevices / fleetStats.totalDevices * 100)}%)
- **Offline Devices**: ${fleetStats.offlineDevices} (${Math.floor(fleetStats.offlineDevices / fleetStats.totalDevices * 100)}%)
- **Overall Uptime**: ${uptime}% (Target: 99.5%)

**Device Distribution:**
- **ThinkPad X1 Series**: ${Math.floor(Math.random() * 2000) + 1000} devices (${Math.floor(Math.random() * 20) + 10}%)
- **ThinkPad T Series**: ${Math.floor(Math.random() * 3000) + 2000} devices (${Math.floor(Math.random() * 25) + 15}%)
- **ThinkPad E Series**: ${Math.floor(Math.random() * 4000) + 3000} devices (${Math.floor(Math.random() * 30) + 20}%)
- **ThinkPad P Series**: ${Math.floor(Math.random() * 1000) + 500} devices (${Math.floor(Math.random() * 10) + 5}%)

**Geographic Distribution:**
- **Corporate HQ**: ${Math.floor(Math.random() * 2000) + 1000} devices
- **Regional Offices**: ${Math.floor(Math.random() * 3000) + 2000} devices
- **Remote Workers**: ${Math.floor(Math.random() * 2000) + 1000} devices
- **Manufacturing Sites**: ${Math.floor(Math.random() * 1000) + 500} devices

**Performance Metrics:**
- **Average Response Time**: ${Math.floor(Math.random() * 200) + 50}ms
- **Support Tickets (30 days)**: ${supportTickets} (${Math.floor(supportTickets / fleetStats.totalDevices * 1000)} per 1000 devices)
- **Critical Issues**: ${fleetStats.criticalIssues} (${Math.floor(fleetStats.criticalIssues / fleetStats.totalDevices * 1000)} per 1000 devices)
- **Security Incidents**: ${Math.floor(Math.random() * 10) + 2} (Low risk)

**Department Analytics:**
- **${department}**: ${Math.floor(Math.random() * 500) + 200} devices, ${Math.floor(Math.random() * 20) + 5}% of fleet
- **Engineering**: ${Math.floor(Math.random() * 800) + 400} devices, highest performance requirements
- **Sales**: ${Math.floor(Math.random() * 600) + 300} devices, mobile-heavy usage
- **Executive**: ${Math.floor(Math.random() * 100) + 50} devices, premium support tier

**Cost Analysis:**
- **Monthly IT Support Cost**: $${Math.floor(Math.random() * 50000) + 100000}
- **Cost per Device**: $${Math.floor(Math.random() * 20) + 10}/month
- **Hardware Refresh Budget**: $${Math.floor(Math.random() * 500000) + 1000000}/year
- **ROI on Automation**: ${Math.floor(Math.random() * 30) + 15}% cost reduction

**Trends & Insights:**
- **Device Age**: ${Math.floor(Math.random() * 2) + 2} years average
- **Replacement Cycle**: ${Math.floor(Math.random() * 2) + 3} years
- **Growth Rate**: ${Math.floor(Math.random() * 10) + 5}% year-over-year
- **Efficiency Gains**: ${Math.floor(Math.random() * 15) + 10}% improvement with automation

**Predictive Analytics:**
- **Devices at Risk**: ${Math.floor(Math.random() * 100) + 50} (next 90 days)
- **Capacity Planning**: ${Math.floor(Math.random() * 200) + 100} new devices needed
- **Budget Forecast**: $${Math.floor(Math.random() * 200000) + 500000} additional investment

Would you like me to:
- Generate executive summary report?
- Create department-specific analytics?
- Set up automated fleet monitoring?`;
  }

  private generateComplianceAnalysis(deviceId: string, model: string, timestamp: string): string {
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    const location = this.generateLocation();
    const complianceScore = Math.floor(Math.random() * 20) + 80; // 80-100%
    const auditDate = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000);
    
    return `🛡️ **Enterprise Compliance & Governance Analysis** - ${timestamp}

**Device Compliance Status:**
- Device ID: ${deviceId}
- Model: ${model}
- Department: ${department}
- Location: ${location}
- Compliance Score: ${complianceScore}% (${complianceScore > 90 ? 'EXCELLENT' : complianceScore > 80 ? 'GOOD' : 'NEEDS ATTENTION'})

**Enterprise Compliance Overview:**
- **Total Devices**: ${fleetStats.totalDevices} under governance
- **Compliant Devices**: ${Math.floor(fleetStats.totalDevices * complianceScore / 100)} (${complianceScore}%)
- **Non-Compliant Devices**: ${Math.floor(fleetStats.totalDevices * (100 - complianceScore) / 100)} (${100 - complianceScore}%)
- **Last Audit**: ${auditDate.toLocaleDateString()}

**Regulatory Compliance Status:**
- **SOX Compliance**: ${Math.random() > 0.1 ? '✅ COMPLIANT' : '⚠️ AT RISK'}
- **HIPAA Compliance**: ${Math.random() > 0.15 ? '✅ COMPLIANT' : '⚠️ AT RISK'}
- **PCI-DSS Compliance**: ${Math.random() > 0.2 ? '✅ COMPLIANT' : '⚠️ AT RISK'}
- **GDPR Compliance**: ${Math.random() > 0.1 ? '✅ COMPLIANT' : '⚠️ AT RISK'}

**Security Compliance:**
- **Encryption Status**: ${Math.random() > 0.05 ? '✅ 100% Encrypted' : '⚠️ 95% Encrypted'}
- **Antivirus Coverage**: ${Math.random() > 0.02 ? '✅ 100% Protected' : '⚠️ 98% Protected'}
- **Patch Management**: ${Math.random() > 0.1 ? '✅ Current' : '⚠️ 5% Outdated'}
- **Access Controls**: ${Math.random() > 0.05 ? '✅ Enforced' : '⚠️ Needs Review'}

**Policy Compliance:**
- **Password Policy**: ${Math.random() > 0.1 ? '✅ Enforced' : '⚠️ 90% Compliant'}
- **Software Installation**: ${Math.random() > 0.15 ? '✅ Restricted' : '⚠️ Some Violations'}
- **Data Retention**: ${Math.random() > 0.2 ? '✅ Automated' : '⚠️ Manual Process'}
- **Backup Compliance**: ${Math.random() > 0.1 ? '✅ 100% Backed Up' : '⚠️ 95% Backed Up'}

**Risk Assessment:**
- **High Risk Devices**: ${Math.floor(Math.random() * 20) + 5} devices
- **Medium Risk Devices**: ${Math.floor(Math.random() * 50) + 20} devices
- **Low Risk Devices**: ${fleetStats.totalDevices - Math.floor(Math.random() * 70) + 25} devices
- **Overall Risk Level**: ${Math.random() > 0.3 ? 'LOW' : 'MEDIUM'}

**Compliance Violations:**
- **Critical Violations**: ${Math.floor(Math.random() * 5) + 1} (Immediate action required)
- **Major Violations**: ${Math.floor(Math.random() * 15) + 5} (Action within 48 hours)
- **Minor Violations**: ${Math.floor(Math.random() * 30) + 10} (Action within 7 days)

**Audit Trail:**
- **Last Security Scan**: ${Math.floor(Math.random() * 7) + 1} days ago
- **Last Policy Update**: ${Math.floor(Math.random() * 30) + 1} days ago
- **Last Compliance Review**: ${Math.floor(Math.random() * 90) + 1} days ago
- **Next Scheduled Audit**: ${new Date(Date.now() + Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString()}

**Remediation Actions:**
1. **Immediate**: Address critical violations (${Math.floor(Math.random() * 5) + 1} devices)
2. **Short-term**: Update non-compliant devices (${Math.floor(Math.random() * 50) + 20} devices)
3. **Long-term**: Implement automated compliance monitoring

**Cost of Non-Compliance:**
- **Potential Fines**: $${Math.floor(Math.random() * 100000) + 10000} - $${Math.floor(Math.random() * 1000000) + 100000}
- **Reputation Risk**: ${Math.random() > 0.3 ? 'LOW' : 'MEDIUM'}
- **Business Impact**: ${Math.random() > 0.4 ? 'MINIMAL' : 'SIGNIFICANT'}

Would you like me to:
- Generate compliance audit report?
- Create remediation action plan?
- Set up automated compliance monitoring?`;
  }

  private generateSoftwareDeploymentAnalysis(deviceId: string, model: string, timestamp: string): string {
    const fleetStats = this.generateFleetStats();
    const department = this.generateDepartment();
    const location = this.generateLocation();
    const deploymentSuccess = Math.floor(Math.random() * 10) + 90; // 90-100%
    const pendingDeployments = Math.floor(Math.random() * 100) + 50;
    
    return `🚀 **Enterprise Software Deployment Analysis** - ${timestamp}

**Deployment Overview:**
- Device ID: ${deviceId}
- Model: ${model}
- Department: ${department}
- Location: ${location}
- Deployment Status: ${deploymentSuccess > 95 ? 'SUCCESS' : 'IN PROGRESS'}

**Enterprise Deployment Metrics:**
- **Total Devices**: ${fleetStats.totalDevices} in deployment scope
- **Successful Deployments**: ${Math.floor(fleetStats.totalDevices * deploymentSuccess / 100)} (${deploymentSuccess}%)
- **Failed Deployments**: ${Math.floor(fleetStats.totalDevices * (100 - deploymentSuccess) / 100)} (${100 - deploymentSuccess}%)
- **Pending Deployments**: ${pendingDeployments} devices

**Software Inventory:**
- **Microsoft Office 365**: ${Math.floor(Math.random() * 1000) + 8000} devices (${Math.floor(Math.random() * 20) + 60}%)
- **Adobe Creative Suite**: ${Math.floor(Math.random() * 500) + 200} devices (${Math.floor(Math.random() * 10) + 2}%)
- **Engineering Software**: ${Math.floor(Math.random() * 300) + 100} devices (${Math.floor(Math.random() * 5) + 1}%)
- **Security Software**: ${fleetStats.totalDevices} devices (100%)

**Deployment Channels:**
- **SCCM (System Center)**: ${Math.floor(Math.random() * 2000) + 8000} devices (${Math.floor(Math.random() * 20) + 60}%)
- **Microsoft Intune**: ${Math.floor(Math.random() * 3000) + 2000} devices (${Math.floor(Math.random() * 30) + 20}%)
- **Manual Installation**: ${Math.floor(Math.random() * 500) + 100} devices (${Math.floor(Math.random() * 10) + 1}%)
- **Lenovo Vantage**: ${Math.floor(Math.random() * 1000) + 500} devices (${Math.floor(Math.random() * 15) + 5}%)

**Department-Specific Deployments:**
- **${department}**: ${Math.floor(Math.random() * 200) + 100} devices, specialized software stack
- **Engineering**: CAD software, development tools, simulation software
- **Sales**: CRM tools, presentation software, communication platforms
- **Finance**: Accounting software, financial analysis tools

**Deployment Success Metrics:**
- **Average Deployment Time**: ${Math.floor(Math.random() * 30) + 15} minutes per device
- **Success Rate**: ${deploymentSuccess}% (Target: 95%)
- **Rollback Rate**: ${Math.floor(Math.random() * 5) + 1}% (Low risk)
- **User Satisfaction**: ${Math.floor(Math.random() * 20) + 80}% (Good)

**Automation & Efficiency:**
- **Automated Deployments**: ${Math.floor(Math.random() * 20) + 80}% of total
- **Zero-Touch Deployments**: ${Math.floor(Math.random() * 30) + 60}% of new devices
- **Self-Service Portal**: ${Math.floor(Math.random() * 50) + 200} applications available
- **Deployment Time Reduction**: ${Math.floor(Math.random() * 40) + 60}% vs. manual

**Compliance & Security:**
- **Software Licensing**: ${Math.random() > 0.05 ? '✅ 100% Compliant' : '⚠️ 95% Compliant'}
- **Security Scanning**: ${Math.random() > 0.02 ? '✅ All Software Scanned' : '⚠️ 98% Scanned'}
- **Approval Workflow**: ${Math.random() > 0.1 ? '✅ Automated' : '⚠️ Manual Review'}
- **Audit Trail**: ${Math.random() > 0.05 ? '✅ Complete Logging' : '⚠️ 95% Logged'}

**Cost Analysis:**
- **Software Licensing Cost**: $${Math.floor(Math.random() * 500000) + 1000000}/year
- **Deployment Labor Cost**: $${Math.floor(Math.random() * 100000) + 50000}/year
- **Automation Savings**: $${Math.floor(Math.random() * 200000) + 100000}/year
- **ROI on Automation**: ${Math.floor(Math.random() * 30) + 20}%

**Upcoming Deployments:**
- **Windows 11 Migration**: ${Math.floor(Math.random() * 1000) + 500} devices (Q2 2024)
- **Office 365 Updates**: ${fleetStats.totalDevices} devices (Monthly)
- **Security Patches**: ${fleetStats.totalDevices} devices (Weekly)
- **Department-Specific Apps**: ${Math.floor(Math.random() * 200) + 100} devices (Ongoing)

Would you like me to:
- Generate deployment status report?
- Create software inventory dashboard?
- Set up automated deployment pipeline?`;
  }

  private getMockResponses(userMessage: string): string[] {
    const message = userMessage.toLowerCase();
    
    // Lenovo IT Support specific responses
    if (message.includes('bsod') || message.includes('blue screen') || message.includes('crash')) {
      return [
        `I can help you analyze BSOD crashes. Based on your query, here's what I found:

## BSOD Analysis Summary
- **Total BSOD incidents**: 1,247 in the last 6 months
- **Most common crash types**: 
  - MEMORY_MANAGEMENT (34%)
  - IRQL_NOT_LESS_OR_EQUAL (28%)
  - SYSTEM_SERVICE_EXCEPTION (19%)

## Top Affected Models
- ThinkPad X1 Carbon (Gen 9): 156 incidents
- ThinkPad T14s: 134 incidents
- ThinkPad E15: 98 incidents

## Recommended Actions
1. Update BIOS to latest version
2. Run Windows Memory Diagnostic
3. Check for driver conflicts
4. Review recent software installations

Would you like me to generate a detailed report for any specific model or time period?`,
        
        `BSOD analysis shows interesting patterns. Here's a breakdown:

**Crash Distribution by Month:**
- January: 189 crashes
- February: 203 crashes  
- March: 178 crashes
- April: 156 crashes
- May: 134 crashes
- June: 98 crashes

The downward trend suggests recent driver updates are helping. The most problematic drivers are:
- Intel Graphics drivers (23% of crashes)
- Network adapters (18% of crashes)
- Storage controllers (15% of crashes)

I can help you create an action plan to address the remaining issues.`
      ];
    }

    if (message.includes('bios') || message.includes('firmware') || message.includes('update')) {
      return [
        `BIOS update information for your Lenovo devices:

## Current BIOS Status
- **Devices needing updates**: 2,847 out of 15,234 total devices
- **Critical updates available**: 156 devices
- **Security patches pending**: 423 devices

## Update Priority Matrix
**High Priority (Update within 7 days):**
- ThinkPad X1 series: 89 devices
- ThinkPad T series: 134 devices
- ThinkPad P series: 67 devices

**Medium Priority (Update within 30 days):**
- ThinkPad E series: 234 devices
- ThinkPad L series: 189 devices

## Recommended Update Strategy
1. Deploy critical security updates first
2. Schedule maintenance windows for non-critical updates
3. Test updates on pilot group before full deployment
4. Monitor for any post-update issues

Would you like me to generate a deployment schedule?`,
        
        `BIOS update analysis shows several opportunities for improvement:

**Update Success Rates:**
- Automatic updates: 94.2% success rate
- Manual updates: 97.8% success rate
- Scheduled updates: 96.1% success rate

**Common Update Issues:**
- Power interruption during update: 2.3%
- Incompatible hardware: 1.8%
- User cancellation: 1.7%

**Best Practices:**
- Ensure devices are connected to power
- Close all applications before updating
- Don't interrupt the update process
- Verify update completion

I can help you create a comprehensive BIOS update plan.`
      ];
    }

    if (message.includes('network') || message.includes('wifi') || message.includes('ethernet')) {
      return [
        `Network connectivity analysis for your Lenovo fleet:

## Network Status Overview
- **Devices with connectivity issues**: 234 out of 15,234
- **WiFi connection problems**: 156 devices
- **Ethernet issues**: 78 devices

## Common Network Issues
**WiFi Problems:**
- Driver compatibility: 45% of cases
- Signal strength: 32% of cases
- Authentication failures: 23% of cases

**Ethernet Issues:**
- Cable problems: 38% of cases
- Port failures: 29% of cases
- Driver issues: 33% of cases

## Resolution Steps
1. Update network drivers to latest version
2. Reset network settings
3. Check physical connections
4. Verify network configuration

Would you like me to generate a network troubleshooting guide?`,
        
        `Network performance analysis reveals some interesting patterns:

**Connection Quality Metrics:**
- Average WiFi speed: 45.2 Mbps
- Average Ethernet speed: 89.7 Mbps
- Connection stability: 94.3%

**Problem Areas:**
- Conference rooms: 23% of issues
- Remote locations: 34% of issues
- Manufacturing floor: 18% of issues

**Recommended Solutions:**
- Deploy WiFi 6 access points in high-traffic areas
- Implement network monitoring tools
- Create network troubleshooting documentation
- Train IT staff on network diagnostics

I can help you create a network improvement plan.`
      ];
    }

    if (message.includes('battery') || message.includes('power') || message.includes('charging')) {
      return [
        `Battery and power management analysis:

## Battery Health Overview
- **Devices with battery issues**: 189 out of 15,234
- **Battery replacement needed**: 67 devices
- **Charging problems**: 122 devices

## Battery Performance Metrics
**Average Battery Life:**
- ThinkPad X1 Carbon: 8.2 hours
- ThinkPad T14s: 7.8 hours
- ThinkPad E15: 6.9 hours

**Common Battery Issues:**
- Rapid discharge: 34% of cases
- Won't charge: 28% of cases
- Battery not detected: 38% of cases

## Optimization Recommendations
1. Enable power management features
2. Update battery drivers
3. Calibrate battery if needed
4. Check power adapter compatibility

Would you like me to create a battery optimization guide?`,
        
        `Power management analysis shows opportunities for improvement:

**Power Consumption Patterns:**
- Peak usage: 9:00 AM - 11:00 AM
- Low usage: 6:00 PM - 8:00 AM
- Average power draw: 45W during active use

**Energy Efficiency Opportunities:**
- Enable sleep mode: Save 23% energy
- Optimize display brightness: Save 15% energy
- Manage background processes: Save 12% energy

**Charging Infrastructure:**
- USB-C charging stations: 89% utilization
- Traditional charging: 94% utilization
- Wireless charging: 67% utilization

I can help you develop a comprehensive power management strategy.`
      ];
    }

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

    // General IT Support responses
    if (message.includes('help') || message.includes('support') || message.includes('issue')) {
      return [
        `I'm here to help with your IT support needs! As Lenovo IT Assist, I can help you with:

## Device Management
- **ThinkPad troubleshooting**: Hardware and software issues
- **BIOS updates**: Firmware management and deployment
- **Driver issues**: Compatibility and performance problems
- **System optimization**: Performance tuning and maintenance

## Common Issues I Can Help With
- Blue screen errors and system crashes
- Network connectivity problems
- Battery and power management
- Software installation and updates
- Security and compliance

## How to Get the Best Help
- Be specific about your device model
- Describe the exact error messages
- Mention what you've already tried
- Include any recent changes to your system

What specific issue are you experiencing?`,
        
        `I'm ready to assist with your IT support request! Here's how I can help:

## My Capabilities
- **Diagnostic Analysis**: System health and performance monitoring
- **Troubleshooting**: Step-by-step problem resolution
- **Best Practices**: IT management recommendations
- **Reporting**: Generate detailed analysis reports
- **Automation**: Suggest automated solutions

## Quick Diagnostics
Based on your fleet of 15,234 Lenovo devices, I can help with:
- Identifying patterns in device issues
- Recommending preventive maintenance
- Optimizing system performance
- Managing software deployments

What would you like me to analyze or help you with today?`
      ];
    }

    // Default responses for general questions
    return [
      `Hello! I'm Lenovo IT Assist, your AI-powered IT support assistant. I'm here to help you with:

## What I Can Do
- **Device Analysis**: Monitor and analyze your Lenovo device fleet
- **Troubleshooting**: Help resolve technical issues
- **Performance Optimization**: Improve system performance
- **Security Management**: Assist with security and compliance
- **Reporting**: Generate detailed IT reports and insights

## Popular Topics
- BSOD crash analysis and prevention
- BIOS update management
- Network connectivity issues
- Battery and power optimization
- Driver compatibility problems

How can I assist you today? Feel free to ask about any IT-related topic!`,
      
      `Welcome to Lenovo IT Assist! I'm designed to help you manage and troubleshoot your IT infrastructure.

## My Specialties
- **ThinkPad Support**: Comprehensive ThinkPad troubleshooting
- **Fleet Management**: Monitor and manage multiple devices
- **Predictive Analytics**: Identify potential issues before they occur
- **Automated Solutions**: Suggest and implement automated fixes
- **Performance Monitoring**: Track and optimize device performance

## Getting Started
You can ask me about:
- Specific device issues you're experiencing
- System performance optimization
- Security and compliance questions
- Software deployment strategies
- Hardware troubleshooting

What would you like to explore first?`,
      
      `I'm Lenovo IT Assist, ready to help with your IT support needs!

## Quick Stats About Your Environment
- **Total Devices**: 15,234 Lenovo devices
- **Active Issues**: 234 devices with current problems
- **System Health**: 98.5% uptime across the fleet
- **Recent Updates**: 2,847 devices pending BIOS updates

## How I Can Help
- Analyze device performance and health
- Troubleshoot specific technical issues
- Provide recommendations for improvements
- Generate reports and insights
- Suggest automation opportunities

What specific area would you like me to focus on? I'm here to make your IT management easier and more efficient!`
    ];
  }
}

export const aiService = AIService.getInstance();
