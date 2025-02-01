import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import mime from 'mime';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

const FOLDER_ID = '13pZwoeF5tDR-c54N__OmscZ84z4FfHSV'; // Replace with your actual folder ID

// export const uploadFileToDrive = async (filePath, fileName) => {
//   // Check if the file exists
//   if (!fs.existsSync(filePath)) {
//     throw new Error(`File not found: ${filePath}`);
//   }

//   console.log(`Uploading file: ${fileName} from path: ${filePath}`);

//   const fileMetadata = {
//     name: fileName,
//     parents: [FOLDER_ID],
//   };

//   // Determine the MIME type
//   const mimeType = mime.getType(filePath) || 'application/octet-stream';

//   const media = {
//     mimeType: mimeType,
//     body: fs.createReadStream(filePath),
//   };

//   try {
//     const response = await drive.files.create({
//       resource: fileMetadata,
//       media: media,
//       fields: 'id',
//     });

//     const fileId = response.data.id;
//     console.log(`File uploaded successfully. File ID: ${fileId}`);
    
//     // Return the direct link for viewing the image
//     const directLink = `https://drive.google.com/uc?id=${fileId}`;
//     return directLink; // Return the direct link instead of file ID
//   } catch (error) {
//     console.error('Error uploading to Google Drive:', error.message);
//     throw new Error('Failed to upload file to Google Drive');
//   }
  
//   // console.log(`File uploaded successfully. File ID: ${response.data.id}`);
//   //   return response.data.id; // Return the file ID
//   // } catch (error) {
//   //   console.error('Error uploading to Google Drive:', error.message);
//   //   throw new Error('Failed to upload file to Google Drive');
//   // }
// };


export const uploadFileToDrive = async (filePath, fileName) => {
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  console.log(`Uploading file: ${fileName} from path: ${filePath}`);

  const fileMetadata = {
    name: fileName,
    parents: [FOLDER_ID],
  };

  // Determine the MIME type
  const mimeType = mime.getType(filePath) || 'application/octet-stream';

  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath),
  };

  try {
    // Step 1: Upload the file
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = response.data.id;
    console.log(`File uploaded successfully. File ID: ${fileId}`);

    // Step 2: Set permissions to make the file publicly accessible
    await drive.permissions.create({
      fileId: fileId,
      resource: {
        role: 'reader', // The role can be 'reader', 'writer', etc.
        type: 'anyone', // 'anyone' means anyone with the link can access
      },
    });

    console.log(`Permissions set to public for file ID: ${fileId}`);

    // Return the direct link for viewing the image
    const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
    // const directLink = `https://drive.google.com/uc?id=${fileId}`;
    return directLink; // Return the direct link instead of file ID
  } catch (error) {
    console.error('Error uploading to Google Drive:', error.message);
    throw new Error('Failed to upload file to Google Drive');
  }
};


export const getFileDownloadURL = async (fileId) => {
    if (!fileId) {
        throw new Error('File ID is required to generate a download URL.');
    }

    // Construct the direct link for viewing the image
    const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
    // const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
    
    // Optionally, you could check if the file ID is valid by trying to fetch the file metadata
    try {
        const response = await drive.files.get({
            fileId: fileId,
            fields: 'id, name', // Retrieve basic file info
        });
        console.log(`File found: ${response.data.name}`);
    } catch (error) {
        console.error('Error fetching file metadata:', error.message);
        throw new Error('Failed to retrieve file information.');
    }

    return directLink;
};


// export const getFileDownloadURL = async (fileId) => {
//     // Construct the direct link for viewing the image
//     const directLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
//     return directLink;
//   // try {
//   //   const response = await drive.files.get({
//   //     fileId: fileId,
//   //     fields: 'webContentLink',
//   //   });
//   //   return response.data.webContentLink;
//   // } catch (error) {
//   //   console.error('Error getting file download URL:', error.message);
//   //   throw new Error('Failed to get file download URL');
//   // }
// };


// Export the drive instance
export { drive }; // Add this line to export the drive instance