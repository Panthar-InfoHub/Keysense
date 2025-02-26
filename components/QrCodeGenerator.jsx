'use client'
import { QRCodeSVG } from 'qrcode.react'
import { useRef } from 'react'
import { Button } from './ui/button';
import { Download } from 'lucide-react';

const QrCodeGenerator = ({ name }) => {

    const reserVationRef = useRef();
    const reviewRef = useRef();

    const downloadQRCode = (ref) => {
        if (ref.current) {
            const svg = ref.current
            const svgData = new XMLSerializer().serializeToString(svg)
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            const img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx?.drawImage(img, 0, 0)
                const pngFile = canvas.toDataURL("image/png")
                const downloadLink = document.createElement("a")
                downloadLink.download = "qrcode.png"
                downloadLink.href = pngFile
                downloadLink.click()
            }
            img.src = "data:image/svg+xml;base64," + btoa(svgData)
        }
    }

    return (
        <div className='flex items-center gap-4 flex-wrap' >
            <div className='relative' >
                <QRCodeSVG value={`https://keysense-eta.vercel.app/${name}/createReservation`} size={180} level="H" includeMargin={true} ref={reserVationRef} />
                <p className='text-sm mt-2 text-white/80' > Customer Reservation </p>
                <Button onClick={() => downloadQRCode(reserVationRef)} className="bg-black/80 w-8 h-8 flex justify-center items-center rounded-xl absolute top-2 right-2 hover:bg-black/50" > <Download className='text-white' /> </Button>
            </div>
            <div className='relative' >
                <QRCodeSVG value={`https://keysense-eta.vercel.app//${name}/createReview`} size={180} level="H" includeMargin={true} ref={reviewRef} />
                <p className='text-sm text-white/80 mt-2' > Customer Review </p>
                <Button onClick={() => downloadQRCode(reviewRef)} className="bg-black/80 w-8 h-8 flex justify-center items-center rounded-xl absolute top-2 right-2 hover:bg-black/50" > <Download className='text-white' /> </Button>
            </div>
        </div>
    )
}

export default QrCodeGenerator
