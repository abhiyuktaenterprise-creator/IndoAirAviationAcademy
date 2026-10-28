import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import defaultLogoSrc from '@/assets/indo-air-aviation-logo-removebg-preview.png';
import defaultSignatureSrc from '@/assets/ss-rajpoot-signature.png';

export interface CertificateData {
  studentName: string;
  fatherName?: string;
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
  logoSrc: string = '/indo-air-aviation-logo-removebg-preview.png',
  signatureSrc: string = '/ss-rajpoot-signature.png'
): Promise<void> => {
  // True A4 300 DPI Print Resolution: 3508 x 2480 pixels
  const W = 3508;
  const H = 2480;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  // Enable high-quality image smoothing for ultra-crisp output
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

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
  ctx.fillRect(0, 0, W, 46);
  ctx.fillRect(0, H - 46, W, 46);
  ctx.fillRect(0, 0, 46, H);
  ctx.fillRect(W - 46, 0, 46, H);

  // Triple Gold Borders
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 6;
  ctx.strokeRect(58, 58, W - 116, H - 116);

  ctx.strokeStyle = C_GOLD_DARK;
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 70, W - 140, H - 140);

  ctx.strokeStyle = C_GOLD_LIGHT;
  ctx.lineWidth = 3;
  ctx.strokeRect(82, 82, W - 164, H - 164);

  // 4 Corner Ornaments (Art-Deco Diamonds)
  const corners = [
    { cx: 82, cy: 82, sx: 1, sy: 1 },
    { cx: W - 82, cy: 82, sx: -1, sy: 1 },
    { cx: 82, cy: H - 82, sx: 1, sy: -1 },
    { cx: W - 82, cy: H - 82, sx: -1, sy: -1 },
  ];

  corners.forEach(({ cx, cy, sx, sy }) => {
    ctx.fillStyle = C_NAVY_DEEP;
    const x1 = Math.min(cx, cx + sx * 58);
    const y1 = Math.min(cy, cy + sy * 58);
    ctx.fillRect(x1, y1, 58, 58);

    const dx = cx + sx * 29;
    const dy = cy + sy * 29;
    ctx.fillStyle = C_GOLD_MID;
    ctx.beginPath();
    ctx.moveTo(dx, dy - 12);
    ctx.lineTo(dx + 12, dy);
    ctx.lineTo(dx, dy + 12);
    ctx.lineTo(dx - 12, dy);
    ctx.closePath();
    ctx.fill();
  });

  // Subtle Guilloche Rings in Pale Gold
  ctx.strokeStyle = '#F4EEDB';
  ctx.lineWidth = 1.5;
  for (let r = 580; r < 1750; r += 88) {
    ctx.beginPath();
    ctx.ellipse(W / 2, H / 2, r, r * 0.7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Helper to safely load images without CORS or decoding breakage
  const loadImg = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      if (src.startsWith('http://') || src.startsWith('https://')) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Failed to load ${src}: ${e}`));
      img.src = src;

      if (img.complete && img.naturalWidth > 0) {
        resolve(img);
      }
    });

  // 2. Official Academy Logo
  try {
    const logoImg = await loadImg(logoSrc);
    const logoH = 230;
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, W / 2 - logoW / 2, 115, logoW, logoH);
  } catch (e) {
    console.warn('Failed to load logo on certificate canvas:', e instanceof Error ? e.message : e);
  }

  // Academy Title
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.font = 'bold 66px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('INDO AIR AVIATION ACADEMY', W / 2, 420);

  // Subtitle
  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.fillText(
    'DGCA APPROVED • IATA ALIGNED • ISO 9001:2015 CERTIFIED AVIATION ACADEMY • INDORE CAMPUS',
    W / 2,
    472
  );

  // Gold Divider Lines & Star
  const lineW = 580;
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - lineW, 508);
  ctx.lineTo(W / 2 - 58, 508);
  ctx.moveTo(W / 2 + 58, 508);
  ctx.lineTo(W / 2 + lineW, 508);
  ctx.stroke();

  // Center Star
  ctx.fillStyle = C_GOLD_MID;
  drawStar(ctx, W / 2, 508, 5, 17, 8);

  // 3. Title Ribbon Banner
  const bw = 1380;
  const bh = 98;
  const bx = W / 2 - bw / 2;
  const by = 556;

  ctx.fillStyle = C_NAVY_DEEP;
  ctx.fillRect(bx, by, bw, bh);

  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 3;
  ctx.strokeRect(bx + 6, by + 6, bw - 12, bh - 12);

  // Ribbon end triangles
  const foldSize = 40;
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
  ctx.font = 'bold 48px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL ADMISSION LETTER & CERTIFICATE', W / 2, by + 66);

  // 4. Preamble & Student Name
  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'italic 34px "Times New Roman", Georgia, serif';
  ctx.fillText(
    'This is to officially certify that the candidate whose particulars appear below',
    W / 2,
    705
  );
  ctx.fillText(
    'has been formally admitted and registered with Indo Air Aviation Academy.',
    W / 2,
    752
  );

  // Candidate Name
  const rawName = data.studentName.trim().toUpperCase() || 'STUDENT FULL NAME';
  const displayName = rawName.startsWith('MR.') || rawName.startsWith('MS.') ? rawName : `MR. ${rawName}`;
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.font = 'bold 64px "Times New Roman", Georgia, serif';
  ctx.fillText(displayName, W / 2, 835);

  // Father's Name (S/O, D/O)
  const fatherRaw = (data.fatherName || '').trim();
  if (fatherRaw) {
    const fatherUpper = fatherRaw.toUpperCase();
    const displayFather =
      fatherUpper.startsWith('MR.') ||
      fatherUpper.startsWith('SHRI') ||
      fatherUpper.startsWith('LATE')
        ? fatherUpper
        : `SHRI ${fatherUpper}`;
    ctx.fillStyle = C_GOLD_DARK;
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillText(`S/O, D/O: ${displayFather}`, W / 2, 885);
  }

  // Gold accent line under name
  const nameMetric = ctx.measureText(displayName);
  const nameW = Math.max(nameMetric.width, 520);
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - nameW / 2 - 30, 915);
  ctx.lineTo(W / 2 + nameW / 2 + 30, 915);
  ctx.stroke();

  // 5. Details Card (Enrollment Particulars)
  const cardX = 290;
  const cardY = 955;
  const cardW = 2928;
  const cardH = 545;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 3;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  // Card Header strip
  ctx.fillStyle = C_NAVY_DEEP;
  ctx.fillRect(cardX, cardY, cardW, 64);

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ENROLLMENT RECORD & PROGRAM PARTICULARS', cardX + 44, cardY + 41);

  ctx.fillStyle = C_GOLD_MID;
  ctx.textAlign = 'right';
  ctx.fillText('AUTHENTIC DATABASE ENTRY', cardX + cardW - 44, cardY + 41);

  // Card Fields Grid (8 balanced fields across 4 rows)
  const fields = [
    {
      label: 'REGISTRATION NUMBER',
      val: data.registrationNumber || 'IAA-2026-100',
      isHighlight: true,
    },
    {
      label: "FATHER'S NAME (S/O, D/O)",
      val: data.fatherName ? data.fatherName.toUpperCase() : 'N/A',
      isHighlight: false,
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
      label: 'TRAINING STATUS',
      val: data.status || 'Verified Active / Admitted Student',
      isHighlight: false,
    },
    {
      label: 'CAMPUS LOCATION',
      val: data.campus || 'Indore Campus (Sayaji Plaza, MP - 452001)',
      isHighlight: false,
    },
    {
      label: 'CENTRAL AVIATION REGISTRY',
      val: 'Authenticated Cloud Database Record',
      isHighlight: false,
    },
  ];

  const col1X = cardX + 85;
  const col2X = cardX + cardW / 2 + 55;
  const rowYs = [cardY + 98, cardY + 208, cardY + 318, cardY + 428];

  fields.forEach((f, idx) => {
    const colX = idx % 2 === 0 ? col1X : col2X;
    const rowY = rowYs[Math.floor(idx / 2)];

    // Gold bullet dot
    ctx.fillStyle = C_GOLD_MID;
    ctx.beginPath();
    ctx.arc(colX + 6, rowY + 9, 6, 0, Math.PI * 2);
    ctx.fill();

    // Field Label (High readability bold 20px)
    ctx.fillStyle = C_SLATE_MUTED;
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(f.label, colX + 26, rowY + 15);

    // Field Value (High readability bold 28-32px)
    ctx.fillStyle = f.isHighlight ? C_NAVY_MID : C_SLATE_DARK;
    ctx.font = f.isHighlight ? 'bold 32px Arial, sans-serif' : 'bold 28px Arial, sans-serif';
    ctx.fillText(f.val, colX + 26, rowY + 55);

    // Divider line
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(colX + 26, rowY + 76);
    ctx.lineTo(colX + 1220, rowY + 76);
    ctx.stroke();
  });

  // 6. Confirmation Statement
  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'italic 30px "Times New Roman", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'We are pleased to confirm your admission. The institution certifies that your enrollment records have been',
    W / 2,
    1565
  );
  ctx.fillText(
    'authenticated and uploaded onto our central aviation student registry for verification by airlines and recruiters.',
    W / 2,
    1608
  );

  // 7. Signatures, Accreditations (ISO & IATA), Gold Seal & Verification QR Code
  const sigY = 1815;

  // 7A. Left: Authorized Signatory - S S Rajpoot (CEO & Executive Director)
  const sigLeftX = 220;
  const lineMid = sigLeftX + 220;

  let sigDrawn = false;
  if (signatureSrc) {
    try {
      const sigImg = await loadImg(signatureSrc);
      const targetW = 400;
      const targetH = (sigImg.height * targetW) / sigImg.width;
      ctx.drawImage(sigImg, sigLeftX + 20, sigY - 45, targetW, targetH);
      sigDrawn = true;
    } catch (err) {
      console.warn('Failed to load signature image, using fallback calligraphy stroke', err);
    }
  }

  // Fallback if image failed to load
  if (!sigDrawn) {
    ctx.fillStyle = '#0F2552';
    ctx.font = 'italic bold 52px "Brush Script MT", "Snell Roundhand", cursive, "Times New Roman"';
    ctx.textAlign = 'center';
    ctx.fillText('S. S. Rajpoot', lineMid, sigY + 45);
    // Decorative ink underline swoop
    ctx.strokeStyle = '#0F2552';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(sigLeftX + 35, sigY + 62);
    ctx.quadraticCurveTo(lineMid, sigY + 78, sigLeftX + 405, sigY + 56);
    ctx.stroke();
  }

  // Signature horizontal line
  ctx.strokeStyle = C_SLATE_MUTED;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(sigLeftX, sigY + 80);
  ctx.lineTo(sigLeftX + 440, sigY + 80);
  ctx.stroke();

  // Signatory Title & Designation
  ctx.fillStyle = C_SLATE_DARK;
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('S S RAJPOOT', lineMid, sigY + 120);

  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.fillText('Company CEO & Executive Director', lineMid, sigY + 152);

  // 7B. Left-Center: ISO 9001:2015 Certification Badge (from Vansh Aviation layout)
  const isoCx = 1130;
  const isoCy = sigY + 58;
  const badgeSize = 175;
  try {
    const isoImg = await loadImg('/iso-badge.png');
    ctx.drawImage(isoImg, isoCx - badgeSize / 2, isoCy - badgeSize / 2 - 12, badgeSize, badgeSize);
  } catch (err) {
    console.warn('Failed to draw ISO badge', err);
  }
  ctx.fillStyle = C_NAVY_MID;
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ISO 9001:2015 CERTIFIED', isoCx, isoCy + 104);

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'bold 15px Arial, sans-serif';
  ctx.fillText('Quality Management System', isoCx, isoCy + 128);

  // 7C. Center: Official Luxury Gold Embossed Academy Seal (Centered at W / 2)
  const sealCx = W / 2;
  const sealCy = sigY + 58;
  const sealR = 108;

  ctx.fillStyle = C_GOLD_MID;
  for (let angle = 0; angle < 360; angle += 10) {
    const rad = (angle * Math.PI) / 180;
    const tx = sealCx + (sealR + 12) * Math.cos(rad);
    const ty = sealCy + (sealR + 12) * Math.sin(rad);
    ctx.beginPath();
    ctx.arc(tx, ty, 17, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = C_NAVY_DEEP;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = C_GOLD_LIGHT;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR - 14, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = C_GOLD_PALE;
  ctx.font = 'bold 22px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INDO AIR', sealCx, sealCy - 46);

  ctx.fillStyle = C_GOLD_MID;
  ctx.font = 'bold 17px Arial, sans-serif';
  ctx.fillText('EXCELLENCE', sealCx, sealCy - 17);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.fillText('OFFICIAL', sealCx, sealCy + 12);
  ctx.fillText('SEAL', sealCx, sealCy + 38);

  ctx.fillStyle = C_GOLD_LIGHT;
  ctx.font = 'bold 17px Arial, sans-serif';
  ctx.fillText('INDORE', sealCx, sealCy + 64);

  // 7D. Right-Center: IATA Classic Standards Authorized Badge (from Vansh Aviation layout)
  const iataCx = W - 1130;
  const iataCy = sigY + 58;
  try {
    const iataImg = await loadImg('/iata-badge.png');
    ctx.drawImage(iataImg, iataCx - badgeSize / 2, iataCy - badgeSize / 2 - 12, badgeSize, badgeSize);
  } catch (err) {
    console.warn('Failed to draw IATA badge', err);
  }
  ctx.fillStyle = C_NAVY_MID;
  ctx.font = 'bold 20px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('IATA CLASSIC STANDARDS', iataCx, iataCy + 104);

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'bold 15px Arial, sans-serif';
  ctx.fillText('International Aviation Curriculum', iataCx, iataCy + 128);

  // 7E. Right: High-Resolution Verification QR Code
  const qrX = W - 530;
  const qrY = sigY - 60;
  const qrW = 230;
  const qrMid = qrX + (qrW + 24) / 2;

  try {
    const qrDataUrl = await QRCode.toDataURL(
      'https://www.indoaviationacademy.com/verify',
      {
        margin: 1,
        width: 600, // Generate high-resolution 600px QR
        color: {
          dark: '#0B1C40',
          light: '#FFFFFF',
        },
      }
    );
    const qrImg = await loadImg(qrDataUrl);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX, qrY, qrW + 24, qrW + 24);
    ctx.strokeStyle = C_GOLD_MID;
    ctx.lineWidth = 3;
    ctx.strokeRect(qrX, qrY, qrW + 24, qrW + 24);
    ctx.drawImage(qrImg, qrX + 12, qrY + 12, qrW, qrW);
  } catch (err) {
    console.warn('Failed to generate QR code', err);
  }

  ctx.fillStyle = C_NAVY_MID;
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN TO VERIFY RECORD', qrMid, qrY + qrW + 50);

  ctx.fillStyle = C_GOLD_DARK;
  ctx.font = 'bold 19px Arial, sans-serif';
  ctx.fillText('www.indoaviationacademy.com', qrMid, qrY + qrW + 76);

  // 8. Bottom Security Ribbon
  const ribbonY = H - 130;
  ctx.strokeStyle = C_GOLD_MID;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(150, ribbonY);
  ctx.lineTo(W - 150, ribbonY);
  ctx.stroke();

  ctx.fillStyle = C_SLATE_MUTED;
  ctx.font = 'bold 18px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    'PRECISION   •   SAFETY   •   EXCELLENCE   •   DGCA APPROVED   •   IATA ALIGNED   •   ISO 9001:2015 CERTIFIED   —   INDO AIR AVIATION ACADEMY, INDORE',
    W / 2,
    ribbonY + 32
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

/**
 * Download certificate as a print-ready 300 DPI A4 Landscape PDF.
 * PDFs shared via WhatsApp / Email are never compressed by image compression.
 */
export const downloadCertificatePDF = (
  canvas: HTMLCanvasElement,
  studentName: string
): void => {
  const safeName = (studentName || 'Student').trim().replace(/[^a-zA-Z0-9]/g, '_');
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  // Use high-quality JPEG compression at 0.96 for crystal clear PDF text and graphics
  const imgData = canvas.toDataURL('image/jpeg', 0.96);
  // Standard A4 landscape is 297mm x 210mm
  pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');
  pdf.save(`Admission_Certificate_${safeName}.pdf`);
};

/**
 * Download certificate as an Ultra-HD 3508x2480 PNG (lossless).
 */
export const downloadCertificatePNG = (
  canvas: HTMLCanvasElement,
  studentName: string
): void => {
  const safeName = (studentName || 'Student').trim().replace(/[^a-zA-Z0-9]/g, '_');
  const link = document.createElement('a');
  link.download = `Admission_Certificate_${safeName}.png`;
  link.href = canvas.toDataURL('image/png', 1.0);
  link.click();
};
