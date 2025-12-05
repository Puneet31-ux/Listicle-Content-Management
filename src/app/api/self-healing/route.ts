import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { SelfHealingLog, SelfHealingImprovement, ResearchMetrics, ImprovementSuggestion } from '@/lib/self-healing-types'

const SELF_HEALING_LOG_PATH = path.join(process.cwd(), 'self-healing-log.json')

// Helper to read self-healing log
async function readSelfHealingLog(): Promise<SelfHealingLog> {
  try {
    const data = await fs.readFile(SELF_HEALING_LOG_PATH, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Initialize if doesn't exist
    const initialLog: SelfHealingLog = {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
      improvements: [],
      metrics: {
        totalResearches: 0,
        successRate: 0,
        averageQualityScore: 0,
        apiPerformance: {
          braveSearch: {
            totalCalls: 0,
            successRate: 0,
            averageResultsCount: 0,
            averageResponseTime: 0,
            errorPatterns: [],
          },
          brightData: {
            totalCalls: 0,
            successRate: 0,
            averageScrapedPages: 0,
            averageResponseTime: 0,
            failedUrls: [],
            errorPatterns: [],
          },
          openAI: {
            totalCalls: 0,
            successRate: 0,
            averageResponseTime: 0,
            averageTokensUsed: 0,
            errorPatterns: [],
          },
        },
      },
      researchHistory: [],
    }
    await fs.writeFile(SELF_HEALING_LOG_PATH, JSON.stringify(initialLog, null, 2))
    return initialLog
  }
}

// Helper to write self-healing log
async function writeSelfHealingLog(log: SelfHealingLog): Promise<void> {
  log.lastUpdated = new Date().toISOString()
  await fs.writeFile(SELF_HEALING_LOG_PATH, JSON.stringify(log, null, 2))
}

// Analyze patterns and generate improvement suggestions
function generateImprovementSuggestions(log: SelfHealingLog): ImprovementSuggestion[] {
  const suggestions: ImprovementSuggestion[] = []

  // Check Bright Data failure rate
  const brightDataFailureRate = 1 - log.metrics.apiPerformance.brightData.successRate
  if (brightDataFailureRate > 0.3 && log.metrics.apiPerformance.brightData.totalCalls > 5) {
    suggestions.push({
      id: uuidv4(),
      type: 'scraping_enhancement',
      component: 'bright_data',
      priority: 'high',
      confidence: 85,
      description: 'Bright Data success rate is below 70% - enhance error handling and retry logic',
      reasoning: `Detected ${(brightDataFailureRate * 100).toFixed(1)}% failure rate across ${log.metrics.apiPerformance.brightData.totalCalls} calls. Common errors: ${log.metrics.apiPerformance.brightData.errorPatterns.slice(0, 3).join(', ')}`,
      proposedChanges: {
        file: 'src/app/api/bright-data/route.ts',
        changes: 'Add exponential backoff retry (3 attempts), improve timeout handling, add fallback to cached content',
      },
      expectedImpact: {
        qualityImprovement: 15,
        performanceImpact: 500, // slight increase due to retries
        successRateIncrease: 20,
      },
      basedOnData: {
        sampleSize: log.metrics.apiPerformance.brightData.totalCalls,
        pattern: 'High failure rate with timeout and auth errors',
        evidence: log.metrics.apiPerformance.brightData.errorPatterns,
      },
    })
  }

  // Check if quality scores are low
  if (log.metrics.averageQualityScore < 6 && log.metrics.totalResearches > 3) {
    suggestions.push({
      id: uuidv4(),
      type: 'prompt_refinement',
      component: 'openai_prompts',
      priority: 'medium',
      confidence: 70,
      description: 'Research quality scores are below target - refine OpenAI prompts',
      reasoning: `Average quality score is ${log.metrics.averageQualityScore.toFixed(1)}/10 across ${log.metrics.totalResearches} researches`,
      proposedChanges: {
        file: 'src/app/api/research/route.ts',
        changes: 'Enhance prompt with more specific instructions for extracting CTAs, add examples, request structured output',
      },
      expectedImpact: {
        qualityImprovement: 25,
        performanceImpact: 200,
        successRateIncrease: 10,
      },
      basedOnData: {
        sampleSize: log.metrics.totalResearches,
        pattern: 'Low quality scores in research results',
        evidence: log.researchHistory.slice(-5).map(r => `Quality: ${r.qualityScore || 'N/A'}`),
      },
    })
  }

  // Check Brave Search effectiveness
  if (
    log.metrics.apiPerformance.braveSearch.averageResultsCount < 5 &&
    log.metrics.apiPerformance.braveSearch.totalCalls > 3
  ) {
    suggestions.push({
      id: uuidv4(),
      type: 'api_optimization',
      component: 'brave_search',
      priority: 'medium',
      confidence: 75,
      description: 'Brave Search returning low result counts - optimize queries',
      reasoning: `Average ${log.metrics.apiPerformance.braveSearch.averageResultsCount.toFixed(1)} results per search (target: 10+)`,
      proposedChanges: {
        file: 'src/app/api/brave-search/route.ts',
        changes: 'Broaden search queries, add related terms, increase result limit, filter less aggressively',
      },
      expectedImpact: {
        qualityImprovement: 20,
        performanceImpact: 100,
        successRateIncrease: 15,
      },
      basedOnData: {
        sampleSize: log.metrics.apiPerformance.braveSearch.totalCalls,
        pattern: 'Low result counts from Brave Search',
        evidence: [`Avg results: ${log.metrics.apiPerformance.braveSearch.averageResultsCount}`],
      },
    })
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })
}

