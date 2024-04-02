import requests
import base64
from PIL import Image

# Rest of your code

prompt = input("Enter your prompt: ")
headers = {
    'Host': 'ai-api.magicstudio.com',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryY281sQA4mBJRbMjV',
    'User-Agent': 'Unstabli',
    'Origin': 'https://magicstudio.com',
}

data = f'------WebKitFormBoundaryY281sQA4mBJRbMjV\r\nContent-Disposition: form-data; name="prompt"\r\n\r\n{prompt}\r\n------WebKitFormBoundaryY281sQA4mBJRbMjV\r\nContent-Disposition: form-data; name="output_format"\r\n\r\nbytes\r\n------WebKitFormBoundaryY281sQA4mBJRbMjV\r\nContent-Disposition: form-data; name="user_profile_id"\r\n\r\nnull\r\n\r\n------WebKitFormBoundaryY281sQA4mBJRbMjV\r\nContent-Disposition: form-data; name="user_is_subscribed"\r\n\r\ntrue\r\n'

response = requests.post('https://ai-api.magicstudio.com/api/ai-art-generator', headers=headers, data=data)

# print(response.text)
image_data = response.text
# Decode the base64-encoded image data
image_data_bytes = response.text.encode('utf-8')
decoded_data = base64.b64decode(image_data_bytes)

decoded_data = base64.b64decode(image_data)

# Create a PIL Image object
image = Image.open(io.BytesIO(decoded_data))

# Save the image as a desired format (e.g., JPEG, PNG)
image.save('generated_image.jpg', format='JPEG')