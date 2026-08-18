#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets');
const publicDir = path.join(__dirname, '../public');

// Image optimization configurations
const imageConfigs = {
  hero: { width: 1920, height: 1080, quality: 85 },
  thumbnail: { width: 400, height: 300, quality: 80 },
  logo: { width: 200, height: 200, quality: 90 },
  default: { quality: 85 }
};

async function optimizeImage(inputPath, outputPath, config = {}) {
  try {
    const { width, height, quality = 85 } = config;
    
    let pipeline = sharp(inputPath);
    
    // Resize if dimensions are specified
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    // Convert to WebP for better compression
    const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    await pipeline
      .webp({ quality })
      .toFile(webpPath);
    
    // Also create optimized original format as fallback
    const ext = path.extname(outputPath).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .resize(width, height, width || height ? {
          fit: 'cover',
          position: 'center'
        } : undefined)
        .jpeg({ quality, progressive: true, mozjpeg: true })
        .toFile(outputPath);
    } else if (ext === '.png') {
      await sharp(inputPath)
        .resize(width, height, width || height ? {
          fit: 'cover',
          position: 'center'
        } : undefined)
        .png({ quality, progressive: true, compressionLevel: 9 })
        .toFile(outputPath);
    }
    
    console.log(`✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)} & WebP`);
    
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🖼️  Starting image optimization...\n');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  try {
    const files = fs.readdirSync(assetsDir);
    
    for (const file of files) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(publicDir, file);
      
      // Skip if not an image
      if (!/\.(jpg|jpeg|png|gif)$/i.test(file)) continue;
      
      // Determine optimization config based on filename
      let config = imageConfigs.default;
      
      if (file.includes('hero')) {
        config = imageConfigs.hero;
      } else if (file.includes('logo')) {
        config = imageConfigs.logo;
      } else if (file.includes('training') || file.includes('cabin') || file.includes('pilot')) {
        config = imageConfigs.thumbnail;
      }
      
      await optimizeImage(inputPath, outputPath, config);
    }
    
    // Create responsive variants for hero images
    const heroImages = files.filter(file => 
      file.includes('hero') && /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    for (const heroImage of heroImages) {
      const inputPath = path.join(assetsDir, heroImage);
      const baseName = path.parse(heroImage).name;
      const ext = path.parse(heroImage).ext;
      
      // Create different sizes for responsive images
      const sizes = [
        { suffix: '-mobile', width: 768, height: 432 },
        { suffix: '-tablet', width: 1024, height: 576 },
        { suffix: '-desktop', width: 1920, height: 1080 }
      ];
      
      for (const size of sizes) {
        const outputPath = path.join(publicDir, `${baseName}${size.suffix}${ext}`);
        await optimizeImage(inputPath, outputPath, {
          width: size.width,
          height: size.height,
          quality: 85
        });
      }
    }
    
    console.log('\n✅ Image optimization completed!');
    
  } catch (error) {
    console.error('❌ Error reading assets directory:', error.message);
    process.exit(1);
  }
}

// Check if sharp is installed and import it
let sharp;
try {
  const sharpModule = await import('sharp');
  sharp = sharpModule.default;
} catch (error) {
  console.error('❌ Sharp is not installed. Please run: npm install sharp --save-dev');
  process.exit(1);
}

optimizeAllImages();