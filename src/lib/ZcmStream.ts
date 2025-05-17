// src/lib/ZcmStream.ts
// Handles ZCM WebSocket or EventSource streaming for audio/VR/shader sync

export interface ZcmPacket {
  zcm: number;
  deltaPhi: number;
  hertz: number;
  timestamp: number;
}

export class ZcmStream {
  private ws: WebSocket | null = null;
  onZcm?: (pkt: ZcmPacket) => void;

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (ev) => {
      try {
        const pkt = JSON.parse(ev.data);
        if (this.onZcm) this.onZcm(pkt);
      } catch (e) {
        console.warn("Invalid ZCM packet", e);
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}