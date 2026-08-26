import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text } = body;

  if (!text?.trim()) {
    return NextResponse.json({ error: 'テキストが必要です' }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY が設定されていません。.env.local に設定してください。' },
      { status: 500 }
    );
  }

  const today = new Date().toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const prompt = `今日の日付: ${today}

以下のテキスト（メール、チャット、会議メモなど）からアクションアイテムやタスクを抽出してください。

テキスト:
"""
${text}
"""

各タスクについて以下を特定し、JSONの配列として返してください：
- title: 明確でアクション可能なタスク名（日本語）
- description: 詳細説明（任意、string）
- priority: 優先度（"q1"=紧急かつ重要, "q2"=重要だが紧急でない, "q3"=紧急だが重要でない, "q4"=紧急でも重要でもない）
- deadline: 期限（ISO 8601形式 "YYYY-MM-DD"、言及されている場合のみ）
- estimatedMinutes: 推定所要時間（分、数値）
- tags: 関連タグの配列

必ずJSON配列のみを返してください。タスクが見つからない場合は [] を返してください。`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: `Claude API エラー: ${err.error?.message || response.statusText}` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) return NextResponse.json({ tasks: [] });
    const tasks = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Task extraction error:', error);
    return NextResponse.json({ error: 'タスク抽出中にエラーが発生しました' }, { status: 500 });
  }
}
