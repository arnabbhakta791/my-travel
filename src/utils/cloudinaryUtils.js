/**
 * Cloudinary URL transformation utilities
 * These functions transform Cloudinary URLs to serve optimized images
 */

/**
 * Check if URL is a Cloudinary URL and extract parts
 * @param {string} url - Full Cloudinary URL
 * @returns {object} - { isCloudinary, baseUrl, publicId } 
 */
const parseCloudinaryUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { isCloudinary: false }
  }
  
  // Check if it's a Cloudinary URL
  if (!url.includes('res.cloudinary.com')) {
    return { isCloudinary: false }
  }
  
  try {
    // Find the /upload/ part and split around it
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex === -1) {
      return { isCloudinary: false }
    }
    
    const baseUrl = url.substring(0, uploadIndex + 8) // includes '/upload/'
    const afterUpload = url.substring(uploadIndex + 8)
    
    // The publicId is the last path segment(s) - could include folder
    // Skip any existing transformations (they contain commas or start with known prefixes)
    const parts = afterUpload.split('/')
    
    // Filter out transformation segments (they contain commas or look like transformations)
    const transformationPrefixes = ['w_', 'h_', 'q_', 'f_', 'c_', 'e_', 'ar_', 'g_', 'fl_', 'a_', 'b_', 'co_', 'dpr_', 'du_', 'l_', 'o_', 'r_', 'so_', 't_', 'u_', 'x_', 'y_', 'z_', 'ac_', 'af_', 'bo_', 'ki_', 'pg_', 'sp_', 'vs_', 'vc_']
    const isTransformation = (part) => {
      if (part.includes(',')) return true
      return transformationPrefixes.some(prefix => part.startsWith(prefix))
    }
    
    const publicIdParts = parts.filter(part => !isTransformation(part))
    const publicId = publicIdParts.join('/')
    
    return {
      isCloudinary: true,
      baseUrl: baseUrl.replace('/upload/', ''),
      publicId
    }
  } catch {
    return { isCloudinary: false }
  }
}

/**
 * Get optimized thumbnail URL for gallery grid display
 * Uses lower quality and smaller dimensions for faster loading
 * @param {string} url - Original Cloudinary URL
 * @param {number} width - Desired thumbnail width (default: 400)
 * @returns {string} - Optimized thumbnail URL
 */
export const getThumbnailUrl = (url, width = 400) => {
  const parsed = parseCloudinaryUrl(url)
  
  if (!parsed.isCloudinary) {
    // Return original URL if not a valid Cloudinary URL
    return url
  }
  
  // Transformation: width, auto quality, auto format (WebP/AVIF when supported)
  const transformation = `w_${width},q_auto,f_auto,c_fill`
  
  return `${parsed.baseUrl}/upload/${transformation}/${parsed.publicId}`
}

/**
 * Get full quality URL for fullscreen viewing and download
 * @param {string} url - Original Cloudinary URL
 * @returns {string} - Full quality URL (original)
 */
export const getFullQualityUrl = (url) => {
  // Just return the original URL for full quality
  return url
}

/**
 * Get a medium quality URL for the fullscreen preview
 * @param {string} url - Original Cloudinary URL
 * @param {number} maxWidth - Maximum width (default: 1200)
 * @returns {string} - Medium quality URL
 */
export const getMediumQualityUrl = (url, maxWidth = 1200) => {
  const parsed = parseCloudinaryUrl(url)
  
  if (!parsed.isCloudinary) {
    return url
  }
  
  const transformation = `w_${maxWidth},q_auto,f_auto`
  
  return `${parsed.baseUrl}/upload/${transformation}/${parsed.publicId}`
}

/**
 * Download an image from a URL
 * @param {string} url - Image URL to download
 * @param {string} filename - Desired filename for download
 */
export const downloadImage = async (url, filename = 'photo.jpg') => {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error('Download failed:', error)
    // Fallback: open in new tab
    window.open(url, '_blank')
  }
}
