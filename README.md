Frontend
Clone the Project: If you haven't already, clone the project repository to your local machine.
Install Dependencies: Navigate to the project directory in your terminal and run npm install or yarn to install all the necessary dependencies listed in the package.json file.
Run the Development Server: Once the dependencies are installed, you can start the development server by command npm run dev

.env Config
create a new account on rapidApi 
copy image to video api from  
https://rapidapi.com/vemocc/api/runwayml
VITE_RUNWAYML_API=API_KEY

copy image to text api from
https://rapidapi.com/freeaiapi/api/stable-diffusion9/
VITE_DALLE_API=API_KEY

COPY image background remover api from
https://accounts.kaleido.ai/users/sign_in#api-key
VITE_BG_REMOVER=API_KEY

Backend
You don't need to run the backend server because the backend API is already hosted on Vercel. However, if you want to run it, go to the backend folder and run the following commands: "npm install" and then "npm run start".


.env Config
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.b3izheb.mongodb.net/?retryWrites=true&w=majority

Text To Image 
1.Go To Text to Image Page.
2.Enter Prompt For Generating Image.
3.Click on Search Icon




Text To Animation

1.Go To Text to Animation Page.
2.Enter Prompt For Generating Animation Video.
3.Click on Search Icon

wait for a while then click on check status for updating video Generation Progress.

File To Text  
1.Drag and Drop Your Notepad FIle that contain text for generating image.
Image will be automatically Generate From It.

Background Remover
1.Click On Upload image or Drag and Drop the Image whose background you wanted to remove.
2.Click on Upload Photo For Background Removal.
Image with Removed Background will be shown then.

