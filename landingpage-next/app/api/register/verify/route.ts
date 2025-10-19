import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json()

  const body = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest('hex')

  const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    // Update payment status in Supabase
    await supabase
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'completed'
      })
      .eq('razorpay_order_id', razorpay_order_id)

    // Update registration status
    const { data: payment } = await supabase
      .from('payments')
      .select('registration_id')
      .eq('razorpay_order_id', razorpay_order_id)
      .single()

    if (payment) {
      await supabase
        .from('registrations')
        .update({ payment_status: 'completed' })
        .eq('id', payment.registration_id)
    }

    // Trigger Zoho invoice creation
    await fetch('/api/zoho', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId: razorpay_payment_id })
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 })
}