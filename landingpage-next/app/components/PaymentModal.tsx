'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, CreditCard, Smartphone, QrCode } from 'lucide-react'
import toast from 'react-hot-toast'

export interface PaymentModalProps {
  amount: number
  registrationId: string
  onSuccess: () => void
  onClose: () => void
}

// Razorpay typing
declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentModal({ amount, registrationId, onSuccess, onClose }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi'>('razorpay')
  const [processing, setProcessing] = useState(false)

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePaymentSuccess = async (response: any) => {
    try {
      const verifyRes = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature
        })
      })

      if (verifyRes.ok) {
        toast.success('Payment successful!')
        onSuccess()
      } else {
        toast.error('Payment verification failed')
      }
    } catch (err) {
      console.error(err)
      toast.error('Payment verification failed')
    }
  }

  const handleRazorpayPayment = async () => {
    setProcessing(true)
    const loaded = await loadRazorpayScript()
    if (!loaded) {
      toast.error('Razorpay SDK failed to load')
      setProcessing(false)
      return
    }

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, registrationId, method: 'razorpay' })
      })
      const data = await response.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'BootcampIndia',
        description: 'Bootcamp Registration',
        order_id: data.orderId,
        handler: handlePaymentSuccess,
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#9333ea' }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error(error)
      toast.error('Payment initialization failed')
    } finally {
      setProcessing(false)
    }
  }

  const handleUPIPayment = () => {
    const upiId = process.env.NEXT_PUBLIC_UPI_ID
    toast.success(`Pay via UPI: ${upiId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Complete Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Amount */}
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="text-lg">Amount to Pay:</span>
            <span className="text-2xl font-bold text-purple-600">₹{amount}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-3 mb-6">
          <button
            onClick={() => setPaymentMethod('razorpay')}
            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition ${
              paymentMethod === 'razorpay' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 mr-3" />
              <span>Card/Net Banking</span>
            </div>
            <span className="text-sm text-gray-500">Razorpay</span>
          </button>

          <button
            onClick={() => setPaymentMethod('upi')}
            className={`w-full p-4 border-2 rounded-lg flex items-center justify-between transition ${
              paymentMethod === 'upi' ? 'border-purple-600 bg-purple-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 mr-3" />
              <span>UPI Payment</span>
            </div>
            <span className="text-sm text-gray-500">Scan QR</span>
          </button>
        </div>

        {/* UPI QR */}
{paymentMethod === 'upi' && (
  <div className="mb-6 text-center">
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <img
        src="/qrcodebraintrain.png"       // <-- put your QR image path here
        alt="UPI QR Code"
        className="w-32 h-32 mx-auto mb-4"
      />
      <p className="text-sm text-gray-600 mb-2">Scan QR code or use UPI ID:</p>
      <p className="font-mono font-bold">{process.env.NEXT_PUBLIC_UPI_ID}</p>
    </div>
  </div>
)}

        {/* Pay Button */}
        <button
          onClick={paymentMethod === 'razorpay' ? handleRazorpayPayment : handleUPIPayment}
          disabled={processing}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </motion.div>
    </motion.div>
  )
}
