import React from "react"

const CoinsFooter = () => {
  return (
    <div className="rounded fixed bottom-0 left-0 right-0">
        <div style={{ height: 62, backgroundColor: '#1D2330', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid #282E3B', borderRadius: 4, textAlign: 'right', lineHeight: 14, blockSize: 62, fontSize: 12, fontFeatureSettings: 'normal', textSizeAdjust: '100%', boxShadow: 'inset 0 -20px 0 0 #262B38', padding: 0, margin: 0, width: '100%' }}>
          <div style={{ height: 40, padding: 0, margin: 0, width: '100%' }}>
            <iframe src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=no" width="100%" height="36px" scrolling="auto" marginWidth={0} marginHeight={0} frameBorder={0} border={0} style={{ border: 0, margin: 0, padding: 0 }} />
          </div>
          <div style={{ color: '#626B7F', lineHeight: 14, fontWeight: 400, fontSize: 11, boxSizing: 'border-box', padding: '2px 6px', width: '100%', fontFamily: 'Verdana, Tahoma, Arial, sans-serif' }}>
            <a href="https://coinlib.io" target="_blank" style={{ fontWeight: 500, color: '#626B7F', textDecoration: 'none', fontSize: 11 }}>Cryptocurrency Prices</a>&nbsp;by Coinlib
          </div>
        </div>
    </div>
  )
}

export default CoinsFooter