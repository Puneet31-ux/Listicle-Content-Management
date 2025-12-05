# 🧠 Self-Healing System Documentation

## Overview

The self-healing system automatically learns from every research task, tracks API performance, identifies patterns, and suggests improvements. All changes are documented with dates, reasons, and rollback capabilities.

## How It Works

### 1. **Automatic Learning & Metrics Tracking**

Every time you run "AI Research" on a task, the system:
- ✅ **Logs Performance Metrics** - Tracks API response times, success rates, result quality
- ✅ **Records API Usage** - Brave Search calls, Bright Data scrapes, OpenAI prompts
- ✅ **Captures Results** - Number of pages scraped, insights extracted, errors encountered
- ✅ **Stores Feedback** - User ratings and comments on research quality

**Metrics Tracked:**
```
- Total researches performed
- Success rate per API (Brave, Bright Data, OpenAI)
- Average quality score (1-10)
- Average response times
- Common error patterns
- Failed URLs and failure reasons
```

### 2. **Pattern Detection & Auto-Improvement**

The system analyzes collected data and detects issues:

| Pattern Detected | Auto-Suggested Fix | Priority |
|-----------------|-------------------|----------|
| Bright Data failure rate > 30% | Add retry logic + exponential backoff | 🔴 High |
| Average quality score < 6/10 | Refine OpenAI prompts with examples | 🟡 Medium |
| Brave Search returning < 5 results | Broaden queries, add related terms | 🟡 Medium |
| OpenAI timeout > 10s | Optimize prompt length, batch requests | 🟠 Low |

### 3. **Improvement Proposal Workflow**

When the system detects an issue:

```
1. DETECT → System identifies pattern from metrics
              ↓
2. ANALYZE → Calculate confidence (0-100%) and expected impact
              ↓
3. PROPOSE → Create improvement suggestion with:
              - What changed
              - Why it changed
              - Expected impact (quality %, performance, success rate)
              - Evidence from data
              ↓
4. NOTIFY → 🔔 Alert user: "New improvement available!"
              ↓
5. CONFIRM → User reviews and approves
              ↓
6. APPLY → Auto-apply or manual deployment
              ↓
7. LOG → Document with timestamp, reason, rollback data
```

### 4. **Documentation & Rollback**

Every improvement is logged in `self-healing-log.json`:

```json
{
  "id": "uuid",
  "timestamp": "2025-12-05T10:30:00Z",
  "type": "api_optimization",
  "component": "bright_data",
  "description": "Added retry logic for failed scrapes",
  "reasoning": "Detected 42% failure rate across 15 scrapes. Timeouts and 401 errors.",
  "changes": {
    "before": "Single attempt, immediate fail",
    "after": "3 retries with exponential backoff (1s, 2s, 4s)",
    "diff": "+ Added retry wrapper\n+ Exponential backoff\n+ Better error handling"
  },
  "metrics": {
    "beforeScore": 5.2,
    "afterScore": 8.1,
    "improvement": 55.8
  },
  "status": "applied",
  "approvedBy": "user@example.com",
  "approvedAt": "2025-12-05T10:35:00Z"
}
```

**Rollback Capability:**
If an improvement causes issues, it can be rolled back:
```json
{
  "rollbackData": {
    "reason": "Increased API costs by 3x due to retries",
    "timestamp": "2025-12-05T12:00:00Z",
    "restoredFrom": "Single attempt, immediate fail"
  },
  "status": "rolled_back"
}
```

## API Endpoints

### GET `/api/self-healing`
Get current system health and improvement suggestions

**Response:**
```json
{
  "log": { /* full self-healing log */ },
  "suggestions": [
    {
      "id": "uuid",
      "type": "prompt_refinement",
      "component": "openai_prompts",
      "priority": "high",
      "confidence": 85,
      "description": "Quality scores below target",
      "reasoning": "Avg 5.3/10 across 12 researches",
      "proposedChanges": {
        "file": "src/app/api/research/route.ts",
        "changes": "Add structured output format + examples"
      },
      "expectedImpact": {
        "qualityImprovement": 25,
        "performanceImpact": 200,
        "successRateIncrease": 10
      },
      "basedOnData": {
        "sampleSize": 12,
        "pattern": "Low quality scores",
        "evidence": ["Quality: 5.2", "Quality: 5.5", ...]
      }
    }
  ],
  "summary": {
    "totalImprovements": 5,
    "pendingImprovements": 2,
    "appliedImprovements": 3,
    "totalResearches": 24,
    "overallHealthScore": 78
  }
}
```

### POST `/api/self-healing`
Log research metrics, propose improvements, approve/rollback

**Actions:**

