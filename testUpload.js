import { uploadFileToDrive } from './services/googleDriveService'; // Adjust the path as necessary

const testUpload = async () => {
  const filePath = 'example.jpg'; // Replace with the path to a file you want to upload
  const fileName = 'uploadedFile.jpg'; // The name you want the file to have in Google Drive

  try {
    const fileId = await uploadFileToDrive(filePath, fileName);
    console.log('File uploaded successfully. File ID:', fileId);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

testUpload();