# Twitter Clone

This Twitter Clone project utilizes the MERN (MongoDB, Express.js, React.js, Node.js) stack to replicate the core functionalities of Twitter. Users can authenticate, compose tweets with text and image uploads, and images are stored in Amazon S3 buckets.

## Installation and Setup

### Prerequisites
1. Node.js installed on your machine.
2. MongoDB Atlas account for database storage.
3. Amazon S3 bucket for image storage.
   
### Installation Steps

1.Clone the repository:
```bash
git clone https://github.com/your-username/twitter-clone.git
```
2.Navigate to the project directory:
```bash
cd twitter-clone
```
3.Install dependencies for the backend (Node.js server):
```bash
cd server
npm install
```
4.Install dependencies for the frontend (React.js app):
```bash
cd client
npm install
```
### Configuration

1.Configure MongoDB Atlas:
-Create a cluster on MongoDB Atlas.
-Obtain the connection string.

2.Configure Amazon S3:
-Create an S3 bucket.
-Obtain AWS access key and secret key.

3.Create environment variables:
-Create a .env file in the server directory.
-Add the following variables in the .env file:
```bash
MONGO_URI=your_mongodb_atlas_connection_string
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
BUCKET_NAME=your_s3_bucket_name
```


## Running the Application

1.Start the Node.js server:

```bash
cd server
npm start
```
The backend server will run on http://localhost:8000.

2.Start the React.js app:

```bash
cd client
npm start
```
The frontend development server will run on http://localhost:3000.

Access the Twitter Clone app in your web browser:

Open http://localhost:3000 to use the Twitter Clone.
Now you have a locally running instance of the Twitter Clone application with separate servers for the backend and frontend. Users can authenticate, compose tweets, and upload images to the MongoDB Atlas database and Amazon S3 bucket.
