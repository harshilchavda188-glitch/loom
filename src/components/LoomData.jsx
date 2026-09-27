import { useEffect, useState } from 'react';

export const demoPeers = [
  { id: '0e9d5f71-6d1a-4c8d-9d25-8d3b2c1a7401', name: 'Riya Sen', callsign: 'ALPHA-09', distance: 12, rssi: -62, status: 'unpaired', radio: 'BLE Coded PHY', key: '9F2A·77C1·A821·D03E' },
  { id: 'b1c83d29-9a62-45ee-b1cc-2e8a5b4f6d02', name: 'Tarek Mansour', callsign: 'RECON-4', distance: 118, rssi: -78, status: 'paired', radio: 'WiFi Direct', key: 'B18E·0A42·C9D0·61F4' },
  { id: '4f7a2e11-2c85-4b96-a5d8-1f0c7e3b9a03', name: 'Mina Park', callsign: 'ECHO-22', distance: 34, rssi: -69, status: 'pending_received', radio: 'BLE Coded PHY', key: '44D1·9C30·AB12·E88F' },
  { id: 'c6d92a44-81f5-4e27-b3aa-7c5e9d2f1104', name: 'Jon Bell', callsign: 'NOMAD-7', distance: 182, rssi: -91, status: 'unpaired', radio: 'Sub-GHz Relay', key: '0C7E·A2B9·D410·F6A1' },
];

export function useLoomState() {
  const [peers, setPeers] = useState(demoPeers);
  const [messages, setMessages] = useState({ 'b1c83d29-9a62-45ee-b1cc-2e8a5b4f6d02': [{ from: 'peer', text: 'Mesh link is stable. 14ms latency.', time: '17:02' }, { from: 'me', text: 'Copy. I am moving to checkpoint three.', time: '17:04' }] });
  const [activePeer, setActivePeer] = useState('b1c83d29-9a62-45ee-b1cc-2e8a5b4f6d02');
  const [call, setCall] = useState(null);
  const [radio, setRadio] = useState({ ble: true, wifi: true, uwb: false });
  const [locked, setLocked] = useState(false);

  const sendRequest = id => setPeers(current => current.map(peer => peer.id === id ? { ...peer, status: 'pending_sent' } : peer));
  const acceptRequest = id => setPeers(current => current.map(peer => peer.id === id ? { ...peer, status: 'paired' } : peer));
  const sendMessage = text => {
    if (!text.trim()) return;
    setMessages(current => ({ ...current, [activePeer]: [...(current[activePeer] || []), { from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }] }));
  };

  useEffect(() => {
    if (locked) setCall(null);
  }, [locked]);

  return { peers, messages, activePeer, setActivePeer, sendRequest, acceptRequest, sendMessage, call, setCall, radio, setRadio, locked, setLocked };
}
