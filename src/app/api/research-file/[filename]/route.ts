import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename

    // Security: Only allow markdown files
    if (!filename.endsWith('.md')) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }

    const filepath = path.join(process.cwd(), 'research-results', filename)

    // Check if file exists
    try {
      await fs.access(filepath)
    } catch {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const content = await fs.readFile(filepath, 'utf-8')

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error('Error reading research file:', error)
    return NextResponse.json(
      { error: 'Failed to read research file' },
      { status: 500 }
    )
  }
}
