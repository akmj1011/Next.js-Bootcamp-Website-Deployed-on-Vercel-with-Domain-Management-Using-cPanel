import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

async function getZohoAccessToken() {
  const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
    params: {
      refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token'
    }
  })
  return response.data.access_token
}

export async function POST(request: NextRequest) {
  const { paymentId, studentData, amount } = await request.json()

  try {
    const accessToken = await getZohoAccessToken()

    // Create customer in Zoho Books
    const customerResponse = await axios.post(
      `https://books.zoho.in/api/v3/contacts`,
      {
        contact_name: studentData.name,
        email: studentData.email,
        phone: studentData.phone,
        contact_type: 'customer'
      },
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'X-com-zoho-books-organizationid': process.env.ZOHO_ORGANIZATION_ID
        }
      }
    )

    // Create invoice
    const invoiceResponse = await axios.post(
      `https://books.zoho.in/api/v3/invoices`,
      {
        customer_id: customerResponse.data.contact.contact_id,
        date: new Date().toISOString().split('T')[0],
        line_items: [{
          name: 'Bootcamp Registration',
          description: 'Pan-India Online Bootcamp',
          rate: amount,
          quantity: 1
        }],
        payment_options: {
          payment_gateways: [{
            gateway_name: 'razorpay',
            additional_field1: paymentId
          }]
        }
      },
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'X-com-zoho-books-organizationid': process.env.ZOHO_ORGANIZATION_ID
        }
      }
    )

    // Create CRM lead
    const crmResponse = await axios.post(
      `https://www.zohoapis.in/crm/v2/Leads`,
      {
        data: [{
          Last_Name: studentData.name,
          Email: studentData.email,
          Phone: studentData.phone,
          Lead_Source: 'Website',
          Lead_Status: 'Enrolled'
        }]
      },
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
      }
    )

    return NextResponse.json({
      success: true,
      invoiceId: invoiceResponse.data.invoice.invoice_id,
      leadId: crmResponse.data.data[0].details.id
    })
  } catch (error) {
    console.error('Zoho integration error:', error)
    return NextResponse.json({ error: 'Zoho integration failed' }, { status: 500 })
  }
}