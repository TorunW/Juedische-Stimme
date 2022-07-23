import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';

// Returns a Multer instance that provides several methods for generating 
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
    storage: multer.diskStorage({
      destination:(req, file, callback) => {
        
        // root uploads path
        let path = './public/wp-content/uploads';
        
        // get todays full date
        const today = new Date();
        
        // get year
        const year = today.getFullYear();
        
        // create the year folder if doesnt exist
        path += `/${year}`
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        // get month
        let month = today.getMonth();

        // inecrement month +1 due to js sillyness
        month += 1;
        month = month < 10 ? "0" + month : month
        
        // create the month folder if doesnt exist
        path += `/${month}`
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        
        // callback
        callback(null, path);
        
      },
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.array('theFiles');

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);

// Process a POST request
apiRoute.post((req, res) => {
  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
};