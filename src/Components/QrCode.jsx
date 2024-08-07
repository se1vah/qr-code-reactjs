import { useState} from 'react';
import '../App.css';

export const QrCode = () => {
    const [qrImage, setQrImage] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [qrSize, setQrSize] = useState("");
    const [loading, setLoading] = useState(false);

    async function generateQrCodeFunction()
    {
        try{
            setLoading(true);
            const URL = "https://api.qrserver.com/v1/create-qr-code/?size="+qrSize+"x"+qrSize+"&data="+encodeURIComponent(qrCode);
            setQrImage(URL);
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    }
    
    function DownloadQrCode()
    {
        fetch(qrImage).then((response)=> response.blob()).then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })

    }
    return(<>
            <div className="qrContainer">
                <h1 className='app-title'>QR Code Generator</h1>
                {qrImage && <img className="qr-image" src={qrImage} alt="" />}
                {loading && <p>Loading</p>}
                <div className="qr-content">
                    <label htmlFor="qrcode-name">Text for QR Code</label>
                    <input type="text" id="qrcode-name" onChange={(e)=>setQrCode(e.target.value)}   placeholder="Text for QR Code" />
                    <label htmlFor="qrcode-size">QR Image Size</label>
                    <input type="text" id="qrcode-size" onChange={(e)=>{setQrSize(e.target.value)}} placeholder="Qr Code Size" />
                    <button className="generate-button" onClick={generateQrCodeFunction}>Generate QR Code</button>
                    <button className="download-button" onClick={DownloadQrCode}>Download QR Code</button>
        
                </div>
            </div>
    </>)
}