export async function GET(req: NextRequest) {
  try {
    const log = await readSelfHealingLog()
    const suggestions = generateImprovementSuggestions(log)

    return NextResponse.json({
      log,
      suggestions,
      summary: {
        totalImprovements: log.improvements.length,
        pendingImprovements: log.improvements.filter(i => i.status === 'pending').length,
        appliedImprovements: log.improvements.filter(i => i.status === 'applied').length,
        totalResearches: log.metrics.totalResearches,
        overallHealthScore: calculateHealthScore(log),
      },
    })
  } catch (error) {
    console.error('Error reading self-healing log:', error)
    return NextResponse.json(
      { error: 'Failed to read self-healing log' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const action = body.action as 'log_research' | 'propose_improvement' | 'approve_improvement' | 'rollback_improvement'

    const log = await readSelfHealingLog()

    switch (action) {
      case 'log_research': {
        const metrics: ResearchMetrics = body.metrics

        // Add to research history
        log.researchHistory.push(metrics)

        // Keep only last 100 researches
        if (log.researchHistory.length > 100) {
          log.researchHistory = log.researchHistory.slice(-100)
        }

        // Update aggregate metrics
        log.metrics.totalResearches++

        // Update API performance metrics
        if (metrics.apisUsed.braveSearch) {
          const brave = log.metrics.apiPerformance.braveSearch
          brave.totalCalls++
          if (metrics.results.braveResultsCount !== undefined) {
            brave.averageResultsCount =
              (brave.averageResultsCount * (brave.totalCalls - 1) + metrics.results.braveResultsCount) / brave.totalCalls
          }
          if (metrics.performance.braveSearchTime) {
            brave.averageResponseTime =
              (brave.averageResponseTime * (brave.totalCalls - 1) + metrics.performance.braveSearchTime) / brave.totalCalls
          }
        }

        if (metrics.apisUsed.brightData) {
          const bright = log.metrics.apiPerformance.brightData
          bright.totalCalls++
          if (metrics.results.scrapedPagesCount !== undefined) {
            bright.averageScrapedPages =
              (bright.averageScrapedPages * (bright.totalCalls - 1) + metrics.results.scrapedPagesCount) / bright.totalCalls
          }
          if (metrics.performance.brightDataTime) {
            bright.averageResponseTime =
              (bright.averageResponseTime * (bright.totalCalls - 1) + metrics.performance.brightDataTime) / bright.totalCalls
          }
        }

        if (metrics.apisUsed.openAI) {
          const openai = log.metrics.apiPerformance.openAI
          openai.totalCalls++
          if (metrics.performance.openAITime) {
            openai.averageResponseTime =
              (openai.averageResponseTime * (openai.totalCalls - 1) + metrics.performance.openAITime) / openai.totalCalls
          }
        }

        // Update quality score
        if (metrics.qualityScore) {
          log.metrics.averageQualityScore =
            (log.metrics.averageQualityScore * (log.metrics.totalResearches - 1) + metrics.qualityScore) / log.metrics.totalResearches
        }

        await writeSelfHealingLog(log)

        return NextResponse.json({
          success: true,
          message: 'Research metrics logged',
          healthScore: calculateHealthScore(log),
        })
      }

      case 'propose_improvement': {
        const improvement: Omit<SelfHealingImprovement, 'id' | 'timestamp' | 'status'> = body.improvement

        const newImprovement: SelfHealingImprovement = {
          ...improvement,
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          status: 'pending',
        }

        log.improvements.push(newImprovement)
        await writeSelfHealingLog(log)

        return NextResponse.json({
          success: true,
          improvement: newImprovement,
          message: '✨ New improvement proposed! Review and approve to apply.',
        })
      }

      case 'approve_improvement': {
        const improvementId: string = body.improvementId
        const approvedBy: string = body.approvedBy || 'system'

        const improvement = log.improvements.find(i => i.id === improvementId)
        if (!improvement) {
          return NextResponse.json(
            { error: 'Improvement not found' },
            { status: 404 }
          )
        }

        improvement.status = 'approved'
        improvement.approvedBy = approvedBy
        improvement.approvedAt = new Date().toISOString()

        await writeSelfHealingLog(log)

        return NextResponse.json({
          success: true,
          improvement,
          message: `✅ Improvement approved! Apply manually or via auto-deployment.`,
        })
      }

      case 'rollback_improvement': {
        const improvementId: string = body.improvementId
        const reason: string = body.reason

        const improvement = log.improvements.find(i => i.id === improvementId)
        if (!improvement) {
          return NextResponse.json(
            { error: 'Improvement not found' },
            { status: 404 }
          )
        }

        improvement.status = 'rolled_back'
        improvement.rollbackData = {
          reason,
          timestamp: new Date().toISOString(),
          restoredFrom: improvement.changes.before,
        }

        await writeSelfHealingLog(log)

        return NextResponse.json({
          success: true,
          improvement,
          message: `↩️ Improvement rolled back: ${reason}`,
        })
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error in self-healing API:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process self-healing action' },
      { status: 500 }
    )
  }
}

// Calculate overall system health score (0-100)
function calculateHealthScore(log: SelfHealingLog): number {
  let score = 100

  // Deduct for low success rates
  const braveSuccess = log.metrics.apiPerformance.braveSearch.successRate
  const brightSuccess = log.metrics.apiPerformance.brightData.successRate
  const openaiSuccess = log.metrics.apiPerformance.openAI.successRate

  score -= (1 - braveSuccess) * 20
  score -= (1 - brightSuccess) * 30
  score -= (1 - openaiSuccess) * 20

  // Deduct for low quality
  if (log.metrics.averageQualityScore < 7) {
    score -= (7 - log.metrics.averageQualityScore) * 5
  }

  // Deduct for unresolved pending improvements
  const pendingImprovements = log.improvements.filter(i => i.status === 'pending').length
  score -= Math.min(pendingImprovements * 5, 20)

  return Math.max(0, Math.min(100, score))
}
