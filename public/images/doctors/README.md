# Default Doctor Avatar Images

## Required Files

The following default avatar images need to be placed in `public/images/doctors/`:

1. **anonymous_doctor_male.png**
   - Used for male doctors without custom photos
   - Currently used by 248 doctors
   - Recommended size: 300x300px to 500x500px
   - Should be a professional, neutral silhouette or icon

2. **anonymous_doctor_female.png**
   - Used for female doctors without custom photos
   - Recommended size: 300x300px to 500x500px
   - Should be a professional, neutral silhouette or icon

## How to Create/Obtain

### Option 1: Use Existing Assets
Check if the old website has default avatars that can be reused.

### Option 2: Create Simple Icons
Use a design tool (Figma, Canva, etc.) to create simple doctor silhouettes:
- Professional appearance
- Neutral colors (gray, blue)
- Medical theme (stethoscope icon, medical cross)
- Square format
- Transparent or white background

### Option 3: Use Free Icon Libraries
Download from free icon libraries:
- [Flaticon](https://www.flaticon.com/) - Search "doctor avatar"
- [Icons8](https://icons8.com/) - Search "doctor profile"
- [Font Awesome](https://fontawesome.com/) - Use user-md icon

### Option 4: Placeholder Until Ready
Create simple colored squares with initials or medical symbols as temporary placeholders.

## Current Status

⚠️ **Default avatar images are NOT yet in place.**

The system is configured to use these files, but they need to be added to:
- `public/images/doctors/anonymous_doctor_male.png`
- `public/images/doctors/anonymous_doctor_female.png`

## Next Steps

1. Create or obtain the two default avatar images
2. Save them with the exact filenames above
3. Place them in `public/images/doctors/`
4. Verify they display correctly on the website

## Testing

After adding the images, test by:
1. Running the dev server: `npm run dev`
2. Navigating to the doctors page
3. Checking that doctors without custom photos show the default avatars
