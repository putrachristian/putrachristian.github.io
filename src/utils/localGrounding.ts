import knowledgeEntries from '../data/knowledge.json'
import portfolioData from '../data/portfolio.json'
import type { ChatResponse, KnowledgeEntry, PortfolioData } from '../types'

const FALLBACK_MESSAGE =
  "I can still chat casually, but I don't have a reliable detail about that in my current portfolio or resume data. If you want the exact answer about me, it's better to contact me directly."

const knowledge = knowledgeEntries as KnowledgeEntry[]
const portfolio = portfolioData as PortfolioData

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s']/g, ' ')
}

function tokenize(value: string) {
  return Array.from(new Set(normalize(value).split(/\s+/).filter((token) => token.length > 1)))
}

function scoreEntry(entry: KnowledgeEntry, queryTokens: string[]) {
  const topicTokens = tokenize(entry.topic)
  const answerTokens = tokenize(entry.answer)

  let score = 0

  for (const token of queryTokens) {
    if (entry.tags.includes(token)) {
      score += 7
    }

    if (topicTokens.includes(token)) {
      score += 5
    }

    if (answerTokens.includes(token)) {
      score += 2
    }
  }

  return score
}

type GroundingMatch = {
  entry: KnowledgeEntry
  score: number
}

function getMatches(message: string): GroundingMatch[] {
  const queryTokens = tokenize(message)

  return knowledge
    .map((entry) => ({ entry, score: scoreEntry(entry, queryTokens) }))
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
}

export function getGroundingContext(message: string) {
  const matches = getMatches(message)

  return {
    matches,
    context: matches
      .map(({ entry }) => `Topic: ${entry.topic}\nSource: ${entry.sourceType}\nAnswer: ${entry.answer}`)
      .join('\n\n'),
  }
}

export function getLocalGroundedAnswer(message: string): ChatResponse {
  const matches = getMatches(message)

  if (!matches.length || matches[0].score < 4) {
    return {
      answer: FALLBACK_MESSAGE,
      grounded: false,
      sources: [],
      suggestedPrompts: portfolio.chatPrompts.slice(0, 3),
      fallbackToContact: true,
    }
  }

  return {
    answer: matches.map(({ entry }) => entry.answer).join(' '),
    grounded: true,
    sources: matches.map(({ entry }) => entry.topic),
    suggestedPrompts: portfolio.chatPrompts.filter((prompt) => !normalize(prompt).includes(normalize(message))).slice(0, 3),
    fallbackToContact: false,
  }
}
