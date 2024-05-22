# Getting Ollama to Work with Docker on WSL2

Well, I guess you are here because you couldn't access Ollama from your Docker containers on your WSL2 system. Here are some instructions that should help you fix that, or at least give you some code to test and find out the problem. I'm assuming you've installed Ollama on your WSL2 system already and that you can open it in your web browser on [http://localhost:11434](http://localhost:11434/).

## Step 1: Edit the Hosts File

First things first, let's make sure your computer can resolve the IP address correctly.

### For Windows 11

1. **Open Notepad as Administrator**:
   - Press the **Start** button, type "Notepad" in the search bar.
   - Right-click on **Notepad** and select **Run as administrator**.

2. **Open the Hosts File**:
   - In Notepad, click **File** > **Open**.
   - Navigate to `C:\Windows\System32\drivers\etc`.
   - Change the file type from "Text Documents (*.txt)" to "All Files (*.*)".
   - Select the **hosts** file and click **Open**.

3. **Add the IP Address**:
   - Add the following line at the end of the file:
     ```
     172.31.151.220 ollama
     ```
   - Replace `172.31.151.220` with your actual WSL2 IP address. Use "ip addr" or "ifconfig" to find out this address. If you aren't sure, just paste the output from those commands into chatGTP and ask it what your ip address is!
   - Restart your WSL2 instance (wsl.exe --shutdown) to make these changes available in WSL2!

4. **Save the File**:
   - Click **File** > **Save**.

## Step 2: Configure Ollama to Bind to All Network Interfaces

To make Ollama accessible from multiple networks, you need to modify its systemd service configuration.

1. **Open the systemd Service File for Ollama**:
   - The file is typically located at `/etc/systemd/system/ollama.service`.
   - Use `sudo vim /etc/systemd/system/ollama.service` to open the file in an editor.

2. **Edit the Service File**:
   - Add the following lines under the `[Service]` section:
     ```
     [Service]
     Environment="OLLAMA_HOST=0.0.0.0"
     ```

3. **Save and Close the File**:
   - Save your changes and close the editor.

4. **Reload systemd and Restart Ollama**:
   - Run the following commands to reload the systemd configuration and restart Ollama:
     ```sh
     sudo systemctl daemon-reload
     sudo systemctl restart ollama
     ```

## Step 3: Run the Docker Compose Setup

To test if everything is working correctly, you can use the provided Docker Compose setup.

1. **Navigate to the Repository Directory**:
   - Open your terminal and navigate to the directory where your repository is located.

2. **Build and Run the Docker Containers**:
   - Use the following command to build and start the Docker containers:
     ```sh
     docker compose up --build
     ```

## Testing the Endpoints

Once your Docker containers are running, you can test the endpoints to ensure everything is set up correctly.

- **`GET /`**:
  - This endpoint returns a simple message: "Hello from the Express.js server!".
  - You can access it by navigating to [http://localhost:3000](http://localhost:3000) in your browser.

- **`GET /test-ollama`**:
  - This endpoint tests the connection to the Ollama API.
  - It attempts to access the API at the URL defined in `OLLAMA_API_URL` environment variable (see the docker-compose.yml file to change this!) or defaults to [http://localhost:11434](http://localhost:11434).
  - You can access it by navigating to [http://localhost:3000/test-ollama](http://localhost:3000/test-ollama) in your browser.



By following these steps, you should be able to access Ollama from your Docker containers on your WSL2 system. If these instructions and this code helped you, please give the repo a star. I'm curious if people see it. 

If you get really stuck the container has curl and ping in it so you can access the container and try things out. 
  - use this command to find the container id
     ```sh
     docker ps
     ```
  
  - start a bash shell like this

     ```sh
     docker exec -it <container_name_or_id> /bin/bash
     ```
