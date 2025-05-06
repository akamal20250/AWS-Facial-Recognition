# AWS-Facial-Recognition




## Overview  
This repository implements a facial-recognition–based access control system using AWS services. The solution comprises two AWS Lambda functions (registration and authentication), API Gateway endpoints, an Amazon Rekognition collection, DynamoDB for user storage, and a ReactJS frontend for visitor interactions.

## Architecture  
![Architecture Diagram](docs/architecture-diagram.png)  
*Figure: High-level workflow (placeholder for your drawn diagram)*  

1. **Registration Flow**  
   - Employee photos uploaded to **S3** (`akamal-employee-images`)  
   - **Registration Lambda** indexes faces into Rekognition and stores `{firstName, lastName, rekognitionId}` in **DynamoDB**.  
2. **Authentication Flow**  
   - Visitor photo captured in React app, uploaded via API Gateway to **S3** (`akamal-visitor-images`)  
   - **Authentication Lambda** retrieves image, calls Rekognition’s `search_faces_by_image`, and looks up matches in DynamoDB.  
3. **Frontend**  
   - React form for image capture  
   - Displays success/failure messages based on Lambda response  

## Technologies  
- **AWS Lambda** (Python)  
- **Amazon Rekognition**  
- **Amazon S3**  
- **Amazon DynamoDB**  
- **API Gateway** (REST API with binary support)  
- **ReactJS** (create-react-app)  

## Repository Structure  
<details>
<summary>Click to expand</summary>
