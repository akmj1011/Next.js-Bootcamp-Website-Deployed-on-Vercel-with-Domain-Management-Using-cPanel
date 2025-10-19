import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, college, state, language, tracks, batch, plan } = body

    // Validate
    if ((!plan || plan === 'single') && (!tracks || tracks.length === 0)) {
      return NextResponse.json(
        { error: 'Invalid payment method: no plan or tracks selected' },
        { status: 400 }
      )
    }

    // Insert student
    const { data: student, error: studentError } = await supabaseAdmin
      .from('students')
      .insert([{ name, email, phone, college, state, language_preference: language }])
      .select()
      .single()

    if (studentError) throw studentError

    // Calculate amount
    const amount = plan === 'combo' ? 1499 : plan === 'rural' ? 299 : (tracks?.length || 0) * 499

    // Insert registration
    const { data: registration, error: regError } = await supabaseAdmin
      .from('registrations')
      .insert([{ 
        student_id: student.id, 
        track_ids: tracks || [], 
        batch_id: batch, 
        amount, 
        pricing_plan: plan || 'single' 
      }])
      .select()
      .single()

    if (regError) throw regError

    return NextResponse.json({ student, registration })
  } catch (err: any) {
    console.error('Server registration error:', err)
    return NextResponse.json({ error: err.message || 'Registration failed' }, { status: 500 })
  }
}
