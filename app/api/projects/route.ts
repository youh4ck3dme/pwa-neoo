/**
 * Projects API Route
 * GET: Fetch projects (from Supabase if configured, else empty array)
 * POST: Save new project (to Supabase if configured, else returns 503)
 */

export async function GET() {
  try {
    // If Supabase is not configured, return empty array
    // Portfolio component will fallback to localStorage
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return Response.json([]);
    }

    // TODO: When Supabase is configured, fetch from DB
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .order('created_at', { ascending: false })
    // if (error) throw error
    // return Response.json(data ?? [])

    return Response.json([]);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return Response.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const project = await req.json();

    // Validate required fields
    if (!project.title || !project.shortDescription) {
      return Response.json(
        { error: 'Missing required fields (title, shortDescription)' },
        { status: 400 }
      );
    }

    // If Supabase is not configured, return informative error
    if (!process.env.SUPABASE_SERVICE_KEY) {
      return Response.json(
        {
          error: 'Supabase not configured',
          configured: false,
          message: 'Project saved locally only. Configure Supabase to persist projects.'
        },
        { status: 503 }
      );
    }

    // TODO: When Supabase is configured, insert into DB
    // const { data, error } = await supabaseAdmin
    //   .from('projects')
    //   .insert(project)
    //   .select()
    //   .single()
    // if (error) throw error
    // return Response.json(data, { status: 201 })

    return Response.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return Response.json(
      { error: 'Failed to save project' },
      { status: 500 }
    );
  }
}
