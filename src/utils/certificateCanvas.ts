import QRCode from 'qrcode';

export interface CertificateData {
  studentName: string;
  registrationNumber: string;
  courseName: string;
  duration?: string;
  admissionDate?: string;
  status?: string;
  campus?: string;
}

export const renderLuxuryCertificate = async (
  canvas: HTMLCanvasElement,
  data: CertificateData,
  logoSrc: string
): Promise<void> => {
  const W = 2400;
  const H = 1700;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Colors
  const C_NAVY_DEEP = '#0B1C40';
  const C_NAVY_MID = '#143066';
  const C_GOLD_DARK = '#A87C26';
  const C_GOLD_MID = '#D4AF37';
  const C_GOLD_LIGHT = '#F4DB85';
  const C_GOLD_PALE = '#FCF6DE';
  const C_SLATE_DARK = '#1E293B';
  const C_SLATE_MUTED = '#64748B';

  // 1. Background (Warm luxury canvas)
  ctx.fillStyle = '#FDFDFB';
  ctx.fillRect(0, 0, W, H);

  // Outer solid navy frame
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.fillRect(0, 0, W, 32);
  ctx.fillRect(0, H - 32, W, 32);
  ctx.fillRect(0, 0, 32, H);
  ctx.fillRect(W - 32, 0, 32, H);

  // Triple Gold Borders
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.strokeStyle = C_GOLD_DARK;
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  ctx.strokeStyle = C_GOLD_LIGHT;
  ctx.lineWidth = 2;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  // 4 Corner Ornaments (Art-Deco Diamonds)
  const corners = [
    { cx: 56, cy: 56, sx: 1, sy: 1 },
    { cx: W - 56, cy: 56, sx: -1, sy: 1 },
    { cx: 56, cy: H - 56, sx: 1, sy: -1 },
    { cx: W - 56, cy: H - 56, sx: -1, sy: -1 },
  ];

  corners.forEach(({ cx, cy, sx, sy }) => {
    ctx.fillStyle = C_NAVY_DEEP;
    const x1 = Math.min(cx, cx + sx * 40);
    const y1 = Math.min(cy, cy + sy * 40);
    ctx.fillRect(x1, y1, 40, 40);

    const dx = cx + sx * 20;
    const dy = cy + sy * 20;
    ctx.fillStyle = C_GOLD_MID;
    ctx.beginPath();
    ctx.moveTo(dx, dy - 8);
    ctx.lineTo(dx + 8, dy);
    ctx.lineTo(dx, dy + 8);
    ctx.lineTo(dx - 8, dy);
    ctx.closePath();
    ctx.fill();
  });

  // Subtle Guilloche Rings in Pale Gold
  ctx.strokeStyle = '#F5F2E6';
  ctx.lineWidth = 1;
  for (let r = 400; r < 1200; r += 60) {
    ctx.beginPath();
    ctx.ellipse(W / 2, H / 2, r, r * 0.7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 2. Official Academy Logo
  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  try {
    const logoImg = await loadImg(logoSrc);
    const logoH = 160;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, W / 2 - logoW / 2, 80, logoW, logoH);
  } catch (e) {
    console.warn('Failed to load logo on certificate canvas', e);
  }

  // Academy Title
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.font = 'bold 46px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('INDO AIR AVIATION ACADEMY', W / 2, 290);

  // Subtitle
  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 17px Arial, sans-serif';
  ctx.fillText(
    "CENTRAL INDIA'S PREMIER AVIATION TRAINING & PATHWAY INSTITUTE • INDORE",
    W / 2,
    325
  );

  // Gold Divider Lines & Star
  const lineW = 400;
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - lineW, 350);
  ctx.lineTo(W / 2 - 40, 350);
  ctx.moveTo(W / 2 + 40, 350);
  ctx.lineTo(W / 2 + lineW, 350);
  ctx.stroke();

  // Center Star
  ctx.fillStyle = C_GOLD_MID;
  drawStar(ctx, W / 2, 350, 5, 12, 6);

  // 3. Title Ribbon Banner
  const bw = 940;
  const bh = 68;
  const bx = W / 2 - bw / 2;
  const by = 385;

  ctx.fillStyle = C_NAVY_DEEP;
  ctx.fillRect(bx, by, bw, bh);

  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 2;
  ctx.strokeRect(bx + 4, by + 4, bw - 8, bh - 8);

  // Ribbon end triangles
  const foldSize = 28;
  ctx.fillStyle = C_GOLD_MID;
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx - foldSize, by + bh / 2);
  ctx.lineTo(bx, by + bh);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(bx + bw, by);
  ctx.lineTo(bx + bw + foldSize, by + bh / 2);
  ctx.lineTo(bx + bw, by + bh);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 34px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL ADMISSION LETTER & CERTIFICATE', W / 2, by + 46);

  // 4. Preamble & Student Name
  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'italic 25px "Times New Roman", Georgia, serif';
  ctx.fillText(
    'This is to officially certify that the candidate whose particulars appear below',
    W / 2,
    490
  );
  ctx.fillText(
    'has been formally admitted and registered with Indo Air Aviation Academy.',
    W / 2,
    525
  );

  // Candidate Name
  const rawName = data.studentName.trim().toUpperCase() || 'STUDENT FULL NAME';
  const displayName = rawName.startsWith('MR.') || rawName.startsWith('MS.') ? rawName : `MR. ${rawName}`;
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.font = 'bold 44px "Times New Roman", Georgia, serif';
  ctx.fillText(displayName, W / 2, 595);

  // Gold accent line under name
  const nameMetric = ctx.measureText(displayName);
  const nameW = nameMetric.width;
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameW / 2 - 30, 620);
  ctx.lineTo(W / 2 + nameW / 2 + 30, 620);
  ctx.stroke();

  // 5. Details Card (Enrollment Particulars)
  const cardX = 200;
  const cardY = 675;
  const cardW = 2000;
  const cardH = 360;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  // Card Header strip
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.fillRect(cardX, cardY, cardW, 44);

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 17px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ENROLLMENT RECORD & PROGRAM PARTICULARS', cardX + 30, cardY + 28);

  ctx.fillStyle = C_GOLD_MID;
  ctx.textAlign = 'right';
  ctx.fillText('AUTHENTIC DATABASE ENTRY', cardX + cardW - 30, cardY + 28);

  // Card Fields Grid
  const fields = [
    {
      label: 'REGISTRATION NUMBER',
      val: data.registrationNumber || 'IAA-2026-100',
      isHighlight: true,
    },
    {
      label: 'PROGRAM ENROLLED',
      val: data.courseName || 'COMMERCIAL PILOT LICENSE (CPL)',
      isHighlight: false,
    },
    {
      label: 'COURSE DURATION',
      val: data.duration || '1 MONTH (Full Time Intensive)',
      isHighlight: false,
    },
    {
      label: 'DATE OF ADMISSION',
      val: data.admissionDate || new Date().toLocaleDateString('en-GB'),
      isHighlight: false,
    },
    {
      label: 'CAMPUS LOCATION',
      val: data.campus || 'Indore Campus (Sayaji Plaza, MP - 452001)',
      isHighlight: false,
    },
    {
      label: 'TRAINING STATUS',
      val: data.status || 'Verified Active / Admitted Student',
      isHighlight: false,
    },
  ];

  const col1X = cardX + 60;
  const col2X = cardX + cardW / 2 + 40;
  const rowYs = [cardY + 70, cardY + 160, cardY + 250];

  fields.forEach((f, idx) => {
    const colX = idx % 2 === 0 ? col1X : col2X;
    const rowY = rowYs[Math.floor(idx / 2)];

    // Gold dot
    ctx.fillStyle = C_GOLD_MID;
    ctx.beginPath();
    ctx.arc(colX + 4, rowY + 8, 4, 0, Math.PI * 2);
    ctx.fill();

    // Label
    ctx.fillStyle = C_SLATE_MUTED;
    ctx.font = 'bold 15px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(f.label, colX + 18, rowY + 12);

    // Value
    ctx.fillStyle = f.isHighlight ? C_NAVY_MID : C_SLATE_DARK;
    ctx.font = f.isHighlight ? 'bold 23px Arial, sans-serif' : 'bold 21px Arial, sans-serif';
    ctx.fillText(f.val, colX + 18, rowY + 44);

    // Divider line
    ctx.strokeStyle = '#EBEFF5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(colX + 18, rowY + 62);
    ctx.lineTo(colX + 820, rowY + 62);
    ctx.stroke();
  });

  // 6. Confirmation Statement
  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'italic 21px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'We are pleased to confirm your admission. The institution certifies that your enrollment records have been',
    W / 2,
    1075
  );
  ctx.fillText(
    'authenticated and uploaded onto our central aviation student registry for verification by airlines and recruiters.',
    W / 2,
    1105
  );

  // 7. Signatures & Official Gold Medallion Seal
  const sigY = 1250;

  // Left Signature: R. Sharma
  const sigLeftX = 240;
  ctx.fillStyle = '#142D5F';
  ctx.font = 'italic 36px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('R. Sharma', sigLeftX + 30, sigY + 30);

  ctx.strokeStyle = C_SLATE_MUTED;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigLeftX, sigY + 55);
  ctx.lineTo(sigLeftX + 280, sigY + 55);
  ctx.stroke();

  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('R. SHARMA', sigLeftX + 40, sigY + 82);

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = '14px Arial, sans-serif';
  ctx.fillText('Admission Coordinator, IAA', sigLeftX + 15, sigY + 104);

  // Center Gold Scalloped Seal
  const sealCx = W / 2 - 120;
  const sealCy = sigY + 40;
  const sealR = 75;

  ctx.fillStyle = C_GOLD_MID;
  for (let angle = 0; angle < 360; angle += 10) {
    const rad = (angle * Math.PI) / 180;
    const tx = sealCx + (sealR + 8) * Math.cos(rad);
    const ty = sealCy + (sealR + 8) * Math.sin(rad);
    ctx.beginPath();
    ctx.arc(tx, ty, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = C_NAVY_DEEP;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = C_GOLD_LIGHT;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR - 10, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 15px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INDO AIR', sealCx, sealCy - 32);

  ctx.fillStyle = C_GOLD_MID;
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('EXCELLENCE', sealCx, sealCy - 12);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('OFFICIAL', sealCx, sealCy + 8);
  ctx.fillText('SEAL', sealCx, sealCy + 26);

  ctx.fillStyle = C_GOLD_LIGHT;
  ctx.font = 'bold 12px Arial, sans-serif';
  ctx.fillText('INDORE', sealCx, sealCy + 44);

  // Right Signature: S S Rajpoot (CEO)
  const sigRightX = W / 2 + 100;
  ctx.fillStyle = '#142D5F';
  ctx.font = 'italic 36px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'left';
  ctx.fillText('S S Rajpoot', sigRightX + 50, sigY + 30);

  ctx.strokeStyle = C_SLATE_MUTED;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sigRightX, sigY + 55);
  ctx.lineTo(sigRightX + 320, sigY + 55);
  ctx.stroke();

  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('S S RAJPOOT', sigRightX + 75, sigY + 82);

  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('Company CEO & Executive Director', sigRightX + 40, sigY + 104);

  // Far Right: Verification QR Code
  const qrX = W - 430;
  const qrY = sigY - 45;
  const qrW = 170;

  try {
    const qrDataUrl = await QRCode.toDataURL(
      'https://www.indoaviationacademy.com/verify',
      {
        margin: 1,
        color: {
          dark: '#0B1C40',
          light: '#FFFFFF',
        },
      }
    );
    const qrImg = await loadImg(qrDataUrl);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrW + 16, qrW + 16);
    ctx.strokeStyle = C_GOLD_MID;
    ctx.lineWidth = 2;
    ctx.strokeRect(qrX, qrY, qrW + 16, qrW + 16);
    ctx.drawImage(qrImg, qrX + 8, qrY + 8, qrW, qrW);
  } catch (err) {
    console.warn('Failed to generate QR code', err);
  }

  ctx.fillStyle = C_NAVY_MID;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO VERIFY RECORD', qrX + qrW / 2 + 8, qrY + qrW + 36);

  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 14px Arial, sans-serif';
  ctx.fillText('www.indoaviationacademy.com', qrX + qrW / 2 + 8, qrY + qrW + 56);

  // 8. Bottom Security Ribbon
  const ribbonY = H - 90;
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(100, ribbonY);
  ctx.lineTo(W - 100, ribbonY);
  ctx.stroke();

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'bold 13px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'DREAM   •   LEARN   •   FLY   •   ACHIEVE   —   OFFICIAL ADMISSION RECORD OF INDO AIR AVIATION ACADEMY, INDORE',
    W / 2,
    ribbonY + 22
  );
};

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  spikes: number,
  outerRadius: number,
  innerRadius: number
) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}