#### 1. Log Research Metrics
```json
{
  "action": "log_research",
  "metrics": {
    "researchId": "uuid",
    "taskId": "task-123",
    "timestamp": "2025-12-05T10:00:00Z",
    "depth": "medium",
    "apisUsed": {
      "braveSearch": true,
      "brightData": true,
      "openAI": true
    },
    "performance": {
      "totalTime": 5234,
      "braveSearchTime": 892,
      "brightDataTime": 3102,
      "openAITime": 1240
    },
    "results": {
      "braveResultsCount": 12,
      "scrapedPagesCount": 3,
      "extractedInsightsCount": 45
    },
    "qualityScore": 8
  }
}
```

#### 2. Propose Improvement
```json
{
  "action": "propose_improvement",
  "improvement": {
    "type": "api_optimization",
    "component": "bright_data",
    "description": "...",
    "reasoning": "...",
    "changes": { "before": "...", "after": "..." },
    "metrics": { "beforeScore": 5, "afterScore": 8 }
  }
}
```

#### 3. Approve Improvement
```json
{
  "action": "approve_improvement",
  "improvementId": "uuid",
  "approvedBy": "user@example.com"
}
```

#### 4. Rollback Improvement
```json
{
  "action": "rollback_improvement",
  "improvementId": "uuid",
  "reason": "Caused performance degradation"
}
```

## System Health Score

The system calculates an overall health score (0-100):

```
Score = 100
  - (Brave failure rate × 20)
  - (Bright Data failure rate × 30)
  - (OpenAI failure rate × 20)
  - (Quality gap × 5)  // if avg quality < 7
  - (Pending improvements × 5)  // max -20
```

**Health Indicators:**
- 🟢 **90-100**: Excellent - All systems optimal
- 🟡 **70-89**: Good - Minor optimizations available
- 🟠 **50-69**: Fair - Several issues detected
- 🔴 **0-49**: Poor - Critical improvements needed

## Integration Points

### In Research API (`src/app/api/research/route.ts`)

After every successful/failed research, automatically log metrics:

```typescript
// After research completes
await fetch('/api/self-healing', {
  method: 'POST',
  body: JSON.stringify({
    action: 'log_research',
    metrics: {
      researchId,
      taskId,
      timestamp: new Date().toISOString(),
      depth,
      apisUsed: { braveSearch, brightData, openAI },
      performance: { totalTime, braveSearchTime, ... },
      results: { braveResultsCount, scrapedPagesCount, ... },
    }
  })
})
```

### In UI (Future Enhancement)

Add a "System Health" dashboard:
- Current health score with trend
- Recent improvements applied
- Pending improvement suggestions
- Performance metrics charts
- Approve/reject improvements UI

## Example Workflow

### Scenario: Bright Data Failing Too Often

**Day 1: Initial Research**
```
User runs 5 researches → 3 fail due to Bright Data timeouts
System logs: 60% failure rate
```

**Day 2: Pattern Detection**
```
System analyzes logs
Detects: Bright Data success rate = 40%
Triggers: Improvement suggestion

Suggestion:
  Type: scraping_enhancement
  Priority: HIGH
  Confidence: 85%
  Proposed: Add retry logic (3 attempts, exponential backoff)
  Expected Impact: +30% success rate
```

**Day 3: User Review & Approval**
```
User reviews suggestion
Approves improvement
System status: APPROVED → ready for deployment
```

**Day 4: Implementation**
```
Developer applies changes to bright-data/route.ts
System logs improvement with full documentation
```

**Day 5: Validation**
```
User runs 5 more researches
Success rate improves to 80%
System updates metrics:
  Before: 40% success
  After: 80% success
  Improvement: +100% (40% → 80%)
```

## File Structure

```
/self-healing-log.json                    # Main log file
/src/lib/self-healing-types.ts           # TypeScript types
/src/app/api/self-healing/route.ts       # API endpoint
/SELF-HEALING-SYSTEM.md                  # This documentation
```

## Future Enhancements

1. **Auto-Apply Mode** - Automatically apply low-risk improvements
2. **A/B Testing** - Test improvements on subset of traffic
3. **ML Predictions** - Predict optimal API parameters
4. **Cost Optimization** - Balance quality vs API costs
5. **Real-time Alerts** - Slack/email notifications for critical issues
6. **Performance Dashboards** - Visual analytics and trends
7. **Feedback Loop** - User ratings improve future suggestions

## Best Practices

✅ **DO:**
- Review improvement suggestions before applying
- Monitor system health score regularly
- Provide feedback on research quality
- Document reasons when rolling back
- Keep self-healing-log.json in version control

❌ **DON'T:**
- Auto-apply high-risk improvements without review
- Delete self-healing-log.json (loses all history)
- Ignore pending improvements for too long
- Skip rollback documentation

## Support

For issues or questions about the self-healing system:
1. Check `self-healing-log.json` for recent changes
2. Review system health score and metrics
3. Check pending improvement suggestions
4. Roll back recent changes if issues started after deployment

---

**Version:** 1.0.0
**Last Updated:** 2025-12-05
**Status:** ✅ Active & Learning
