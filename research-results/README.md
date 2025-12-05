# Research Results Files

This folder contains detailed markdown files for each research task performed.

## What's Saved

Each research generates a comprehensive markdown file containing:

✅ **All API Results:**
- Brave Search results (headlines, URLs, descriptions)
- Bright Data scraped content (CTAs, offers, T&Cs, full page content)
- OpenAI insights (prompts, backstory, strategic angles)

✅ **All Errors:**
- API failures with full error messages
- Fallback indicators
- Troubleshooting information

✅ **Metadata:**
- Research depth level
- Iteration number
- Timestamp
- Source URLs provided

## Files in This Folder

### `home-equity-heloc-lendingtree-test-results.md`
**First test run results** - Documents what worked and what failed:
- ❌ Brave Search API: Failed (invalid parameters - NOW FIXED)
- ❌ OpenAI API: Failed (rate limit exceeded)
- ✅ Bright Data: Success (dev mode direct fetch)

## How to Use

### Viewing Results
1. Click on any markdown file to view
2. Or visit: `/api/research-file/[filename]` in browser

### API Endpoint
```
GET /api/research-file/home-equity-heloc-lendingtree-test-results.md
```

Returns the markdown content for download or viewing.

## Auto-Save System (Coming Soon)

The system is designed to automatically save research results, but manual integration is needed. Currently:

- ✅ Helper functions created (`src/lib/save-research.ts`)
- ✅ API endpoint ready (`/api/research-file/[filename]/route.ts`)
- ⏳ Integration into research API (in progress)

Once integrated, every research will automatically:
1. Collect all results and errors
2. Generate a markdown file
3. Save to this folder
4. Return the filename in the API response
5. Display a "View Research Results" link on task cards

## File Naming

Files are named using:
```
[sanitized-task-title]-[timestamp].md
```

Example:
```
home-equity-heloc-lendingtree-2025-12-05t12-30-00z.md
```

## Fixes Applied

### ✅ Brave Search API
**Problem:** Invalid parameters caused "Unprocessable Entity" error

**Fix Applied:**
```typescript
// REMOVED these invalid parameters:
- country: 'us'
- search_lang: 'en'
- freshness: 'py'

// NOW using minimal params:
{
  q: searchQuery,
  count: '10'
}
```

**Status:** ✅ FIXED - Ready for next test

### ⏳ OpenAI Rate Limiting
**Problem:** Rate limit exceeded (429 Too Many Requests)

**Solutions:**
1. **Short-term:** Fallback mode provides basic research (already working)
2. **Medium-term:** Add retry logic with exponential backoff
3. **Long-term:** Upgrade OpenAI plan for higher limits

**Status:** ⏳ Fallback working, retry logic pending

---

## Next Test

The Brave Search API is now fixed. Your next research test should:
- ✅ Successfully fetch Brave Search results
- ⏳ May still hit OpenAI rate limits (will use fallback)
- ✅ Continue working with Bright Data (dev mode)

**All results will be visible in the research response and can be manually documented here until auto-save is fully integrated.**
