/**
 * Deploy API Route
 * POST: Trigger durable deploy workflow
 * Returns workflow status or 503 if Deploy Hook not configured
 */

import { deployWorkflow } from '@/lib/workflows/deploy';

export async function POST() {
  try {
    // Check if Deploy Hook is configured
    if (!process.env.VERCEL_DEPLOY_HOOK_URL) {
      // In development, we allow mocking the workflow
      if (process.env.NODE_ENV === 'development') {
        const result = await deployWorkflow();
        return Response.json({
          status: 'simulated',
          mock: true,
          workflowResult: result
        });
      }

      return Response.json(
        {
          error: 'Deploy Hook not configured',
          configured: false,
          message:
            'Configure VERCEL_DEPLOY_HOOK_URL in Vercel Dashboard → Settings → Git → Deploy Hooks'
        },
        { status: 503 }
      );
    }

    // Start durable workflow
    const result = await deployWorkflow();

    return Response.json({
      status: 'triggered',
      workflowResult: result
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('POST /api/deploy error:', message);

    return Response.json(
      {
        error: message,
        configured: false
      },
      { status: 503 }
    );
  }
}
